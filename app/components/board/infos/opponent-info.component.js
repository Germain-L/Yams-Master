import React, {useEffect, useContext, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {SocketContext} from "../../../contexts/socket.context";

const OpponentInfos = () => {
    const socket = useContext(SocketContext);
    const [opponentTokens, setOpponentTokens] = useState(0);

    useEffect(() => {

        socket.on("game.tokens.view-state", (data) => {
            setOpponentTokens(data['opponentTokens'])
        });

    }, []);
    return (
        <View style={styles.opponentInfosContainer}>
            <Text>Tokens: {opponentTokens}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentInfosContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'black',
        backgroundColor: "lightgrey"
    }
});

export default OpponentInfos;