import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";


export default class MyComment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        };
    }

    render(){      
        const data = this.props.item;
        return(
            <View style={styles.commentBox}>
                <View //사용자 + 사진 
                    style={{flexDirection: 'row',alignItems:'center', marginTop:10}}>
                    <Image
                        style={{width:18, height:18,resizeMode:'contain'}}
                        source ={require("../../../../assets/img/circleUserIcon.png")}
                    />
                    <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:12}}>
                        {data.user}
                    </Text>
                </View>
                <View>
                    <Text style={{marginVertical:5}}>
                        {data.comment}
                    </Text>
                </View>
            </View >
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        marginVertical:2.5,
        marginHorizontal:5,
        paddingHorizontal:45,
        paddingTop:12,
        backgroundColor:'white',
    },
    commentBox:{
        borderWidth:1,
        borderColor:'white',
        borderTopColor:'#EBEAEA',
        //borderBottomColor:'#EBEAEA',
    },
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:15, 
        color: 'black',
        //alignSelf:'center',
        //justifyContent:'center'
        marginBottom:2,
    }
});