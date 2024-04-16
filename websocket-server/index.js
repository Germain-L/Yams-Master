const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var uniqid = require('uniqid');
const GameService = require('./services/game.service');
const {socket} = require("../app/contexts/socket.context");

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------
let games = [];
let queue = [];

// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const updateClientsViewTimers = (game) => {
    game.player1Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:1', game.gameState));
    game.player2Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:2', game.gameState));
}

const updateClientsViewDecks = (game) => {
    game['player1Socket'].emit("game.deck.view-state", GameService.send.forPlayer.deckViewState('player:1', game.gameState));
    game['player1Socket'].emit("game.deck.view-state", GameService.send.forPlayer.deckViewState('player:2', game.gameState));
}

const newPlayerInQueue = (socket) => {

    queue.push(socket);

    // Queue management
    if (queue.length >= 2) {
        const player1Socket = queue.shift();
        const player2Socket = queue.shift();
        createGame(player1Socket, player2Socket);
    }
    else {
        socket.emit('queue.added', GameService.send.forPlayer.viewQueueState());
    }
};

const createGame = (player1Socket, player2Socket) => {

    const newGame = GameService.init.gameState();
    newGame['idGame'] = uniqid();
    newGame['player1Socket'] = player1Socket;
    newGame['player2Socket'] = player2Socket;

    games.push(newGame);

    const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);
    player1Socket.emit("game.start", GameService.send.forPlayer.deckViewState(player1Socket, games[gameIndex].gameState));
    player2Socket.emit("game.start", GameService.send.forPlayer.deckViewState(player2Socket, games[gameIndex].gameState));

    const gameInterval = setInterval(() => {

        games[gameIndex].gameState.timer--;

        // Si le timer tombe à zéro
        if (games[gameIndex].gameState.timer === 0) {

            // On change de tour en inversant le clé dans 'currentTurn'
            games[gameIndex].gameState.currentTurn = games[gameIndex].gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';

            // Méthode du service qui renvoie la constante 'TURN_DURATION'
            games[gameIndex].gameState.timer = GameService.timer.getTurnDuration();

            games[gameIndex].gameState.deck = GameService.init.deck();
            updateClientsViewTimers();
        }

        // On notifie finalement les clients que les données sont mises à jour.
        updateClientsViewDecks(games[gameIndex]);
    }, 1000);

    // On prévoit de couper l'horloge
    // pour le moment uniquement quand le socket se déconnecte
    player1Socket.on('disconnect', () => {
        clearInterval(gameInterval);
    });

    player2Socket.on('disconnect', () => {
        clearInterval(gameInterval);
    });

    games[gameIndex].player1Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:1', games[gameIndex]));
    games[gameIndex].player2Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:2', games[gameIndex]));
};

const rollDices = (socket) => {
    const game = GameService.utils.findGameIndexBySocketId(socket);
    // TODO: finish
}

const removePlayerFromQueue = (socket) => {
    const indexOfSocket = queue.indexOf(socket)
    queue.splice(indexOfSocket, 1);
}

// ---------------------------------------
// -------- SOCKETS MANAGEMENT -----------
// ---------------------------------------

io.on('connection', socket => {
    console.log(`[${socket.id}] socket connected`);

    socket.on('queue.join', () => {
        console.log(`[${socket.id}] new player in queue `);
        newPlayerInQueue(socket);
    });

    socket.on('queue.leave', () => {
        console.log(`[${socket.id}] left the queue`);
        removePlayerFromQueue(socket);
        socket.emit("game.leave", GameService.send.forPlayer.viewQueueState());
    })

    socket.on('disconnect', reason => {
        console.log(`[${socket.id}] socket disconnected - ${reason}`);
    });

    socket.on('game.dices.roll', () => {
        console.log(`[${socket.id}] roll roll`);
        rollDices();
    })
});

// -----------------------------------
// -------- SERVER METHODS -----------
// -----------------------------------

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function(){
    console.log('listening on *:3000');
});