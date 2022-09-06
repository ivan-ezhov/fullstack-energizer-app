import React, {useContext, useEffect, useState} from 'react'
import { Text, StyleSheet, View, FlatList, ToastAndroid } from 'react-native';
import { TextInput, Button, Card} from 'react-native-paper'
import Constants from 'expo-constants'

import { AuthContext } from '../utils/contexts'

function LoginScreen({ navigation }) {

    const [login, setLogin] = useState('')
    const [pass, setPass1] = useState('')

    const { authContext } = useContext(AuthContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'eee'}}>

            <Card style = {{padding: 20, margin: 10}}>
            <TextInput
                value={login}
                label='Логин'
                mode='outlined'
                onChangeText={login => setLogin(login)}
            />
            <TextInput
                label="Пароль"
                value={pass}
                secureTextEntry
                mode='outlined'
                onChangeText={pass => setPass1(pass)}
            />
            <Button
                onPress={() => {
                    if (login && pass) 
                        authContext.signIn({ login, pass })
                }}
                mode='contained'
                disabled={login.length < 4 || pass.length < 4}
                style={{ padding: 5, width: 250, alignSelf: 'center', marginTop: 10}}
            >
                Войти
            </Button>

            <Button
                onPress={() =>
                    navigation.navigate('Регистрация')
                }
                mode='outlined'
                style={{ padding: 5, width: 250, alignSelf: 'center', marginTop: 10}}
            >
                Зарегистрироваться
            </Button>

            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        // paddingTop: 5
    },
    errMsg: {
        color: 'red',
        textAlign: 'center'
    }

});

export default LoginScreen


