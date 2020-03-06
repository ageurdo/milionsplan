import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import theme from './../../constants/theme';
import HeaderDashboard from './components/headerDashboard/headerDashboard';
import ItemOverviewTab from './components/OverviewTab/item/Item';
import OverviewTab from './components/OverviewTab/OverviewTab';

interface Props { }

const Dashboard: React.FC<Props> = (props) => {

    //#region LETS AND CONSTS
    const defaultColor = theme.colors.defaultDashboardColor;
    //#endregion

    //#region LIFECYCLE (useEffect)

    //#endregion

    //#region METHODS
    function _renderHeader() {
        return (
            <View style={{ borderRadius: 20 }}>
                <HeaderDashboard
                    colorFrom={defaultColor}
                    colorTo={defaultColor}
                    colorIcon={defaultColor}
                />
            </View>
        );
    };

    //#endregion

    //#region RENDER METHODS

    //#endregion

    return (
        <View style={styles.container}>

            {_renderHeader()}
            <View style={styles.overviewTab} >
                <OverviewTab />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    header: {
        height: verticalScale(200),
        zIndex: 0,
    },
    overviewTab: {
        top: -50,
        marginHorizontal: 20,
        height: verticalScale(220),
        width: '95%',
        // justifyContent: 'center',
        // alignItems: 'center',

    },
});

export default Dashboard;