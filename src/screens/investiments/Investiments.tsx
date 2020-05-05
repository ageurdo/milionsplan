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

const defaultColor = theme.colors.defaultPurpleColor;
const secondColor = theme.colors.secondPurpleColor;
const Investments: React.FC = () => {

    const { navigate } = useNavigation();
    const [promptInsertVisible, setPromptInsertVisible] = useState(false);
    const [promptEditVisible, setPromptEditVisible] = useState(false);
    const [sum, setSum] = useState(0);

    const [investments, setInvestments] = useState<Item[]>([]);
    const [teste, setTeste] = useState<Item>(null);

    const STORAGE_KEY = 'Investments'
    const STORAGE_KEY_SUM = 'Investments_Sum'

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
        [investments]
    );

    function _renderItem(revenue: Item) {
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
                isSwipeable={true}
            />
        );
    }

    async function setData(revenue: Item) {
        try {
            let newInvestments = [...investments, revenue];
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newInvestments));
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

            for (let index = 0; index < investments.length; index++) {

                if (investments[index].id == revenue.id) {
                    //alterado
                    investments[index] = revenue;
                    setInvestments(investments);
                    break;
                }
            }

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(investments));



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
                    setInvestments
                        (newRevenue);
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setInvestments
                    ([]);
            }
        }
        finally {
            _sum();
        }
    };

    function _sum() {
        let sumCalc = investments.reduce(function (total, currentValue) {
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
                    let newInvestments = [];
                    if (response !== null) {
                        // We have data!!
                        newInvestments = JSON.parse(response).filter(e => e.id !== id);
                    }
                    setInvestments
                        (newInvestments);
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newInvestments));
                });

        } catch (error) {
            // Error retrieving data
            (response) => {
                console.error(response)
                setInvestments
                    ([]);
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
                data={investments}
                renderItem={({ item, index }) => _renderItem(item)}
                keyExtractor={item => item.id}
            />

            <View style={styles.menu}>
                <FooterMenu onAddPress={() => navigate('Dashboard')}
                    onDebtPress={() => navigate('Debt')}
                    onExpensesPress={() => navigate('Expenses')}
                    onInvestmentsPress={() => navigate('Investments')}
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

export default Investments;
