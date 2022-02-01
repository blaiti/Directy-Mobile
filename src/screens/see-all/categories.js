import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    View, 
    Text ,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axiosInstance from '../../config/axiosInstance';

import BackHeader from '../../components/Headers/BackHeader';
import { Colors, Typography } from '../../styles';

const Categories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        fetchCategories();
        setIsLoading(false);
    }, [])

    return(
        <View style={styles.container}>
            <BackHeader title="Catégories" />

            {/* Body */}
            <View style={styles.bodyContainer}>
                {!isLoading ?
                    <FlatList 
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.itemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name={item.categoryIcon} color={Colors.PRIMARY} size={25} />
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                    <Text style={styles.title}>{item.categoryName}</Text>
                                </View>
                            </View>
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
    itemContainer: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.GRAY_LIGHT
    },
    iconContainer: {
        height: 45,
        width: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    title: {
        fontSize: 18,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    subTitle: {
        fontSize: 13,
        color: Colors.GRAY_DARK,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})

export default Categories;