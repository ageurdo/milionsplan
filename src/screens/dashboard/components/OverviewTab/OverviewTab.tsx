import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ItemOverviewTab from './item/Item';
import theme from '../../../../constants/theme';
import { verticalScale } from 'react-native-size-matters';

interface Props {
    style?: any,
}

const OverviewTab: React.FC<Props> = (props) => {

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
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Dashboard</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.balanco}>
                    <Image style={{ height: verticalScale(150), width: verticalScale(150) }} source={require('./../../../../../assets/graph.png')}></Image>
                </View>
                <View style={styles.itens}>
                    <ItemOverviewTab label={"Receitas"} value={"5020"} color={theme.colors.defaultGreenColor} />
                    <ItemOverviewTab label={"Despesas"} value={"2500"} color={theme.colors.defaultRedColor} />
                    <ItemOverviewTab label={"Dívidas"} value={"800"} color={theme.colors.defaultOrangeColor} />
                    <ItemOverviewTab label={"Investimentos"} value={"260"} color={theme.colors.defaultPurpleColor} />
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 25,
        flexDirection: 'column',
        width: '100%',
    },

    title: {
        paddingTop: 15,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: theme.fonts.semiBoldFont.fontFamily,
    },
    content: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        height: verticalScale(200),
    },
    balanco: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        height: '100%',
        justifyContent: 'center',

    },
    itens: {
        alignItems: 'flex-end',
        width: '50%',
        height: '100%',
        // backgroundColor: 'red',
        flexDirection: 'column',
    },

});

export default OverviewTab;