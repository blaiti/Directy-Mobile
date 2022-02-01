import React, {useState} from 'react';
import { 
    StyleSheet, 
    View,
    Image, 
    Text,
    TextInput,
    Alert,
    TouchableOpacity
} from 'react-native';

import AuthContext from '../../context/auth-context';
import axiosInstance from '../../config/axiosInstance';

import { Colors, Typography } from '../../styles';
import routes from '../../config/routes';

const Register = ({navigation}) => {
    const {authContext} = React.useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const __register = () => {
        if (name.length != 0 && email.length != 0 && password.length != 0) {
            axiosInstance.post('/user/register', {
                name: name,
                email: email,
                password: password
            })
            .then(async (response) => {
                if (response.status == 200) {
                    authContext.signIn(response.data.token);
                }
                else {
                    Alert.alert('Erreur', 'Merci de vérifier vos informations !');
                }
            })
            .catch(function (error) {
                Alert.alert('Erreur', 'Merci de vérifier vos informations !');
            });
        }
        else {
            Alert.alert('Erreur', 'Merci de vérifier vos informations !')
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    resizeMode='stretch'
                    style={styles.logo}
                    source={ require('../../assets/images/logo-dark.png') } />
            </View>

            {/* Body */}
            <View style={styles.bodyContainer}>
                <TextInput
                    value={name}
                    placeholder="Nom.."
                    style={styles.inputContainer}
                    placeholderTextColor={Colors.GRAY_DARK}
                    onChangeText={(text) => setName(text)} />
                <TextInput
                    value={email}
                    placeholder="Email.."
                    style={styles.inputContainer}
                    placeholderTextColor={Colors.GRAY_DARK} 
                    onChangeText={(text) => setEmail(text)} />
                <TextInput
                    value={password}
                    secureTextEntry={true}
                    placeholder="Mot de passe.."
                    style={styles.inputContainer}
                    placeholderTextColor={Colors.GRAY_DARK} 
                    onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => __register()}>
                        <Text style={styles.btnText}>S'inscrire</Text>
                </TouchableOpacity>

                <Text style={styles.subTitle}>Avez-vous un compte? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.Login)}>
                        <Text style={[styles.subTitle, {marginTop: 0, color: Colors.PRIMARY}]}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    // Header
    headerContainer: {
        flex: 1,
        padding: 20,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 270,
        height: 60
    },
    // Body
    bodyContainer: {
        flex: 2,
        padding: 20,
        paddingTop: 0
    },
    inputContainer: {
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        color: Colors.PRIMARY,
        backgroundColor: Colors.GRAY_LIGHT,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    btnContainer: {
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY
    },
    btnText: {
        fontSize: 18,
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    subTitle: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        color: Colors.GRAY_DARK,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})

export default Register;