import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchFonts } from './../../services/font-service';
// import AccountStore from '../../stores/account-store';
import { loadAsync } from 'expo-font';
import Dashboard from '../dashboard/Dashboard';

export default function Splash() {

    /**
     * Constantes e váriaveis do projeto
     */
    const { navigate } = useNavigation();

    useEffect(() => {

        async function load() {

            // Carregar todas a dependencias
            await fetchFonts();

            // const isAuthenticated = await AccountStore.isAuthenticated();

            // if (isAuthenticated) {
            navigate('Dashboard');
            // } else {
            //     navigate("Login");
            // }
        }

        load()

    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./../../../assets/splash.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
