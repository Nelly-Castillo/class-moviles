import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>SettingsScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
})

export default SettingsScreen;