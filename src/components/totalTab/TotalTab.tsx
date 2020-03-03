import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from './../../constants/theme'
import { verticalScale } from 'react-native-size-matters';
import Lottie from 'lottie-react-native';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';


export interface Props {
    label: string,
    value: string,
    onPress: () => void,
}

function LottieRun() {
    return (
        <View style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}>
            <Lottie resizeMode="cover" source={require('./../../../assets/json/money.json')} autoPlay loop />
        </View>
    );
}

const TotalTab: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.label}>
                    {props.label}
                </Text>
                <Text style={styles.value}>
                    {props.value}
                </Text>
            </View>
            {Platform.OS !== 'web' ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={props.onPress}>
                        {LottieRun()}
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.containerPlusButton}>
                    <TouchableOpacity onPress={props.onPress}>
                        <Feather name="plus" style={styles.plusButton} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: verticalScale(80),
        backgroundColor: 'white',
        borderRadius: 10,
        ...theme.shadow1,
    },
    label: {
        fontSize: 15,
        marginBottom: -10,
        marginLeft: 5,
        color: '#747474',
        fontFamily: theme.fonts.boldFont.fontFamily,
    },
    value: {
        fontSize: 50,
        color: theme.colors.defaultGreenColor,
        fontFamily: theme.fonts.semiBoldFont.fontFamily,

    },
    containerPlusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: theme.colors.defaultGreenColor,
        borderRadius: verticalScale(25),
        width: verticalScale(50),
        height: verticalScale(50),

    },
    plusButton: {
        fontSize: 50,
        color: '#fff',

    },
});

export default TotalTab;