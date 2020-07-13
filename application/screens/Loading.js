import React from "react";
import {StyleSheet, Text, View} from "react-native";

// 날씨 로딩.
// 중요도 낮음. 개발 완료.

export default function Loading() {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>잠시만 기다려 주세요.</Text>
    </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor:"#FDF6AA"
    },
    text:{
        color: "red",
        fontSize: 30
    }

});