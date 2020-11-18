//이거 지워도 됨.
import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity } from "react-native";


export default class Pictures extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pictureSelected:[]
        }
    }
    render(){
        return(
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={()=>this.AdjustPicScreen()}//,{img:this.state.img}}
                    >
                    <Image
                        style={{margin:5,width:140, height:93.3,resizeMode:'contain'}}
                        source= { require("../../../assets/img/yellowHouse1.png") }/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{margin:5,width:140, height:93.3,resizeMode:'contain'}}
                        source= { require("../../../assets/img/yellowHouse2.png") }/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
    } 
})