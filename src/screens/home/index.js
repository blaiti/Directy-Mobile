import React, {useState, useEffect} from 'react';
import {
   StyleSheet,
   Image,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   FlatList,
   ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";

import BlockHeader from '../../components/Headers/BlockHeader';
import CategoryCard from '../../components/Cards/CategoryCard';
import NearestCard from '../../components/Cards/NearestCard';

import axiosInstance from '../../config/axiosInstance';

import { Colors, Typography } from '../../styles';
import routes from '../../config/routes';
 
const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [business, setBusiness] = useState([]);

    const fetchCategories = async () => {
        return axiosInstance.get('category/getCategories')
        .then(function (response) {
          if (response.status == 200) {
            setCategories(response.data);
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
        fetchCategories();
        fetchBusiness();
        setIsLoading(false);
    }, [])

    return (
        <View style={styles.container}>
            {/* Header Container */}
            <View style={styles.headerContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{justifyContent: 'space-between'}}>
                        <Text style={styles.headerTitle}>Bonjour,</Text>
                        <Text style={styles.headerSubTitle}>Content de vous revoir !</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.avatarContainer}
                        onPress={() => navigation.navigate(routes.AuthStack)}>
                        <Icon name="user-plus" color={Colors.PRIMARY} size={25} />
                    </TouchableOpacity>
                </View>
                {/*
                <View style={styles.rowContainer}>
                    <View style={styles.inputContainer}>
                        <Icon name="search" color={Colors.GRAY_DARK} size={25} />
                        <TextInput
                            style={styles.input}
                            placeholder="Recherche.."
                            placeholderTextColor={Colors.GRAY_DARK}
                            onPressIn={() => navigation.navigate(routes.Search)} />
                    </View>
                    <TouchableOpacity style={styles.filterContainer} >
                        <Icon name="navigation" color={Colors.PRIMARY} size={20} />
                    </TouchableOpacity>
                </View>
                */}
            </View>

            {/* Body Container */}
            <View style={styles.bodyContainer}>
                {!isLoading ?
                    <FlatList 
                    data={business}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return(
                            <>
                                <View style={[styles.blockContainer, {marginBottom: 20}]}>
                                    <BlockHeader title="Catégories" screen={routes.Categories} />
                                    {categories.length != 0 ?
                                        <View style={styles.categories}>
                                            <CategoryCard icon={categories[0].categoryIcon} label={categories[0].categoryName} />
                                            <CategoryCard icon={categories[1].categoryIcon} label={categories[1].categoryName} />
                                            <CategoryCard icon={categories[2].categoryIcon} label={categories[2].categoryName} />
                                            <CategoryCard icon={categories[3].categoryIcon} label={categories[3].categoryName} />
                                        </View>
                                    : null}
                                </View>
                                
                                <BlockHeader title="Les plus proches" screen={routes.Business} /> 
                            </>
                        )
                    }}
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
    );
};
 
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
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    // Search
    rowContainer: {
        marginTop: 30,
        flexDirection: 'row',
    },
    filterContainer: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    },
    input: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        color: Colors.GRAY_DARK,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    // Body Container
    bodyContainer: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.WHITE
    },
    blockContainer: {
        marginTop: 20,
    },
    title: {
        marginBottom: 10,
        fontSize: 18,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
 
 export default Home;
 