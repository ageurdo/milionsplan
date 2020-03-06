import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import theme from '../../../../../constants/theme';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
    label: string,
    value: string,
    color: string,
}

const ItemOverviewTab: React.FC<Props> = (props) => {

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
            <View style={styles.containerItem}>
                <Text style={styles.labelItem}>{props.label}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="circle" size={12} color={props.color} />
                    <Text style={styles.valueItem}>${props.value}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerItem: {
        alignItems: 'flex-end',
        paddingRight: 30,
        paddingVertical: 10,
    },
    labelItem: {
        fontSize: verticalScale(10),
        fontFamily: theme.fonts.italic.fontFamily,
        color: 'grey',
        marginBottom: Platform.OS == 'web' ? -10 : -8,
    },
    valueItem: {
        fontSize: verticalScale(20),
        fontFamily: theme.fonts.boldFont.fontFamily,
        marginLeft: 10,
    },
});

export default ItemOverviewTab;