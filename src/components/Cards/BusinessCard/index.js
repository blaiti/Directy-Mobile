import React from 'react';
import { 
    StyleSheet, 
    View, 
    Image,
    Text
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors, Typography } from '../../../styles';
import env from '../../../config/env';

const BusinessCard = (props) => {
    const place = props.place;
    
    return(
        <View style={styles.container}>
            {place.businessPicture != "" ?
                <Image
                resizeMode='cover'
                style={styles.image}
                source={{ uri: place.businessPicture }} />
            :
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={ require('../../../assets/images/logo-white.jpg') } />
            }

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.title}>{place.businessName}</Text>
                    <Text style={styles.subTitle}>{place.address}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Icon name="clock" color={Colors.GRAY_LIGHT} size={20} />
                    <Text style={styles.subTitle}>  {place.businessSchedule}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between'
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
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default BusinessCard;