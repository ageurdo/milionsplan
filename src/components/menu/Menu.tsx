import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HeaderBackground } from 'react-navigation-stack';
import { verticalScale } from 'react-native-size-matters';
import theme from './../../constants/theme'

export interface Props {
    onPressAdd: () => void,
};

const Menu: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Feather name='image' color='#fff' size={50} />
            <Feather name='inbox' color='#fff' size={50} />
            <View style={styles.containerPlusButton}>
                <TouchableOpacity onPress={() => { props.onPressAdd() }}>
                    <Feather name="plus" style={styles.plusButton} />
                </TouchableOpacity>
            </View>
            <Feather name='layers' color='#fff' size={50} />
            <Feather name='lock' color='#fff' size={50} />
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
    containerPlusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: verticalScale(50),
        width: verticalScale(100),
        height: verticalScale(100),
    },
    plusButton: {
        fontSize: 50,
        color: '#fff',

    },
});
export default Menu;