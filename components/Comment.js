import React from 'react';
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'

const Comment = ({ username, rating, text, photo_url }) => {

    return (
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
                size={64}
                source={{ uri: photo_url }}
                style={{backgroundColor: 'white'}}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18}}>{ username } — { rating }</Text>
                <Text style={{ fontSize: 16 }}>{ text }</Text>
            </View>

        </View>
    )
}

export default Comment;

