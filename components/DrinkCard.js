import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, Alert, ToastAndroid } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Chips from '../components/Chips'


function DrinkCard({ item, onPress }) {

    return (
        <Card style={styles.cardStyle} onPress={onPress}>
                <View style={styles.row}>
                    <Avatar.Image 
                        size={64}
                        source={{ uri : item.photo_url || 'https://www.houseofcharity.org/wp-content/uploads/2019/07/White-Square.jpg'}}
                        style={{ backgroundColor: 'white' }}
                    />
                    <View style={styles.cardText}>
                        <Title>{ item.name }</Title>
                        <Chips prices={item.prices} />
                    </View>
                </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        padding: 10,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row'
    },
    cardText: {
        flex: 1,
        marginLeft: 10,
    }
});

export default DrinkCard
