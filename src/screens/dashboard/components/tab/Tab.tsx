import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { verticalScale } from 'react-native-size-matters';

interface Props {
    label: string,
    onPressTab: () => void,
}

const Tab: React.FC<Props> = (props) => {

    //#region LETS AND CONSTS

    //#endregion

    //#region LIFECYCLE (useEffect)

    //#endregion

    //#region METHODS

    //#endregion

    //#region RENDER METHODS

    //#endregion

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onPressTab}>
                <Text style={styles.label}>{props.label}</Text>
            </TouchableOpacity>
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        margin: 5,
        backgroundColor: '#616EF0',
        borderRadius: 5,
    },
    label: {
        fontSize: verticalScale(15),
        textAlign: 'center',
        color: 'white',
        padding: 10,
    },
});

export default Tab;