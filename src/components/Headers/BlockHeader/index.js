import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text ,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography } from '../../../styles'

const BlockHeader = (props) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.screen != null ?
                <TouchableOpacity 
                    style={styles.container}
                    onPress={() => navigation.navigate(props.screen, {title: props.title})}>
                        <Text style={styles.subTitle}>Voir tout</Text>
                        <Icon name='chevron-right' color={Colors.GRAY_DARK} size={20} />
                </TouchableOpacity>
            : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
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
    subTitle: {
        fontSize: 14,
        color: Colors.GRAY_DARK,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})

export default BlockHeader;