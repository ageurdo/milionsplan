import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import theme from './../../constants/theme'

export interface Props {
    onAddPress: () => void,
    onRevenuePress?: () => void,
    onExpensesPress?: () => void,
    onDebtPress?: () => void,
    onInvestimentsPress?: () => void,
};

const Menu: React.FC<Props> = (props) => {
    let buttonStyle = !props.onAddPress ? [styles.plusButton, styles.buttonActive] : [styles.plusButton, styles.buttonNotActive]
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { props.onRevenuePress() }} style={styles.containerButton}>
                <Feather name='image' color='#fff' size={50} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.onExpensesPress() }} style={styles.containerButton}>
                <Feather name='inbox' color='#fff' size={50} />
            </TouchableOpacity>

            <View style={styles.containerPlusButton}>
                <TouchableOpacity onPress={() => { props.onAddPress() }}>
                    <Feather name="plus" style={buttonStyle} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { props.onDebtPress() }} style={styles.containerButton}>
                <Feather name='layers' color='#fff' size={50} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.onInvestimentsPress() }} style={styles.containerButton}>
                <Feather name='lock' color='#fff' size={50} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.defaultGreenColor,
        paddingVertical: 25,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    containerButton: {
        width: verticalScale(50),
        height: verticalScale(50),
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        borderRadius: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerPlusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: verticalScale(50),
        width: verticalScale(50),
        height: verticalScale(50),
    },
    plusButton: {
        fontSize: 50,
        color: '#fff',

    },
    buttonActive: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#fff',
    },
    buttonNotActive: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
});
export default Menu;