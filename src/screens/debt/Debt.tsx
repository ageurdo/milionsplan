import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/header/Header';
import ItemList, { Item } from '../../components/itemList/ItemList';
import Totaltab from '../../components/totalTab/TotalTab';
import FooterMenu from '../../components/menu/FooterMenu';
import { verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import PromptEdit from '../../components/prompt/edit/PromptEdit';
import PromptInsert from '../../components/prompt/insert/PromptInsert';
import theme from '../../constants/theme';

const defaultColor = theme.colors.defaultRedColor;
const secondColor = theme.colors.secondRedColor;
const Debt: React.FC = () => {

    const { navigate } = useNavigation();
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const [promptEditVisible, setPromptEditVisible] = useState(false);
    const [sum, setSum] = useState(0);

    const [debts, setDebts] = useState<Item[]>([]);
    const [backup, setBackup] = useState<Item>(null);

    const STORAGE_KEY = 'Debts'
    const STORAGE_KEY_SUM = 'Debts_Sum'

    useEffect(
        () => {
            _sum();
            getData();
        },
        [debts, promptInsertVisible, promptEditVisible]
    );

    function _renderItem(debt: Item) {
        return (
            < ItemList
                id={debt.id}
                description={debt.description}
                dateTime={debt.dateTime}
                bucks={debt.bucks}
                btnRemovePress={() => { remove(debt.id) }}
                btnEditPress={() => {
                    setBackup(debt);
                    setPromptEditVisible(true)
                }}
                colorDefault={defaultColor}
                isSwipeable={true}
            />
        );
    }

    async function setData(debt: Item) {
        try {
            let newDebts = [...debts, debt];
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDebts));
        } catch (error) {
            // Error saving data
            console.error(error, "erro ao atualizar")
        }
        finally {
            setPromptInsertVisible(false);
            setPromptEditVisible(false);
        }
    };

    async function updateData(debt: Item) {

        try {

            for (let index = 0; index < debts.length; index++) {

                if (debts[index].id == debt.id) {
                    //altera
                    debts[index] = debt;
                    console.log(debts[index], 'alterado');

                    setDebts(debts);
                    console.log(debts, 'Lista alterada');
                    break;
                }
            }

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(debts));



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
                    let newDebt = [];
                    if (response !== null) {
                        // We have data!!
                        newDebt = JSON.parse(response);
                    }
                    setDebts(newDebt);
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setDebts([]);
            }
        }
        finally {
            _sum();
        }
    };

    function _sum() {
        let sumCalc = debts.reduce(function (total, currentValue) {
            return total + parseFloat(currentValue.bucks.toString());
        }, 0);
        setSum(sumCalc);

        try {
            AsyncStorage.setItem(STORAGE_KEY_SUM, JSON.stringify(sumCalc));
        } catch (error) {
            // Error saving data
            console.error(error, "erro ao salvar soma")
        }
    }

    async function remove(id: string) {
        try {
            AsyncStorage.getItem(STORAGE_KEY)
                .then((response) => {
                    let newDebts = [];
                    if (response !== null) {
                        // We have data!!
                        newDebts = JSON.parse(response).filter(e => e.id !== id);
                    }
                    setDebts(newDebts);
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDebts));
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setDebts([]);
            }
        }
        finally {
            _sum();
        }
    }

    function _renderPromptEdit(debt?: Item) {

        return (
            <View style={styles.prompt}>
                <PromptEdit label={'Edite os dados da sua receita'}
                    labelBtnConfirm={'Salvar'}
                    labelBtnCancel={'Fechar'}
                    btnConfirmPress={updateData}
                    btnCancelPress={() => { setPromptEditVisible(false) }}
                    item={debt}
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
                colorTo={secondColor}
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
                data={debts}
                renderItem={({ item }) => _renderItem(item)}
                keyExtractor={item => item.id}
            />

            <View style={styles.menu}>
                <FooterMenu onAddPress={() => navigate('Dashboard')}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestmentsPress={() => navigate('Investiments')}
                    onRevenuePress={() => navigate('debt')}
                    defaultColor={defaultColor}
                />
            </View>

            {_renderPromptInsert()}

            {
                promptEditVisible &&
                _renderPromptEdit(backup)
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

export default Debt;
