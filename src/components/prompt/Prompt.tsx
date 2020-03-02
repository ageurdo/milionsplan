import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import theme from './../../constants/theme';

export interface Props {
    label: string,
    btnConfirm: string,
    btnCancel: string,
    btnConfirmPress: () => void,
    btnCancelPress: () => void,
    visibleModal: boolean,
    img?: string,
}

// const [visibleModal, setVisibleModal] = useState(visible);

const Prompt: React.FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerModal}>
                <View style={styles.containerIcon}>
                    <Image
                        source={require('./../../../assets/logo.png')}
                        style={styles.icon} />
                </View>
                <View style={styles.content}>

                    <Text style={styles.label}>{props.label}</Text>


                    <View style={styles.input}>
                        <TextInput style={{ fontSize: 40 }} />
                    </View>
                </View>

                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={props.btnCancelPress} style={styles.buttonCancel}>
                        <Text style={styles.buttonTextCancel}>
                            {props.btnCancel}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOk}>
                        <Text style={styles.buttonTextOk}>
                            {props.btnConfirm}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0,0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    containerModal: {
        width: verticalScale(300),
        height: verticalScale(200),
        backgroundColor: 'white',
        position: "absolute",
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    content: {
        marginBottom: 20,
    },
    label: {
        textAlign: 'center',
        color: 'black',
        fontSize: verticalScale(18),
        marginBottom: 20,
    },
    input: {
        width: verticalScale(250),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        height: verticalScale(30),
        borderColor: 'grey',
        borderWidth: 0.7,

    },
    containerIcon: {
        width: verticalScale(80),
        height: verticalScale(80),
        marginTop: verticalScale(-40),
        borderRadius: verticalScale(40),
        backgroundColor: theme.colors.defaultGreenColor,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: verticalScale(50),
        height: verticalScale(50),
        alignSelf: 'center',
    },
    containerButton: {
        flexDirection: 'row',
        height: verticalScale(50),
        top: 1,
    },
    buttonOk: {
        backgroundColor: theme.colors.defaultGreenColor,
        justifyContent: 'center',
        borderBottomRightRadius: 10,
    },
    buttonCancel: {
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
    },
    buttonTextOk: {
        textAlign: 'center',
        fontSize: verticalScale(18),
        width: verticalScale(150),
        bottom: 0,
        color: 'white',
    },
    buttonTextCancel: {
        textAlign: 'center',
        color: '#505050',
        fontSize: verticalScale(18),
        width: verticalScale(150),
        bottom: 0,
    },
});
export default Prompt;