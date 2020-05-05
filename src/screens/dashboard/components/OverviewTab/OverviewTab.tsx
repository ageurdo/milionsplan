import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, Platform } from 'react-native';
import theme from '../../../../constants/theme';
import { verticalScale } from 'react-native-size-matters';
import { Item } from '../../../../components/itemList/ItemList';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
    style?: any,
    label: string,
    color: string,
    value: string,
}

const OverviewTab: React.FC<Props> = (props) => {

    //#region LETS AND CONSTS
    const [revenues, setRevenues] = useState<Item[]>([]);
    //#endregion

    //#region LIFECYCLE (useEffect)

    //#endregion

    //#region METHODS
    function getData(storagekey: string) {
        try {
            AsyncStorage.getItem(storagekey)
                .then((response) => {
                    let newRevenue = [];
                    if (response !== null) {
                        // We have data!!
                        newRevenue = JSON.parse(response);
                    }
                    setRevenues(newRevenue);
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setRevenues([]);
            }
        }
        finally {
            // _sum();
        }
    };
    //#endregion

    //#region RENDER METHODS
    function _renderItemOverviewTab() {

        return (
            <View style={styles.containerItemOverviewTab}>
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
    //#endregion

    return (
        <View style={styles.container}>

            {_renderItemOverviewTab()}

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'column',
        width: '100%',
    },

    // OverviewItem

    containerItemOverviewTab: {
        flex: 1,
    },
    containerItem: {
        margin: 0,
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingVertical: 5,
    },
    labelItem: {
        fontSize: verticalScale(10),
        fontFamily: theme.fonts.italic.fontFamily,
        color: 'grey',
        marginBottom: Platform.OS == 'web' ? -5 : 10,
    },
    valueItem: {
        fontSize: verticalScale(20),
        fontFamily: theme.fonts.boldFont.fontFamily,
        marginLeft: 10,
    },

});

export default OverviewTab;