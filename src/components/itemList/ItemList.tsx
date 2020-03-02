import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../constants/theme';

export interface Item {
    id: string,
    titleEntry: string,
    dateTime: string,
    bucks: string,

};

const ItemList: React.FC<Item> = (props) => {
    return (
        <TouchableOpacity style={styles.container}>

            <View style={styles.containerIcon}>
                <Feather name="dollar-sign" size={18} color='#fff' />
            </View>

            <View>
                <Text style={styles.title}>{props.titleEntry}</Text>
                <Text style={styles.dateTime}>{props.dateTime}</Text>
            </View>

            <View style={styles.containerBucks}>
                <Text style={styles.bucks}>{props.bucks}</Text>
            </View>

        </TouchableOpacity >
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,

        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,

        backgroundColor: '#fff',
        ...theme.shadow,
    },

    title: {
        fontSize: 18,
        fontWeight: '500',
        color: '#747474',
        fontFamily: theme.fonts.boldFont.fontFamily,
    },

    dateTime: {
        fontSize: 11,
        color: '#A2A2A2',
        fontFamily: theme.fonts.default.fontFamily,
    },

    containerBucks: {
        flex: 1,
    },

    bucks: {
        paddingRight: 15,
        fontSize: 20,
        textAlign: 'right',
        color: '#747474',
        fontFamily: theme.fonts.boldFont.fontFamily,
    },

    containerIcon: {
        height: moderateScale(25),
        width: moderateScale(25),
        backgroundColor: theme.colors.defaultGreenColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
});

export default ItemList;