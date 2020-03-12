import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, TextInput, ImageBackground, Platform } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import theme from '../../../constants/theme';
import { Item } from '../../itemList/ItemList'
import { TextInputMask } from 'react-native-masked-text'
import moment from "moment";

export interface Props {
    label: string,
    labelBtnConfirm: string,
    labelBtnCancel: string,
    btnConfirmPress: (obj: Item) => void,
    btnCancelPress: () => void,
    img?: string,
    inputDescription?: string,
    inputValue?: string,
    defaultColor: string,
}

const PromptInsert: React.FC<Props> = (props) => {
    const defaultColor = props.defaultColor;
    const [description, setDescription] = useState<string>('');
    const [BucksEntry, setBucksEntry] = useState<string>('');


    const object: Item = {
        id: new Date().toString(),
        description: description,
        bucks: BucksEntry,
        // dateTime: new Date().toString(),
        dateTime: moment().format("YYYY-MM-DD HH:mm")
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerModal}>
                <View style={[styles.containerIcon, { backgroundColor: defaultColor }]}>
                    <Image
                        source={require('./../../../../assets/logo.png')}
                        style={styles.icon} />
                </View>
                <View style={styles.content}>

                    <Text style={styles.label}>
                        {props.label}
                    </Text>

                    <TextInput placeholder={'Descrição'}
                        style={[styles.input]}
                        onChangeText={setDescription}
                        value={description} />
                    <TextInput
                        keyboardType={"numeric"}
                        placeholder={'Valor'}
                        style={[styles.input]}
                        onChangeText={setBucksEntry}
                        value={BucksEntry} />
                </View>

                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={props.btnCancelPress} style={styles.buttonCancel}>
                        <Text style={styles.buttonTextCancel}>
                            {props.labelBtnCancel}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonOk, { backgroundColor: defaultColor }]} onPress={() => {
                        props.btnConfirmPress(object);
                        setDescription('')
                    }}>
                        <Text style={styles.buttonTextOk}>
                            {props.labelBtnConfirm}
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
        ...theme.shadow10,
    },
    containerModal: {
        width: verticalScale(300),
        height: verticalScale(230),
        backgroundColor: 'white',
        position: "absolute",
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    content: {
        marginBottom: 20,

        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'column',
        borderRadius: 5,
        borderColor: 'grey',
    },
    label: {
        textAlign: 'center',
        color: 'black',
        fontSize: verticalScale(18),
        marginBottom: 20,
        marginEnd: 30,
    },

    containerInput: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'column',
        borderRadius: 5,
        height: verticalScale(30),
        borderColor: 'grey',

    },
    input: {
        width: '100%',
        borderWidth: 0.7,
        borderColor: 'grey',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: verticalScale(20),
        marginVertical: 5,
        height: verticalScale(30),
    },

    containerIcon: {
        width: verticalScale(80),
        height: verticalScale(80),
        marginTop: verticalScale(-40),
        borderRadius: verticalScale(40),
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
    },
    buttonOk: {
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
        color: 'white',
    },
    buttonTextCancel: {
        textAlign: 'center',
        color: '#505050',
        fontSize: verticalScale(18),
        width: verticalScale(150),
    },
});
export default PromptInsert;