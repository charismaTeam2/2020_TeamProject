import React from "react";
import {View, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialCommunityIcons} from "@expo/vector-icons";

// 날씨 api 하위.
// 중요도 보통. 개발 완료. 날씨 이미지가 이상하게 나오는 버그 수정필요.
// https://anpigon.github.io/blog/kr/@anpigon/react-native-5-4-1543113530194/ 
// weather-sunny
// weather-rainy

export default function Weather({temp}){  //온도값을 리턴해줌
    return ( 
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}
          >
        <View style={styles.halfContainer}>
        <MaterialCommunityIcons size={96} name="weather-cloudy" color="white"/>
        <Text style={styles.temp}>{temp}℃</Text> 
        </View>
        <View style={styles.halfContainer}/>
        </LinearGradient>
    );
}

Weather.propTypes = { //타입체크(number타입인지)
    temp: PropTypes.number.isRequired,  
    condition: PropTypes.oneOf([
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Atmosphere",
        "Clear",
        "Clouds",
        "Haze",
        "Mist",
        "Dust"
    ]).isRequired
};
//console.log(condition)

const styles = StyleSheet.create({
    container: {
        flex: 1, //공간영역주는것
        justifyContent: "center",
        alignItems: "center",
        paddingTop:50
    },
    temp:{
        fontSize: 42,
        color:"white"
    },
    halfContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center"
    }

});
