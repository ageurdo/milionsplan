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
import { parse } from 'react-native-svg';


const Revenue: React.FC = () => {

    const { navigate } = useNavigation();
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const [promptEditVisible, setPromptEditVisible] = useState(false);
    const [sum, setSum] = useState();

    const [revenues, setRevenues] = useState<Item[]>([]);
    const [teste, setTeste] = useState<Item>(null);

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
                btnEditPress={() => {
                    setTeste(revenue);
                    setPromptEditVisible(true)
                }}
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
            _sum();
        }
    };

    async function updateData(revenue: Item) {


        try {
            // console.log(revenue, 'Item Revenue chegando')
            // let index = revenues.indexOf(revenues.find((e) => e.id == revenue.id));
            // revenues[index] = revenue;

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
    };

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

    function _sum() {
        let calc;
        let bucks;
        for (let index = 0; index < revenues.length; index++) {
            if (revenues[index] !== null) {
                bucks = (revenues[index].bucks);
                calc = calc + parseFloat(bucks);
                console.log(calc, 'calc aqui');
                console.log(bucks, 'bucks aqui');
                console.log(sum, 'soma aqui');
            }
            else
                setSum(0);
        }
        setSum(calc);
    }

    return (
        <View style={styles.container}>
            <Header style={styles.header} />
            <View style={styles.totalTab}>
                <Totaltab label={'Total'}
                    value={sum}
                    onPress={() => { setPromptInsertVisible(true) }} />
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

export default Revenue;
