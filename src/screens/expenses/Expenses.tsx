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
import Revenue from '../revenue/Revenue';
import investiments from '../investiments/Investiments';
import { AsyncStorage } from 'react-native';
import { TapGestureHandler, RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import PromptEdit from '../../components/prompt/edit/PromptEdit';
import PromptInsert from '../../components/prompt/insert/PromptInsert';
import { parse } from 'react-native-svg';
import { access } from 'fs';
import theme from '../../constants/theme';

const defaultColor = theme.colors.defaultOrangeColor;
const Expenses: React.FC = () => {

    const { navigate } = useNavigation();
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const [promptEditVisible, setPromptEditVisible] = useState(false);
    const [sum, setSum] = useState(0);

    const [revenues, setRevenues] = useState<Item[]>([]);
    const [teste, setTeste] = useState<Item>(null);

    const STORAGE_KEY = 'Expenses';

    useEffect(
        () => {
            getData();
        },
        [promptInsertVisible, promptEditVisible]
    );

    useEffect(
        () => {
            _sum();
        },
        [revenues]
    );

    function _renderItem(revenue: Item, index) {
        return (
            < ItemList
                id={revenue.id}
                description={revenue.description}
                dateTime={revenue.dateTime}
                bucks={revenue.bucks}
                btnRemovePress={() => { remove(revenue.id) }}
                btnEditPress={() => {
                    setTeste(revenue);
                    setPromptEditVisible(true)
                }}
                colorDefault={defaultColor}
            />
        );
    }

    async function setData(revenue: Item) {
        try {
            let newRevenues = [...revenues, revenue];
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRevenues));
        } catch (error) {
            // Error saving data
            console.error(error, "erro ao atualizar")
        }
        finally {
            setPromptInsertVisible(false);
            setPromptEditVisible(false);
        }
    };

    async function updateData(revenue: Item) {

        try {

            for (let index = 0; index < revenues.length; index++) {

                if (revenues[index].id == revenue.id) {
                    //altera
                    revenues[index] = revenue;
                    console.log(revenues[index], 'alterado');

                    setRevenues(revenues);
                    console.log(revenues, 'Lista alterada');
                    break;
                }
            }

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(revenues));



        } catch (error) {
            // Error saving data
            console.error(error, "erro ao atualizar")
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
            _sum();
        }
    };

    function _sum() {
        let sumCalc = revenues.reduce(function (total, currentValue) {
            return total + parseFloat(currentValue.bucks.toString());
        }, 0);
        setSum(sumCalc);
    }

    async function remove(id: string) {
        try {
            AsyncStorage.getItem(STORAGE_KEY)
                .then((response) => {
                    let newRevenues = [];
                    if (response !== null) {
                        // We have data!!
                        newRevenues = JSON.parse(response).filter(e => e.id !== id);
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
        finally {
            _sum();
        }
    }

    function _renderPromptEdit(revenue?: Item) {

        return (
            <View style={styles.prompt}>
                <PromptEdit label={'Edite os dados da sua receita'}
                    labelBtnConfirm={'Salvar'}
                    labelBtnCancel={'Fechar'}
                    btnConfirmPress={updateData}
                    btnCancelPress={() => { setPromptEditVisible(false) }}
                    item={revenue}
                    defaultColor={defaultColor}
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
                    defaultColor={defaultColor}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header style={styles.header}
                colorFrom={defaultColor}
                colorTo={defaultColor}
                colorIcon={defaultColor}
            />
            <View style={styles.totalTab}>
                <Totaltab label={'Total'}
                    value={sum.toFixed(2)}
                    titlePage={STORAGE_KEY}
                    onPress={() => { setPromptInsertVisible(true) }}
                    defaultColor={defaultColor}
                />
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
                    defaultColor={defaultColor}
                />
            </View>

            {_renderPromptInsert()}

            {
                promptEditVisible &&
                _renderPromptEdit(teste)
            }
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
        marginTop: verticalScale(-60),
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

export default Expenses;
