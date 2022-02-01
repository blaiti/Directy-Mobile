import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import axiosInstance from '../../config/axiosInstance';

import BackHeader from '../../components/Headers/BackHeader';
import NearestCard from '../../components/Cards/NearestCard';

import { Colors, Typography } from '../../styles';
import routes from '../../config/routes';

const Business = ({navigation, route}) => {
    const {title} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [business, setBusiness] = useState([]);

    const fetchBusiness = async () => {
        return axiosInstance.get('business/getNearestBusiness')
        .then(function (response) {
          if (response.status == 200) {
            setBusiness(response.data);
            console.log(response.data);
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
        setIsLoading(false);
    }, [])

    return(
        <View style={styles.container}>
            <BackHeader title={title} />

            {/* Body */}
            <View style={styles.bodyContainer}>
                {!isLoading ?
                    <FlatList 
                        data={business}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate(routes.OneBusiness, {business: item})}>
                                        <NearestCard place={item} />
                                </TouchableOpacity>
                            )
                        }} />
                :
                    <ActivityIndicator size="large" color={Colors.PRIMARY} /> 
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
})

export default Business;