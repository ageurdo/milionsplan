import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import theme from '../../constants/theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { platform } from 'os';

export interface Item {
    id: string,
    titleEntry: string,
    dateTime: string,
    bucks: string,
    btnRemovePress: () => void,

};

const ItemList: React.FC<Item> = (props) => {

    function RightAction() {
        return (
            <View style={styles.rightAction}>
                <TouchableOpacity onPress={() => { props.btnRemovePress() }}>
                    <Feather name="trash-2" size={28} color='#fff' />
                </TouchableOpacity>
            </View>
        );
    }

    function LeftAction() {
        return (
            <View style={styles.leftAction}>
                <TouchableOpacity onPress={() => { props.btnRemovePress() }}>
                    <Feather name="edit" size={28} color='#fff' />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <Swipeable
            renderRightActions={RightAction}
            renderLeftActions={LeftAction}
        >
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
        </Swipeable>
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
        ...theme.shadow1,

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
    rightAction: {
        width: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        left: Platform.OS == 'web' ? -20 : 20,
        marginRight: -10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FF6060',
        ...theme.shadow1,
    },
    leftAction: {
        width: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        left: Platform.OS == 'web' ? -20 : 10,
        marginRight: -10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#7EADD6',
        ...theme.shadow1,
    },
});

export default ItemList;