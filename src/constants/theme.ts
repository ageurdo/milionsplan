import React from 'react';
import { Dimensions, Platform } from 'react-native';


const { width, height } = Dimensions.get('window');

export default {
    windowWidth: width,
    windowHeight: height,

    shadow1: {
        elevation: 3,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: "#8D8D8D",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },

    shadow10: {
        elevation: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: "#8D8D8D",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },

    fonts: {
        default: {
            fontFamily: "OpenSans-Regular",
        },
        boldFont: {
            fontFamily: "OpenSans-Bold",
        },
        semiBoldFont: {
            fontFamily: "OpenSans-SemiBold",
        },
        extraBoldFont: {
            fontFamily: "OpenSans-ExtraBold",
        },
    },

    colors: {
        defaultDarkTextColor: '#484848',
        defaultSecundaryTextColor: '#7E7E7E',
        defaultGreenColor: '#1CD274',
        defaultBgColor: '#C3c3c3',
        defaultDisableColor: "#D4D4D4",
    },
}