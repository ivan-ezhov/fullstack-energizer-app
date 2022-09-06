import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, View, FlatList, ToastAndroid } from 'react-native';

import { LOCAL_BACKEND_URL } from '../utils/constants'
import { AuthContext } from '../utils/contexts'

import DrinkCard from '../components/DrinkCard'
import MyProfileInfo from '../components/MyProfileInfo'


function HomeScreen({ navigation, route }) {

    const [ drinksList, setDrinksList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const { token, curUser } = useContext(AuthContext)
    console.log(JSON.stringify(curUser, null, 2))

    const loadDrinkList = () => {
        setLoading(true)

        console.log(`Authorization: Token ${typeof token} ${JSON.stringify(token)}`)
        fetch(LOCAL_BACKEND_URL + '/drinks/', {
            headers: {
                'Authorization': `Token ${token}`
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                setDrinksList(data)
                setLoading(false)
            })
            .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG))
    }
    useEffect(() => {
        loadDrinkList()
    }, [])

    return (
        <View>
            <FlatList
                style={styles.flatList} 
                data = {drinksList}
                renderItem = {i => 
                    <DrinkCard
                        item={i.item}
                        onPress={ () =>
                                navigation.navigate('Details', { drinkDetails: i.item, drinkName: i.item.name, 'token': token })
                        }
                    /> }
                keyExtractor = { i => i.id }
                refreshing = { loading }
                onRefresh = { loadDrinkList }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        paddingBottom: 15
    }

});

export default HomeScreen
