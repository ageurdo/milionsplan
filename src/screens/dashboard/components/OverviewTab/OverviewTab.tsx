import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

            <View style={styles.overviewTab}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>Overview</Text>
                </View>
                <View>
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
        flex: 1,
    },

    overviewTab: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'flex-end',
        paddingVertical: 20,
        borderRadius: 25,
        zIndex: 5,

    },
});

export default OverviewTab;