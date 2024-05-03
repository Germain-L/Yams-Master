import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";

export default function EndGameScreen({ route, navigation }) {
    const { winner, endGame, playerScore, opponentScore } = route.params;

    return (
        <View style={styles.container}>
            <Text>Winner: {winner ? "You" : "Opponent"}</Text>
            <Text>Your Score: {playerScore}</Text>
            <Text>Opponent's Score: {opponentScore}</Text>
            <View>
                <Button
                    title="Play Online"
                    onPress={() => navigation.navigate('OnlineGameScreen')}
                />
            </View>
            <View>
                <Button
                    title="Play Against Bot"
                    onPress={() => navigation.navigate('VsBotGameScreen')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});