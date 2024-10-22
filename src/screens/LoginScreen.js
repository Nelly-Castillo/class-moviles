
import React, { useState }  from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const [username, setUsername] = useState(''); //Estado de usuario
    const [password, setPassword] = useState(''); //Estado de contraseña
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const hadleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        try{
            if (username === 'admin' && password === '1234' ){ //Verifica que no se encuentre vacio
                await AsyncStorage.setItem('username', username)
                navigation.navigate('HomeTabs');
                // try {
                //     await AsyncStorage.setItem('username', username)
                //     navigation.navigate('Home');
                // } catch (error) {
                //     console.error('Error al guardar el nombre del usuario: ', error)
                // }
                // alert('Ingresa tu contraseña y usuario');
            }else {
                setErrorMessage('Credenciales incorrectas, Intentalo de nuevo')
                // try{
                //     await AsyncStorage.setItem('username', username);
                //     await AsyncStorage.setItem('password', password);
                //     alert('Inicio de sesion exitoso');
                //     navigation.navigate('Home');
                // }
                // catch (error){
                //     console.log('Error al guardar los datos en AsyncStorage', error);
                // }
            }
        }
        catch(error){
            console.error('Error al iniciar sesión ', error);
            setErrorMessage('Hay un problema al iniciar sesión.');
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Iniciar sesión</Text>
            <TextInput 
                style={styles.input} 
                placeholder='Usuario...'  
                value={username} 
                onChangeText={text => setUsername(text)}
            />
            <TextInput 
                style={styles.input} 
                placeholder='Contraseña...' 
                value={password} 
                onChangeText={text => setPassword(text)} 
                secureTextEntry
            />
            {
                errorMessage ? 
                    <Text style={styles.error}>
                        {errorMessage}
                    </Text>
                : null
            }
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ): (
                    <Button 
                        title='Iniciar sesión' 
                        onPress={hadleLogin}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', 
        alignItems: 'center',
        justifyContent: 'center',
    },    
    text: {
        color: '#fff', 
        },
        input: {
        height: 40,
        backgroundColor: '#fff',
        color: '#84878b', 
        paddingLeft: 10,
        margin: 5,
        width: '80%',
        borderRadius: 10,
        },
        button: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
        },
        error: {
            color:'red',
            marginBottom: 10,
        }
    });

export default LoginScreen;