import React from 'react';
import {Button, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './app/screens/home.screen';
import OnlineGameScreen from './app/screens/online-game.screen';
import VsBotGameScreen from './app/screens/vs-bot-game.screen';
import {SocketContext, socket} from './app/contexts/socket.context';
import EndGameScreen from "./app/screens/end-game.screen";
import LoginScreen from "./app/screens/login.screen";
import RegisterScreen from "./app/screens/register.screen";
import {Box} from "@mui/material";
import ForgotPasswordScreen from "./app/screens/forgot-password.screen";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen" screenOptions={({navigation}) => ({
                    headerRight: () => {
                        return (
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Button title="login" onPress={() => navigation.navigate('LoginScreen')}/>
                            </Box>
                        );
                    }
                })}>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="OnlineGameScreen" component={OnlineGameScreen}/>
                    <Stack.Screen name="VsBotGameScreen" component={VsBotGameScreen}/>
                    <Stack.Screen name="EndGameScreen" component={EndGameScreen}/>

                    <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SocketContext.Provider>
    );
}

export default App;