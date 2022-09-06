import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, ScrollView, View, Text, FlatList, ToastAndroid } from 'react-native';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

import { LOCAL_BACKEND_URL } from '../utils/constants'
import { AuthContext } from '../utils/contexts'

import Chips from '../components/Chips'
import ReviewForm from '../components/ReviewForm'
import Comment from '../components/Comment'

function DrinkScreen({ route, navigation }) {

    const { drinkDetails } = route.params;

    const [ loading, setLoading ] = useState(true)
    const [ comments, setComments ] = useState([])

    const { token } = useContext(AuthContext)

    const loadComments = (id) => {
        setLoading(true)
        fetch(LOCAL_BACKEND_URL + `/drinks/comments/${id}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                setComments(data)
                console.log(JSON.stringify(data))
                setLoading(false)
            })
            .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG))
    }

    useEffect(() => {
        loadComments(drinkDetails.id)
    }, [])


    return (
        <ScrollView>
            <Card>
                { drinkDetails.photo_url !== '' &&
                <Card.Cover
                    source={{ uri: drinkDetails.photo_url}} 
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1,
                    }}
                />
                }
                <Card.Content>
                    <Title style={styles.title}>Расценки</Title>
                    <Divider style={styles.divider}/>
                    { drinkDetails.prices &&
                        <Chips prices={ drinkDetails.prices }/>
                    }

                    <Title style={styles.title}>Отзывы</Title>
                    <Divider style={styles.divider}/>
                    { comments.map(c => (
                        <Comment 
                            key= { c.user.id }
                            username={ c.user.username }
                            rating= { c.rating }
                            text= { c.text }
                            photo_url={ c.user.photo_url }
                        />
                        
                    )) }
                    <Title style={styles.title}>А вы что думаете?</Title>
                    <Divider style={styles.divider}/>
                    <ReviewForm />
                </Card.Content>
            </Card>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        marginBottom: 5,
    },
    btn: {
        position: 'absolute'

    },
    title: {
        marginTop: 15
    },
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },

});

export default DrinkScreen

