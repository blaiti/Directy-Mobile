import React, {useState} from 'react';
import { 
    StyleSheet, 
    View,
    Alert,
    Image, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import AuthContext from '../../context/auth-context';
import axiosInstance from '../../config/axiosInstance';

import { Colors, Typography } from '../../styles';
import routes from '../../config/routes';

const Login = ({navigation}) => {
    const {authContext} = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const __login = () => {
        if (email.length != 0 && password.length != 0) {
            axiosInstance.post('/user/login', {
                email: email,
                password: password
            })
            .then(async (response) => {
                if (response.status == 200) {
                    authContext.signIn(response.data.token);
                }
                else if (response.status == 201) {
                    Alert.alert('Erreur', 'Merci de vérifier votre mot de passe !');
                }
                else {
                    Alert.alert('Erreur', 'Merci de vérifier vos informations !')
                }
            })
            .catch(function (error) {
                console.log(error);
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
                    value={email}
                    placeholder="Email.."
                    keyboardType="email-address"
                    style={styles.inputContainer}
                    placeholderTextColor={Colors.GRAY_DARK}
                    onChangeText={(text) => setEmail(text)} />
                <TextInput
                    value={password}
                    placeholder="Mot de passe.."
                    style={styles.inputContainer}
                    keyboardType="default"
                    secureTextEntry={true}
                    placeholderTextColor={Colors.GRAY_DARK}
                    onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => __login()}>
                        <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.subTitle}>Vous n'avez pas de compte? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.Register)}>
                        <Text style={[styles.subTitle, {marginTop: 0, color: Colors.PRIMARY}]}>Créer un compte</Text>
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

export default Login;