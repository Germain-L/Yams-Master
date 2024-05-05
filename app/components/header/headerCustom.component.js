import {View, StyleSheet} from "react-native";
import {SignInButton} from "./signInButton.component";
import {Welcome} from "./welcome.component";
import {SignOutButton} from "./signOutButton.component";

export const HeaderCustom = () => {
    return (
        <View style={styles.row}>
            <Welcome/>
            <SignInButton/>
            <SignOutButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        fontSize: "18px",
    }
})