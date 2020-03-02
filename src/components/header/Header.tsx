import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import theme from './../../constants/theme'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';


export interface Props {
    title?: string;
    image?: string;
    style?: any,
}

function IconMenu() {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="35" viewBox="0 0 25 25">
            <G id="Grupo_1421" data-name="Grupo 1421" transform="translate(-14 -15)">
                <G id="Grupo_1420" data-name="Grupo 1420">
                    <G id="Grupo_1419" data-name="Grupo 1419">
                        <G id="Grupo_1418" data-name="Grupo 1418" transform="translate(5 3)">
                            <Circle id="Elipse_4" cx="12.5" cy="12.5" r="12.5" fill="#fff" data-name="Elipse 4" transform="translate(9 12)"></Circle>
                            <G id="Grupo_1416" data-name="Grupo 1416" transform="translate(2 -.524)">
                                <G id="Grupo_1417" fill={theme.colors.defaultGreenColor} data-name="Grupo 1417">
                                    <Path id="Caminho_13" d="M11.021 1.638H.464C.209 1.638 0 1.27 0 .819S.209 0 .464 0h10.557c.256 0 .464.368.464.819s-.208.819-.464.819z" data-name="Caminho 13" transform="translate(14 20.524)"></Path>
                                    <Path id="Caminho_1710" d="M11.021 1.638H.464C.209 1.638 0 1.27 0 .819S.209 0 .464 0h10.557c.256 0 .464.368.464.819s-.208.819-.464.819z" data-name="Caminho 1710" transform="translate(14 24.561)"></Path>
                                    <Path id="Caminho_1711" d="M11.021 1.638H.464C.209 1.638 0 1.27 0 .819S.209 0 .464 0h10.557c.256 0 .464.368.464.819s-.208.819-.464.819z" data-name="Caminho 1711" transform="translate(14 28.759)"></Path>
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

function Logo() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="38"
            viewBox="0 0 24.202 28"
        >
            <G
                fill="#fff"
                data-name="Grupo 1422"
                transform="translate(-273.264 -883.876)"
            >
                <Path
                    d="M423.5 891.516a9.85 9.85 0 01-1.878-3.381 5.3 5.3 0 01-.275-2.115 1.991 1.991 0 011.393-1.773 6.15 6.15 0 011.624-.312c.075-.007.167.032.222-.059h5.191c.4.054.8.09 1.2.167a2.5 2.5 0 011.791 1.014 2.648 2.648 0 01.313 1.838 9.065 9.065 0 01-2.15 4.619c-1.234 0-2.468.009-3.7.009s-2.485-.004-3.731-.007z"
                    data-name="Caminho 1717"
                    transform="translate(-141.86)"
                ></Path>
                <Path
                    d="M289.839 1110.447a16.282 16.282 0 015.3 5.777 17.646 17.646 0 012.1 5.407 8.2 8.2 0 01.049 3.62 3.98 3.98 0 01-2.678 2.89 14.633 14.633 0 01-4.614.722c-1.365.052-2.732.085-4.1.032-1.927-.074-3.855.01-5.78-.11a14.445 14.445 0 01-3.91-.672 4.155 4.155 0 01-2.935-3.984 12.759 12.759 0 01.846-4.777 19.493 19.493 0 013.291-5.812 14.312 14.312 0 013.48-3.122c2.982.015 5.967-.024 8.951.029zm.926 9.543a5.406 5.406 0 10-5.372 5.406 5.423 5.423 0 005.373-5.406z"
                    data-name="Caminho 1718"
                    transform="translate(0 -217.045)"
                ></Path>
                <Path
                    d="M509.341 1246.605c0-.533 0-.535-.518-.6a3.884 3.884 0 01-1.074-.292c-.152-.067-.229-.133-.167-.324a4.181 4.181 0 00.171-.77c.029-.23.113-.2.28-.129a3.082 3.082 0 001.826.305c.289-.055.563-.159.626-.481s-.145-.521-.4-.682a5.233 5.233 0 00-1-.424 2.862 2.862 0 01-1.091-.652 1.724 1.724 0 01.94-2.884c.313-.072.377-.192.364-.481-.024-.543-.007-.544.539-.569.386-.018.385-.018.387.367 0 .172-.046.379.033.5s.3.035.462.062a3.113 3.113 0 01.909.269.158.158 0 01.1.212c-.074.281-.145.563-.2.849-.033.181-.112.17-.242.106a3.112 3.112 0 00-1.483-.272.929.929 0 00-.495.126.488.488 0 00-.083.79 1.53 1.53 0 00.566.31 6.062 6.062 0 011.489.657 1.69 1.69 0 01.775 1.689 1.754 1.754 0 01-1.074 1.524 1.722 1.722 0 01-.541.178c-.182.019-.236.113-.223.291.016.235 0 .473.007.709.008.159-.052.216-.2.2a.834.834 0 00-.109 0c-.574-.003-.574-.003-.574-.584z"
                    data-name="Caminho 1719"
                    transform="translate(-224.433 -339.869)"
                ></Path>
            </G>
        </Svg>
    );
}


function handleProfile() {

}

function handleMenu() {

}

const Header: React.FC<Props> = (props) => {
    return (
        <View>
            <LinearGradient
                colors={[theme.colors.defaultGreenColor, '#1CC888']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}>

                <View style={styles.container}>

                    <TouchableOpacity onPress={handleMenu}>
                        <View style={{ alignContent: 'center', width: moderateScale(40) }}>
                            {IconMenu()}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.containerProfile, { width: moderateScale(40) }]} onPress={handleProfile}>
                        <Image source={require('./../../../assets/profile.png')} style={styles.profile} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerLogo} >
                        <View style={{ width: moderateScale(40) }}>
                            {Logo()}
                        </View>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',
        height: moderateScale(150),

    },

    containerLogo: {
        justifyContent: 'center',
    },

    containerProfile: {
        width: moderateScale(40),
        height: moderateScale(40),
    },

    profile: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: 100,
    },
}
);

export default Header;