import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    ScrollView,
    View,
    Alert,
    ImageBackground, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';

import AuthContext from '../../context/auth-context';
import axiosInstance from '../../config/axiosInstance';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import BackHeader from '../../components/Headers/BackHeader';

const AddBusiness = ({navigation}) => {
    const {state} = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const [picture, setPicture] = useState();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({});
    const [open, setOpen] = useState('');
    const [close, setClose] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const fetchCategories = async () => {
        return axiosInstance.get('category/getCategories')
        .then(function (response) {
          if (response.status == 200) {
            setCategories(response.data);
            setCategory(response.data[0]._id);
          }
          else {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
        fetchCategories();
        setIsLoading(false);
    }, [])

    const __openPicker = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            setPicture({
                mimetype: image.mime,
                filename: "",
                path: image.path,
                uri: image.path,
                size: image.size,
                width: image.width,
                height: image.height,
            });
        });
    }

    const pickerItems = categories.map(item => (
        <Picker.Item key={item._id} color={Colors.PRIMARY} label={item.categoryName} value={item._id} />
    ));

    const __getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        })
        .then(location => {
            setLocation({
                longitude: location.longitude,
                latitude: location.latitude
            });
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
            setLocation({
                longitude: 0,
                latitude: 0
            });
        })
    }

    const __addPicture = (idBusiness) => {
        let mime = "";
        if (picture.mimetype == "image/jpeg") {
            mime = ".jpg";
        }
        else {
            mime = ".png";
        }
        let filename = idBusiness + name + mime;
        setPicture({...picture, filename: filename});
        axiosInstance.post('/business/updatePicture', {
            picture: picture,
            _id: idBusiness
        })
        .then(async (response) => {
            if (response.status == 200) {
                navigation.navigate(routes.Dashboard);
            }
            else {
                Alert.alert('Erreur', 'Merci de vérifier vos informations !')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } 

    const __addBusiness = () => {
        axiosInstance.post('/business/createBusiness', {
            name: name,
            address: address,
            location: location,
            schedule: open + " - " + close,
            email: email,
            website: website,
            phone: phone,
            category: category
        })
        .then(async (response) => {
            if (response.status == 200) {
                navigation.navigate(routes.Dashboard);
            }
            else {
                Alert.alert('Erreur', 'Merci de vérifier vos informations !')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }  

    return(
        <View style={styles.container}>
            <BackHeader title="Ajouter un business" />

            {/* Body */}
            {!isLoading ?
                <ScrollView style={styles.bodyContainer}>

                    {/* Business Name */}
                    <Text style={styles.subTitle}>Nom du business</Text>
                    <TextInput
                        value={name}
                        style={styles.inputContainer}
                        placeholder="Exp: Directy.."
                        keyboardType="default"
                        textContentType="name"
                        placeholderTextColor={Colors.GRAY_DARK}
                        onChangeText={(text) => setName(text)} />
                    
                    {/* Category */}
                    <Text style={styles.subTitle}>Catégorie</Text>
                    <Picker
                        selectedValue={category}
                        dropdownIconColor={Colors.PRIMARY}
                        style={styles.categoryContainer}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategory(itemValue)
                        }>
                            {pickerItems}
                    </Picker>
                    
                    {/* Address */}
                    <Text style={styles.subTitle}>Adresse</Text>
                        <TextInput
                            value={address}
                            multiline={false}
                            textContentType="addressCityAndState"
                            style={[styles.inputContainer, {marginBottom: 0}]}
                            placeholder="Exp: rue des entrepreneurs, Charguia II .."
                            placeholderTextColor={Colors.GRAY_DARK}
                            onChangeText={(text) => setAddress(text)} />

                    {/* Horaire */}
                    <Text style={styles.subTitle}>Horaire</Text>
                    <View style={styles.rowContainer}>
                        <TextInput
                            value={open}
                            style={[styles.inputContainer, {marginRight: 3, marginBottom: 0}]}
                            placeholder="Ouverture.."
                            keyboardType="numeric"
                            placeholderTextColor={Colors.GRAY_DARK}
                            onChangeText={(text) => setOpen(text)} />
                        <TextInput
                            value={close}
                            style={[styles.inputContainer, {marginLeft: 3, marginBottom: 0}]}
                            placeholder="Fermeture.."
                            keyboardType="numeric"
                            placeholderTextColor={Colors.GRAY_DARK} 
                            onChangeText={(text) => setClose(text)} />
                    </View>

                    {/* Phone */}
                    <Text style={styles.subTitle}>Tél</Text>
                    <TextInput
                        value={phone}
                        style={styles.inputContainer}
                        placeholder="Exp: 22 222 222.."
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        placeholderTextColor={Colors.GRAY_DARK}
                        onChangeText={(text) => setPhone(text)} />
                        
                    {/* Email */}
                    <Text style={styles.subTitle}>Email</Text>
                    <TextInput
                        value={email}
                        style={styles.inputContainer}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        placeholder="Exp: contact@directy.com.."
                        placeholderTextColor={Colors.GRAY_DARK}
                        onChangeText={(text) => setEmail(text)} />
                        
                    {/* Website */}
                    <Text style={styles.subTitle}>Site web</Text>
                    <TextInput
                        value={website}
                        style={styles.inputContainer}
                        keyboardType="web-search"
                        textContentType="URL"
                        placeholder="Exp: www.directy.com.."
                        placeholderTextColor={Colors.GRAY_DARK}
                        onChangeText={(text) => setWebsite(text)} />

                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => __addBusiness()}>
                            <Text style={styles.btnText}>Ajouter</Text>
                    </TouchableOpacity>
                </ScrollView>
         : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    // Body
    bodyContainer: {
        flex: 2,
        padding: 20,
        paddingTop: 0
    },
    pictureContainer: {
        height: 100,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY
    },
    title: {
        fontSize: 15,
        marginTop: 5,
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    inputContainer: {
        flex: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        color: Colors.PRIMARY,
        backgroundColor: Colors.GRAY_LIGHT,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    categoryContainer: {
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        color: Colors.PRIMARY,
        backgroundColor: Colors.GRAY_LIGHT,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    rowContainer: {
        marginBottom: 15,
        flexDirection: 'row',
    },
    iconContainer: {
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY
    },
    subTitle: {
        fontSize: 15,
        marginBottom: 5,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    btnContainer: {
        padding: 12,
        marginTop: 5,
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
})

export default AddBusiness;