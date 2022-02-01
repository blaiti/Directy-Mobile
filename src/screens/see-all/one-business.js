import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import BackHeader from '../../components/Headers/BackHeader';

import { Colors, Typography } from '../../styles';

const OneBusiness = ({route}) => {
    const {business} = route.params;

    return(
        <View style={styles.container}>
            <BackHeader title={business.businessName} />

            {/* Body */}
            <View style={styles.bodyContainer}>
                <Image
                    resizeMode='cover'
                    style={{height: 150, borderRadius: 10}}
                    source={{ uri: business.businessPicture }} />

                <View style={styles.blockContainer}>
                    <Text style={[styles.title, {fontSize: 22}]}>Détails: </Text>
                    <View style={styles.rowContainer}>
                        <Icon name="award" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Catégorie: </Text>
                            <Text style={styles.subTitle}>{business.category}</Text>
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="map-marker-alt" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Lieu: </Text>
                            <Text style={styles.subTitle}>{business.address}</Text>
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="clock" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Ouvert: </Text>
                            <Text style={styles.subTitle}>{business.businessSchedule}</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.blockContainer}>
                    <Text style={[styles.title, {fontSize: 22}]}>Contact: </Text>
                    <View style={styles.rowContainer}>
                        <Icon name="mobile-alt" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Tél: </Text>
                            <Text style={styles.subTitle}>{business.businessPhone}</Text>
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="envelope" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Email: </Text>
                            <Text style={styles.subTitle}>{business.businessEmail}</Text>
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="globe" color={Colors.PRIMARY} size={20} />
                        <Text style={{marginLeft: 5}}>
                            <Text style={styles.title}>Site web: </Text>
                            <Text style={styles.subTitle}>{business.businessWebsite}</Text>
                        </Text>
                    </View>
                </View>
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
    blockContainer: {
        marginTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_MEDIUM
    },
    rowContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    subTitle: {
        fontSize: 16,
        color: Colors.PRIMARY,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    }
})

export default OneBusiness;