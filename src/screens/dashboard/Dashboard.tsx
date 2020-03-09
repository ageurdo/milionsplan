import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Platform, FlatList, AsyncStorage } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import theme from './../../constants/theme';
import HeaderDashboard from './components/headerDashboard/headerDashboard';
import ItemOverviewTab from './components/OverviewTab/item/Item';
import OverviewTab from './components/OverviewTab/OverviewTab';
import Tab from './components/tab/Tab';
import Menu from '../../components/menu/Menu';
import { useNavigation } from '@react-navigation/native';
import ItemList, { Item } from '../../components/itemList/ItemList';

interface Props { }

const Dashboard: React.FC<Props> = (props) => {

    //#region LETS AND CONSTS
    const defaultColor = theme.colors.defaultDashboardColor;
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const { navigate } = useNavigation();
    const [revenues, setRevenues] = useState<Item[]>([]);
    const STORAGE_KEY = 'Debts'
    //#endregion

    //#region LIFECYCLE (useEffect)

    useEffect(
        () => {
            getData();
        },
        []
    );

    //#endregion

    //#region METHODS

    function _renderItem(revenue: Item) {
        return (
            < ItemList
                id={revenue.id}
                description={revenue.description}
                dateTime={revenue.dateTime}
                bucks={revenue.bucks}
                colorDefault={defaultColor}
            />
        );
    }

    function getData() {
        try {
            AsyncStorage.getItem(STORAGE_KEY)
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


    function _renderTransactions() {
        return (
            <View>
                <View>
                    <Text style={styles.transactionsTitle}>Últimos movimentos</Text>
                </View>

                <View style={styles.tab}>
                    <Tab label={'Dia'} onPressTab={() => { }} />
                    <Tab label={'Semana'} onPressTab={() => { }} />
                    <Tab label={'Mês'} onPressTab={() => { }} />
                    <Tab label={'Ano'} onPressTab={() => { }} />
                </View>

                <View>
                    <FlatList
                        style={{}}
                        data={revenues}
                        renderItem={({ item, index }) => _renderItem(item)}
                        keyExtractor={item => item.id}
                    />
                </View>


            </View>
        );
    };

    //#endregion

    //#region RENDER METHODS

    //#endregion

    return (
        <View style={styles.container}>
            <View>
                <HeaderDashboard
                    colorFrom={defaultColor}
                    colorTo={defaultColor}
                    colorIcon={defaultColor}
                />
            </View>

            <View style={styles.overviewTab} >
                <OverviewTab />

            </View>
            <View style={styles.transactions} >
                {_renderTransactions()}
            </View>

            <View style={styles.menu}>
                <Menu onAddPress={() => { setPromptInsertVisible(true) }}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestimentsPress={() => navigate('Investiments')}
                    onRevenuePress={() => navigate('Revenue')}
                    defaultColor={defaultColor}
                />
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
        height: verticalScale(250),
    },
    tab: {
        flexDirection: 'row',
        marginHorizontal: 15
    },
    transactions: {
    },
    transactionsTitle: {
        fontSize: verticalScale(18),
        fontFamily: theme.fonts.semiBoldFont.fontFamily,
        marginHorizontal: 20,
        marginBottom: 12,
    },

    menu: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },


});

export default Dashboard;