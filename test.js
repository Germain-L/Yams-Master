const checkForDiagComplete = (grid) => {
    let topEndOwners = [grid[0][0].owner, grid[0][4].owner];

    let hasDownRightDiag = true;
    let hasDownLeftDiag = true;

    for (let indexes = {drc: 0, dlc: 4, i: 0}; indexes.i <= 4; indexes = {
        drc: indexes.drc + 1,
        dlc: indexes.dlc - 1,
        i: indexes.i + 1,
    }) {
        let drcCellOwner = grid[indexes.i][indexes.drc].owner;
        let dlcCellOwner = grid[indexes.i][indexes.dlc].owner;

        if (drcCellOwner !== topEndOwners[0]) {
            hasDownRightDiag = false;
        }

        if (dlcCellOwner !== topEndOwners[1]) {
            hasDownLeftDiag = false;
        }

        // Early return no diagonals available
        if (!hasDownRightDiag && !hasDownLeftDiag) {
            return false;
        }
    }

    return hasDownRightDiag || hasDownLeftDiag;
}

const GRID_WITH_DIAGONAL = [
    [
        { viewContent: '1', id: 'brelan1', owner: 'Player 1', canBeChecked: false },
        { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false },
        { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false },
        { viewContent: 'Carré', id: 'carre', owner: 'Player 1', canBeChecked: false },
        { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false },
        { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false },
        { viewContent: 'Yam', id: 'yam', owner: 'Player 1', canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        {viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false},
    ],
    [
        {viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false},
        {viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: false},
        {viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false},
        {viewContent: '≤8', id: 'moinshuit', owner: 'Player 1', canBeChecked: false},
        {viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false},
    ],
    [
        {viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false},
        {viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false},
        {viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false},
        {viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false},
        {viewContent: '4', id: 'brelan4', owner: 'Player 1', canBeChecked: false},
    ]
];

const GRID_WITH_OPPOSITE_DIAGONAL = [
    [
        { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false },
        { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false },
        { viewContent: '6', id: 'brelan6', owner: 'Player 1', canBeChecked: false },
    ],
    [
        { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false },
        { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false },
        { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: 'Player 1', canBeChecked: false },
        { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false },
        { viewContent: 'Yam', id: 'yam', owner: 'Player 1', canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false },
        { viewContent: 'Sec', id: 'sec', owner: 'Player 1', canBeChecked: false },
        { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false },
        { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false },
        { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '3', id: 'brelan3', owner: 'Player 1', canBeChecked: false },
        { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false },
        { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false },
        { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false },
        { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false },
    ]
];

console.log(checkForDiagComplete(GRID_WITH_DIAGONAL));
console.log(checkForDiagComplete(GRID_WITH_OPPOSITE_DIAGONAL));