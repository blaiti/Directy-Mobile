import React from 'react';
import { 
    StyleSheet, 
    ImageBackground, 
    Text
} from 'react-native';
import { Colors, Typography } from '../../../styles';
import env from '../../../config/env';

const PopularCard = (props) => {
    const place = props.place;
    return(
        <View>
            {place.businessPicture != "" ?
                <ImageBackground 
                    resizeMode='cover'
                    style={styles.container}
                    borderRadius={10}
                    blurRadius={2}
                    source={{ uri: env.IMAGE_API + place.businessPicture }}>
                        <Text style={styles.title}>{place.businessName}</Text>
                        <Text style={styles.subTitle}>{place.address}</Text>
                </ImageBackground>
            :
                    <ImageBackground 
                        resizeMode='cover'
                        style={styles.container}
                        borderRadius={10}
                        blurRadius={2}
                        source={require('../../../assets/images/logo.jpg')}>
                            <Text style={styles.title}>{place.businessName}</Text>
                            <Text style={styles.subTitle}>{place.location.label}</Text>
                    </ImageBackground>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 180,
        padding: 10,
        marginRight: 10,
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    subTitle: {
        fontSize: 14,
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})

export default PopularCard;