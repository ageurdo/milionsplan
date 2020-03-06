import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from './screens/splash/Splash'
import Debt from './screens/debt/Debt';
import Expenses from './screens/expenses/Expenses';
import Investiments from './screens/investiments/Investiments';
import Revenue from './screens/revenue/Revenue';
import Dashboard from './screens/dashboard/Dashboard';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                        gestureDirection: "horizontal"
                    }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Revenue"
                    component={Revenue}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Debt"
                    component={Debt}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Expenses"
                    component={Expenses}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Investiments"
                    component={Investiments}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    )

}

export default Router;