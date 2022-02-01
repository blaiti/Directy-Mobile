import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors, Typography } from '../../../styles';

const CategoryCard = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={props.icon} color={Colors.PRIMARY} size={25} solid />
            </View>
            <Text style={styles.label}>{props.label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 5,
        alignItems: 'center',
    },
    iconContainer: {
        height: 60,
        width: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.GRAY_LIGHT
    },
    label: {
        marginTop: 3,
        fontSize: 15,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
});

export default CategoryCard;
