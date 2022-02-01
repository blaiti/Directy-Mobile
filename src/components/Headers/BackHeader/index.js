import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text ,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const BackHeader = (props) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}>
                    <Icon name='arrow-circle-left' color={Colors.PRIMARY} size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
            <Icon name='arrow-circle-left' color={Colors.WHITE} size={25} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
})

export default BackHeader;