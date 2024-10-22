import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'profile' : 'profile-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Details" component={DetailsScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
      <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('username');
      if (token) {
        setIsLoggedIn(true);
      }
      // try {
      //   const storedUsername = await AsyncStorage.getItem('username');
      //   if (storedUsername) {
      //     setIsLoggedIn(true);
      //   } else {
      //     setIsLoggedIn(false);
      //   }
      // } catch (error) {
      //   console.lerror('Error al verificar el estado de autennticación', error);
      //   setIsLoggedIn(false);
      // }
    }
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name='HomeTabs' component={TabsNavigator} options={{headerShown: false}}/>
        ): (
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )

  // if (isLoggedIn === null){
  //   return(
  //     <View 
  //       style={
  //         {
  //           flex: 1, 
  //           justifyContent: 'center', 
  //           alignItems: 'center'
  //         }
  //       }
  //     >
  //       <ActivityIndicator
  //         size= 'large'
  //         color = "#0000ff"
  //       />
  //     </View>
  //   )
  // }

  // return (
  //   <NavigationContainer>
  //       <Stack.Navigator initialRouteName= {isLoggedIn ? "Home": "Login"}>
  //           <Stack.Screen name= "Login" component= {LoginScreen} options={{title: 'Inicio de Sesión'}}/>
  //           <Stack.Screen name= "Home" component= {HomeScreen} options={{title: 'Bienvenido'}}/>
  //           <Stack.Screen name='Details' component={DetailsScreen} options={{title: 'Contactos'}}/>
  //       </Stack.Navigator>
  //   </NavigationContainer>
  // );
}