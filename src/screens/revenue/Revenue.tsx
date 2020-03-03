import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/header/Header';
import ItemList, { Item } from '../../components/itemList/ItemList';
import Totaltab from '../../components/totalTab/TotalTab';
import Menu from '../../components/menu/Menu';
import { verticalScale } from 'react-native-size-matters';
import Prompt from '../../components/prompt/Prompt';
import { useNavigation } from '@react-navigation/native';
import Debt from '../debt/Debt';
import Expenses from '../expenses/Expenses';
import investiments from '../investiments/Investiments';
import { AsyncStorage } from 'react-native';
import { TapGestureHandler, RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';


const Home: React.FC = () => {

    const { navigate } = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const [revenues, setRevenues] = useState<Item[]>([]);

    const STORAGE_KEY = 'revenue'

    useEffect(
        () => {
            getData();
        },
        [modalVisible]
    );



    function _renderItem(revenue: Item, index) {
        return (
            < ItemList
                id={revenue.id}
                titleEntry={revenue.titleEntry}
                dateTime={revenue.dateTime}
                bucks={revenue.bucks}
                btnRemovePress={() => { remove(revenue.id) }}
            />
        );
    }

    async function setData(revenue: Item) {
        try {
            let newRevenues = [...revenues, revenue];
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRevenues));
        } catch (error) {
            // Error saving data
        }
        finally {
            setModalVisible(false);
        }
    };

    function getData() {
        try {
            AsyncStorage.getItem(STORAGE_KEY)
                .then((response) => {
                    let newRevenue = [];
                    if (response !== null) {
                        // We have data!!
                        newRevenue = JSON.parse(response);
                        console.log(newRevenue);
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
    };

    async function remove(id: string) {
        // let result = await Promise.all(revenues.map((item) => AsyncStorage.getItem(item.id)));
        // result = result.filter(Boolean); // filter all non-truthy values
        // console.log('result', result);
        try {
            AsyncStorage.getItem(STORAGE_KEY)
                .then((response) => {
                    let newRevenues = [];
                    if (response !== null) {
                        // We have data!!
                        newRevenues = JSON.parse(response).filter(e => e.id !== id);
                        console.log(newRevenues);
                    }
                    setRevenues(newRevenues);
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRevenues));
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setRevenues([]);
            }
        }
    }

    function _renderModal() {
        return (
            modalVisible &&
            <View style={styles.prompt}>
                <Prompt label={'Insira sua nova receita'}
                    btnConfirm={'Inserir'}
                    btnCancel={'Fechar'}
                    btnConfirmPress={setData}
                    btnCancelPress={() => { setModalVisible(false) }}
                />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Header style={styles.header} />
            <View style={styles.totalTab}>
                <Totaltab label={'Total'} value={'5000'} onPress={() => { setModalVisible(true) }} />
            </View>
            <FlatList
                style={styles.flatlist}
                data={revenues}
                renderItem={({ item, index }) => _renderItem(item, index)}
                keyExtractor={item => item.id}
            />

            <View style={styles.menu}>
                <Menu onAddPress={() => { setModalVisible(true) }}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestimentsPress={() => navigate('Investiments')}
                    onRevenuePress={() => navigate('Revenue')}
                />
            </View>

            {_renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        zIndex: 5,
    },
    totalTab: {
        marginTop: verticalScale(-40),
        // zIndex: 5,
    },
    flatlist: {
        marginTop: verticalScale(5),
    },
    prompt: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        // zIndex: 5,
    },

});

export default Home;
