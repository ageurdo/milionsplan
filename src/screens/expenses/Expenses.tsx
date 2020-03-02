import React from 'react';
import { View, Text } from 'react-native';


export interface Props {
    title?: string;
};

const Expenses: React.FC<Props> = (props) => {
    return (
        <View>
            <Text>
                Debt Screen
            </Text>
        </View>
    );
};
export default Expenses;