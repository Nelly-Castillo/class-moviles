import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
    // const [items, setItems] = useState([]); //Estado de usuario
    const [loading, setLoading] = useState(true); //Estado para manejar la carga
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const loadUsername = async () =>{
            try{
                const storedUserName = await AsyncStorage.getItem('username');
                if(storedUserName){
                    setUsername(storedUserName);
                }
            }catch(error){
                console.error('Error al recuperrar el nombre de usuario', error)
            }
            finally{
                setLoading(false);
            }
        }
        loadUsername();

        // const fetchItems = async () => {
        //     try {
        //         const response = await fetch('https://jsonplaceholder.typicode.com/users');
        //         const data = await response.json();
        //         setItems(data);
        //         setLoading(false);
        //     }catch (error){
        //         console.error('Error al obtener los datos', error);
        //     }
        // };
        // fetchItems();
        // const loadUserData = async () => {
        //     try {
        //     const savedUsername = await AsyncStorage.getItem('username');
        //     if (savedUsername) setUsername(savedUsername);
        //     } catch (error) {
        //     console.log('Error al cargar los datos desde AsyncStorage', error);
        //     }
        // };
        // loadUserData();
        }, []);
        // const hadleLPressItem = (item) => {
        //     navigation.navigate('Details', {
        //         name: item.name,
        //         email: item.email,
        //         phone: item.phone,
        //     });
        // }

        // return (
        // <View style={styles.container}>
        //     <Text style={styles.header}>Bienvenido a la pantalla principal</Text>
        //     <Button title="Cerrar sesión" onPress={hadleLogout}/>
        //     <Text>Bienvenido, {username}!</Text>
            {/* {loading ? <Text>Cargando datos...</Text>: (
                <FlatList
                    data= {items}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => hadleLPressItem(item)}
                        >
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
                // <FlatList
                // data={items}
                // renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                // keyExtractor={item => item.id.toString()}
                // />
            )} */}
        // </View>
        // );

    const hadleLogout = async () => {
        try {
            await AsyncStorage.removeItem('username');
            navigation.replace('Login');
        } catch (error) {
            console.error('Error al cerrar sesión: ', error)
        };

        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff"/>
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido a la pantalla principal</Text>
            <Button title="Cerrar sesión" onPress={hadleLogout}/>
            <Text>Bienvenido, {username}!</Text>
            <Spline
                scene="https://prod.spline.design/vWLpw0CXBKGs9GCA/scene.splinecode" 
            />
        </View>  
    );
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    header:{
        fontSize: 24,
        marginBottom: 20
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    // item: {
    //     padding: 10,
    //     fontSize: 18,
    //     height: 44,
    // }
});
export default HomeScreen;