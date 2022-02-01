import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';

import AuthContext from '../../context/auth-context';
import axiosInstance from '../../config/axiosInstance';
import BusinessCard from '../../components/Cards/BusinessCard';

const Dashboard = ({navigation}) => {
    const {authContext, state} = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [business, setBusiness] = useState();

    const fetchBusiness = async () => {
        return axiosInstance.get('business/getBusinessByOwner',
        {
          headers: {
            'Authorization': `Bearer ${state.userToken}` 
          }
        })
        .then(function (response) {
            if (response.status == 200) {
                setBusiness(response.data);
                console.log(response.data);
                setIsLoading(false);
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
        fetchBusiness();
    }, [])

    return(
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                    <View style={{justifyContent: 'space-between'}}>
                        <Text style={styles.headerTitle}>Bonjour</Text>
                        <Text style={styles.headerSubTitle}>Content de vous revoir !</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => authContext.signOut()}>
                            <Icon name="log-out" color={Colors.PRIMARY} size={20} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[styles.rowContainer, styles.btnContainer]}
                    onPress={() => navigation.navigate(routes.AddBusiness)} >
                        <Icon name="plus-square" color={Colors.PRIMARY} size={20} />
                        <Text style={[styles.headerSubTitle, {marginLeft: 5, fontSize: 15, color: Colors.PRIMARY}]}>Ajouter un business</Text>
                </TouchableOpacity>
            </View>

            {/* Body */}
            <View style={styles.bodyContainer}>
                {!isLoading ?
                    business.length == 0 ?
                        <Text style={styles.subTitle}>Vous n'avez aucun business</Text>
                    :
                        <FlatList 
                            data={business}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => {
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate(routes.EditBusiness, {business: item._id, title: item.businessName})}>
                                            <BusinessCard place={item} />    
                                    </TouchableOpacity>
                                )
                            }}
                        />
                : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    // Header
    headerContainer: {
        padding: 20
    },
    headerTitle: {
        fontSize: 18,
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    headerSubTitle: {
        fontSize: 13,
        color: Colors.GRAY_MEDIUM,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    rowContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    btnContainer: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    // Body Container
    bodyContainer: {
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.WHITE
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'center',
        color: Colors.GRAY_MEDIUM,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
})

export default Dashboard;