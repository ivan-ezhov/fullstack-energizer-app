import React from 'react';
import { Chip, Avatar } from 'react-native-paper';

const PriceChip = ({ shop, price }) => {
    const SHOP_LOGOS = {
        'lenta': 'https://upload.wikimedia.org/wikipedia/commons/9/94/%D0%9B%D0%95%D0%9D%D0%A2%D0%90_%D0%BB%D0%BE%D0%B3%D0%BE.jpg',
        'magnit': 'https://apkshki.com/storage/844/icon_5dcffd11887a0_844_w256.png.webp',
        'pyaterochka': 'https://play-lh.googleusercontent.com/RWzx5xhIS0DZEulm3RssLXiBUuusM3RAkEPhue4agQraamgViSPMR-Vk0yzmO3M7UqSM=s180',
    }

    const shopLogo = { uri: SHOP_LOGOS[shop.toLowerCase()] }

    return (
        <Chip
            avatar={ <Avatar.Image size={24} source={ shopLogo } style={{backgroundColor: 'white'}}/> }
            style={{ marginRight: 2,  }}
        >
            { price }
        </Chip>
    )
}

export default PriceChip;
