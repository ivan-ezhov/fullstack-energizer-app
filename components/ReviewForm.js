import React from 'react';
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper';

const ReviewForm = ({ prices }) => {

    const [text, setText] = React.useState("");
    const [rating, setRating] = React.useState('5');

    return (
        <View>
            <TextInput
                value={rating}
                mode='outlined'
                placeholder='5'
                onChangeText={rating => setRating(rating)}
                style={{ width: 60, alignSelf: 'center', textAlign: 'center', fontSize: 24, marginBottom: 10}}
                keyboardType="numeric"
                onFocus={() => setRating('')} 
            />
            <TextInput
                label="Отзыв (не больше 140 символов)"
                value={text}
                multiline={true}
                mode='outlined'
                numberOfLines={5}
                onChangeText={text => setText(text)}
                right={<TextInput.Affix text={`${text.length}/140`} />}
            />
            <Button
                disabled={text.length > 140 || +rating > 10}
                onPress={() => console.log('Pressed')
            }>
                Отправить
            </Button>
        </View>
    )
}

export default ReviewForm;
