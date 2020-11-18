import React from 'react';
import {View,Text,StyleSheet} from 'react-native'

export default class Term extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>IOU 이용 약관</Text>
                <Text style={styles.subtitle}>제 1 조 (목 적)</Text>
                <Text style={styles.font}>이 약관은 'IOU' 가 제공하는 서비스의 이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.</Text>
                <Text style={styles.subtitle}>제 2 조 (약관의 효력 및 변경) </Text>
                <Text style={styles.font}>1. 이 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. </Text>
                <Text style={styles.font}>2. 회사는 합리적인 사유가 발생될 경우에는 이 약관을 변경할 수 있으며, 약관이 변경되는 경우에는 최소한 7일전에 1항과 같은 방법으로 공시합니다.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    title:{
        fontFamily:'NanumSquare_acB',
        fontSize:26,
        alignSelf:'center',
        marginBottom:20,
    },
    subtitle:{
        fontFamily:'NanumSquare_acB',
        fontSize:16,
        marginTop:10,
        marginBottom:2,
    },
    font:{
        fontFamily:'NanumSquare_acL',
        fontSize:16,
        paddingHorizontal:5,
        marginTop:2,
    }
});