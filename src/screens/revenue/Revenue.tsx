import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageEditor } from 'react-native';
import Header from '../../components/header/Header';
import ItemList, { Item } from '../../components/itemList/ItemList';
import Totaltab from '../../components/totalTab/TotalTab';
import Menu from '../../components/menu/Menu';
import { verticalScale } from 'react-native-size-matters';
import Prompt from '../../components/prompt/insert/PromptInsert';
import { useNavigation } from '@react-navigation/native';
import Debt from '../debt/Debt';
import Expenses from '../expenses/Expenses';
import investiments from '../investiments/Investiments';
import { AsyncStorage } from 'react-native';
import { TapGestureHandler, RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import PromptEdit from '../../components/prompt/edit/PromptEdit';
import PromptInsert from '../../components/prompt/insert/PromptInsert';


const Home: React.FC = () => {

    const { navigate } = useNavigation();
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const [promptEditVisible, setPromptEditVisible] = useState(false);

    const [revenues, setRevenues] = useState<Item[]>([]);

    const STORAGE_KEY = 'revenue'

    useEffect(
        () => {
            getData();
        },
        [promptInsertVisible, promptEditVisible]
    );

    function _renderItem(revenue: Item, index) {
        return (
            < ItemList
                id={revenue.id}
                description={revenue.description}
                dateTime={revenue.dateTime}
                bucks={revenue.bucks}
                btnRemovePress={() => { remove(revenue.id) }}
                btnEditPress={() => setPromptEditVisible(true)}
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
            setPromptInsertVisible(false);
            setPromptEditVisible(false);
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

    function _renderPromptEdit(revenue?: Item) {
        return (
            promptEditVisible &&
            <View style={styles.prompt}>
                <PromptEdit label={'Edite os dados da sua receita'}
                    labelBtnConfirm={'Salvar'}
                    labelBtnCancel={'Fechar'}
                    btnConfirmPress={setData}
                    btnCancelPress={() => { setPromptEditVisible(false) }}
                    inputDescription={revenue.description.toString()}
                    inputValue={revenue.bucks.toString()}
                />
            </View>
        )
    }

    function _renderPromptInsert() {
        return (
            promptInsertVisible &&
            <View style={styles.prompt}>
                <PromptInsert label={'Insira sua nova receita'}
                    labelBtnConfirm={'Inserir'}
                    labelBtnCancel={'Fechar'}
                    btnConfirmPress={setData}
                    btnCancelPress={() => { setPromptInsertVisible(false) }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header style={styles.header} />
            <View style={styles.totalTab}>
                <Totaltab label={'Total'} value={'5000'} onPress={() => { setPromptInsertVisible(true) }} />
            </View>
            <FlatList
                style={styles.flatlist}
                data={revenues}
                renderItem={({ item, index }) => _renderItem(item, index)}
                keyExtractor={item => item.id}
            />

            <View style={styles.menu}>
                <Menu onAddPress={() => { setPromptInsertVisible(true) }}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestimentsPress={() => navigate('Investiments')}
                    onRevenuePress={() => navigate('Revenue')}
                />
            </View>

            {_renderPromptInsert()}
            {_renderPromptEdit()}
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
