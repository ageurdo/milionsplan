import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from './../../components/header/Header';
import ItemList, { Item } from '../../components/itemList/ItemList';
import Totaltab from './../../components/totalTab/TotalTab';
import Menu from '../../components/menu/Menu';
import { verticalScale } from 'react-native-size-matters';
import Prompt from '../../components/prompt/Prompt';

const data: Item[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Salário',
        dateTime: '26/02/2020 às 08:02',
        bucks: '$3000',

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Freela Design',
        dateTime: '25/02/2020 às 16:30',
        bucks: '$ 800',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '89464a0f-s6d2-471f-bd96-145571e29d72',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '97534a0f-3da1-471f-bd96-145571e29d98',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '85584a0f-3da1-471f-bd96-145571e29e66',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '33524a0f-3da1-471f-bd96-145571e29c96',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '26524a0f-3da1-471f-bd96-145571e29cs8',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '89524a0f-3da1-471f-bd96-145571e29cc9',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '323442-3da1-471f-bd96-145571e29cc9',
        title: 'Rentabilidade de investimento',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '23423689-3da1-471f-bd96-145571e29cc9',
        title: 'Rentabilidade Final',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '89524a0f-234-471f-bd96-145571e29cc9',
        title: 'ROI',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '323442-3da1-5433-bd96-145571e29cc9',
        title: 'Rentabilidade de investimento',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
    {
        id: '23423689-3da1-53241-bd96-145571e29cc9',
        title: 'Rentabilidade Final',
        dateTime: '23/02/2020 às 12:45',
        bucks: '$ 1800',
    },
];

function _renderItem(data: Item, index) {
    return (
        < ItemList id={data.id} title={data.title} dateTime={'25/02/2020 às 18:30'} bucks={'$ 3800'} />
    );
}

const Home: React.FC = () => {

    const [modalVisible, setModalVisible] = useState(false);

    function _renderModal() {
        return (
            modalVisible &&
            <View style={styles.prompt}>
                <Prompt label={'Insira sua nova receita'} btnConfirm={'Inserir'} btnCancel={'Cancelar'} btnConfirmPress={() => { }} btnCancelPress={() => { setModalVisible(false) }} visibleModal={true} />
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
                data={data}
                renderItem={({ item, index }) => _renderItem(item, index)}
                keyExtractor={item => item.id}
            />

            <View style={styles.menu}>
                <Menu onPressAdd={() => { setModalVisible(true) }} />
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
    }
});

export default Home;
