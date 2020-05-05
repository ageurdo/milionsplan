import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image, FlatList, AsyncStorage } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import theme from './../../constants/theme';
import HeaderDashboard from './components/headerDashboard/headerDashboard';
import ItemOverviewTab from './components/OverviewTab/item/Item';
import OverviewTab from './components/OverviewTab/OverviewTab';
import Tab from './components/tab/Tab';
import FooterMenu from '../../components/menu/FooterMenu';
import { useNavigation } from '@react-navigation/native';
import ItemList, { Item } from '../../components/itemList/ItemList';

interface Props { }

const Dashboard: React.FC<Props> = (props) => {

    //#region LETS AND CONSTS
    const defaultColor = theme.colors.defaultDashboardColor;
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const { navigate } = useNavigation();
    const [revenues, setRevenues] = useState<Item[]>([]);
    const [revenuesSum, setRevenuesSum] = useState(0);
    const [debtsSum, setDebstSum] = useState(0);
    const [expensesSum, setExpensesSum] = useState(0);
    const [investmentsSum, setInvestimentsSum] = useState(0);
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
                isSwipeable={false}
            />
        );
    }

    function getData() {
        try {
            // Revenues Sum
            AsyncStorage.getItem('Revenues_Sum')
                .then((response) => {
                    let newRevenueSum = 0;
                    if (response !== null) {
                        // We have data!!
                        newRevenueSum = JSON.parse(response);
                    }
                    setRevenuesSum(newRevenueSum);
                });

            // Expenses
            AsyncStorage.getItem('Expenses_Sum')
                .then((response) => {
                    let newExpensesSum = 0;
                    if (response !== null) {
                        // We have data!!
                        newExpensesSum = JSON.parse(response);
                    }
                    setExpensesSum(newExpensesSum);
                });

            // Debt
            AsyncStorage.getItem('Debts_Sum')
                .then((response) => {
                    let newDebtsSum = 0;
                    if (response !== null) {
                        // We have data!!
                        newDebtsSum = JSON.parse(response);
                    }
                    setDebstSum(newDebtsSum);
                    console.log(newDebtsSum, "newDebtsSum");
                });

            // Investiments Sum
            AsyncStorage.getItem('Investments_Sum')
                .then((response) => {
                    let newInvestimentsSum = 0;
                    if (response !== null) {
                        // We have data!!
                        newInvestimentsSum = JSON.parse(response);
                    }
                    setInvestimentsSum(newInvestimentsSum);
                    console.log(newInvestimentsSum, "newInvestimentsSum");
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
                    <Text style={styles.transactionsTitle}>Lastest Transactions</Text>
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
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Dashboard</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.balanco}>
                    <Image style={{ height: verticalScale(150), width: verticalScale(150) }} source={require('./../../../assets/graph.png')}></Image>
                </View>
                <View style={styles.overviewTab} >
                    <OverviewTab label={"Revenues"} value={revenuesSum.toString()} color={theme.colors.defaultGreenColor} />
                    <OverviewTab label={"Expenses"} value={expensesSum.toString()} color={theme.colors.defaultRedColor} />
                    <OverviewTab label={"Debts"} value={debtsSum.toString()} color={theme.colors.defaultOrangeColor} />
                    <OverviewTab label={"Investments"} value={investmentsSum.toString()} color={theme.colors.defaultPurpleColor} />

                </View>

            </View>
            <View style={styles.transactions} >
                {_renderTransactions()}
            </View>

            <View style={styles.menu}>
                <FooterMenu onAddPress={() => { setPromptInsertVisible(true) }}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestmentsPress={() => navigate('Investiments')}
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
    tab: {
        flexDirection: 'row',
        marginHorizontal: 5,
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
    title: {
        paddingTop: 15,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: theme.fonts.semiBoldFont.fontFamily,
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    overviewTab: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    balanco: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    // itens: {
    //     alignItems: 'flex-end',
    //     width: '50%',
    //     height: '100%',
    //     // backgroundColor: 'red',
    //     flexDirection: 'column',
    // },


});

export default Dashboard;