import React, {useContext, useEffect, useState} from 'react'
import { Text, StyleSheet, View, FlatList, ToastAndroid } from 'react-native';
import { TextInput, Button, Card} from 'react-native-paper'
import Constants from 'expo-constants'
import {AuthContext} from '../utils/contexts';

function RegisterScreen({ navigation }) {

    const [login, setLogin] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const [showErrors, setShowErrors] = useState(false)
    const { authContext } = useContext(AuthContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'eee'}}>

            <Card style = {{padding: 20, margin: 10}}>

            <TextInput
                value={login}
                label='Логин'
                mode='outlined'
                onChangeText={login => setLogin(login)}
                onBlur={() => setShowErrors(true)}
            />
            <TextInput
                label="Пароль"
                value={pass1}
                secureTextEntry
                mode='outlined'
                onChangeText={pass1 => setPass1(pass1)}
            />
            <TextInput
                label="Повторите пароль"
                value={pass2}
                secureTextEntry
                mode='outlined'
                onChangeText={pass2 => setPass2(pass2)}
            />
            <Button
                disabled={ pass1 !== pass2 }
                onPress={() => { 
                    authContext.signUp({ login, pass: pass1 })
                }}
                mode='contained'
                style={{ padding: 5, width: 250, alignSelf: 'center', marginTop: 10}}
            >
                Зарегистрироваться
            </Button>

                
                { showErrors && login.length < 5 && <Text style={styles.errMsg}>Логин слишком короткий</Text> }
                { showErrors && pass1 !== pass2 && <Text style={styles.errMsg}>Пароли не совпадают</Text> }
                { showErrors && pass1.length < 5 && <Text style={styles.errMsg}>Пароль слишком короткий</Text> }


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

export default RegisterScreen

