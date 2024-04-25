import {Text, View, StyleSheet} from "react-native";

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
    }
});

export default PlayerScore;