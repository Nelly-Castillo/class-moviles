import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function DetailsScreen({route}){

    const { name, email, phone } = route.params;

    return(
        <View styles={styles.container}>
            <Text styles={styles.header}>Detalles del Usuario</Text>
            <Text styles={styles.detail}>Nombre: {name}</Text>
            <Text styles={styles.detail}>Coreo: {email}</Text>
            <Text styles={styles.detail}>Telefono: {phone}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detail: {
        fontSize: 18, 
        marginBottom: 10,
    },
});