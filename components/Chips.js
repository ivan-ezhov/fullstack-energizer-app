import React from 'react';
import PriceChip from './PriceChip'
import { View, Text } from 'react-native'

const Chips = ({ prices }) => {

    return (
        <View style={{ flexDirection: 'row' }}>
        {
            prices.map((item, idx) => (
                <PriceChip key={idx} shop={item.shop_name} price={item.price}/>
            ))
        }
        </View>
    )
}

export default Chips;

