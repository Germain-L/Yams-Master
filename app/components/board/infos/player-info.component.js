import React, {useEffect, useContext, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {SocketContext} from "../../../contexts/socket.context";

const PlayerInfos = () => {
    const socket = useContext(SocketContext);
    const [playerTokens, setPlayerTokens] = useState(0);

    useEffect(() => {

        socket.on("game.tokens.view-state", (data) => {
            setPlayerTokens(data['playerTokens'])
        });

        console.log("bbbbb", playerTokens);


    }, []);
    return (
        <View style={styles.opponentTimerContainer}>
            <Text>Tokens: {playerTokens}</Text>
        </View>
    );
};

const styles = StyleSheet.create({playerInfosContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'black',
        backgroundColor: "lightgrey"
    }});

export default PlayerInfos;