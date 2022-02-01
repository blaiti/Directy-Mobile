import React from 'react';
import { 
    StyleSheet, 
    View, 
    Image,
    Dimensions
} from 'react-native';
import { Colors, Typography } from '../../styles';

const windowWidth = Dimensions.get('window').width;

const Splash = () => {
    return(
        <View style={styles.container}>
            <Image
                resizeMode='cover'
                style={styles.image}
                source={ require('../../assets/images/logo.jpg') } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY
    },
    image: {
        width: windowWidth,
        height: windowWidth
    }
})

export default Splash;