import React, {useContext} from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button } from 'react-native-paper';
import {AuthContext} from '../utils/contexts';

const MyProfileInfo = (user) => {

    const { authContext } = useContext(AuthContext)
    return (
        <View style={styles.headerContainer}>
            <View style={styles.row}>
                <Avatar.Image
                    size={36}
                    source={{ uri: user.user.photo_url }}
                    style={{backgroundColor: 'white'}}
                />
                <Text style={styles.headerText}>{user.user.username}</Text>
            </View>
            <Button icon="exit-to-app" compact={true} mode="text" onPress={() => authContext.signOut()}>Выйти</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 25

    },
    headerText: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});

export default MyProfileInfo
