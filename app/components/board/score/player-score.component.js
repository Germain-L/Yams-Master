import {StyleSheet, Text, View} from "react-native";
import React from "react";

const PlayerScore = () => {

    return (
        <View style={styles.playerScoreContainer}>
            <Text>PlayerScore</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    },
});


export default PlayerScore;