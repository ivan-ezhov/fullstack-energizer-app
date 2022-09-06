import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import { Appbar } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store';
import {Avatar} from 'react-native-paper'

import HomeScreen from './screens/HomeScreen'
import DrinkScreen from './screens/DrinkScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import {useState, useReducer, useEffect, useMemo, createContext} from 'react';

import {LOCAL_BACKEND_URL} from './utils/constants';
import {AuthContext} from './utils/contexts'



const Stack = createStackNavigator();

export default function App() {

    const [curUser, setCurUser] = useState({})
    const [state, dispatch] = useReducer(
        // reducer
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        // initial state
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        authContext.signOut()
        // попытаться своровать токен из секьюрного хранилища и перейти в нужный скрин
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                userName = await SecureStore.getItemAsync('userName');
                console.log(`содержимое SecureStore: ${userName} ${userToken}`)
                getProfileByUsername(userName, userToken)
            } catch (e) {
                // не удалось своровать токен из стора
            }

            // возможно, тут надо добавить валидацию токена

            // после этого диспатча автоматически будет показан LoginScreen или HomeScreen
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const getProfileByUsername = ( username, userToken) => {
        // if (!username || !state.userToken) return
        console.log('ищу '+LOCAL_BACKEND_URL + '/users/' + username, state.userToken)
        fetch(LOCAL_BACKEND_URL + '/users/' + username, {
            headers: {
                'Authorization': `Token ${userToken}`
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                setCurUser(data)
            })
            .catch(err => console.log(err.message))
    }

    const authContext = useMemo(
        () => ({
            signIn: async ({ login, pass }) => {
                // послать на сервак запрос на логин,
                // полученный токен и логин сохранить в секьюред сторейдж
                // вывести лог если ответ сервера был бедовый,
                console.log(`App.authContext.signIn('${login}, ${pass}')`)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: login, password: pass})
                };

                fetch(LOCAL_BACKEND_URL + '/auth/login/', requestOptions)
                    .then(response => response.json())
                    .then( data=> { 
                        SecureStore.setItemAsync('userToken', data.token)
                        SecureStore.setItemAsync('userName', login)
                        getProfileByUsername(login, data.token)
                        console.log(`SecureStore.setItemAsync( ${typeof data.token} ${data.token})`)
                        console.log('Привет,', login)
                        dispatch({ type: 'SIGN_IN', token: data.token, username: login})
                    })
                    .catch(err => console.log(requestOptions, err.message))


            },

            signOut: () => {
                SecureStore.setItemAsync('userToken', '')
                SecureStore.setItemAsync('userName', '')
                dispatch({ type: 'SIGN_OUT' })
            },

            signUp: async data => {
                // в data передается { login, pass }
                //
                // послать на сервак запрос на регистрацию,
                // если все удачно, сохранить токен из ответа в сторейдж
                // залогиниться под этим токеном

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: data.login, password: data.pass})
                };

                fetch(LOCAL_BACKEND_URL + '/auth/register/', requestOptions)
                    .then(response => response.json())
                    .then( data=> 
                        dispatch({ type: 'SIGN_IN', token: data.token })
                    )
                    .catch(err => console.log(err.message))
            },
        }),
        []
    );

    return (
        <View style={styles.container}>
            <AuthContext.Provider value={{ authContext, curUser, 'token': state.userToken }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Каталог">

                        {state.userToken === null || state.userToken === '' ? (
                            <>
                                <Stack.Screen
                                    name="Вход"
                                    component={LoginScreen}
                                />

                                <Stack.Screen
                                    name="Регистрация"
                                    component={RegisterScreen}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Каталог"
                                    component={HomeScreen}
                                    options={{ 
                                        headerRight: () => (
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Avatar.Image
                                                    size={18}
                                                    source={{ uri: curUser.photo_url }}
                                                    style={{backgroundColor: 'white', marginRight: 5, alignSelf: 'center' }}
                                                />
                                                <Text style={{fontSize: 18 }}>
                                                    { curUser.username }
                                                </Text>
                                            <Appbar.Action
                                                icon="exit-to-app"
                                                onPress={authContext.signOut} 
                                            />
                                            </View>
                                        ),
                                    }}/>

                                <Stack.Screen
                                    name="Details"
                                    component={DrinkScreen}
                                    options={({ route }) => ({ title: route.params.drinkName })}
                                />
                            </>
                        )}


                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        // padding: 5,
        flex: 1,
        backgroundColor: '#eee',
    },
});
