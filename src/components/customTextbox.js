import React from "react";
import { View,Image, Text, StyleSheet,TextInput, TouchableOpacity ,KeyboardAvoidingView } from "react-native";
//source={require("../../img/UserIcon.png")}

export default class CustomTextbox extends React.Component{
    constructor(props){
        super(props)

    }
    
    render(){
        return (
            <View style={styles.textBox}>
                <Image 
                style={{marginLeft:10,width:5,height:5}}
                source={this.props.picture}
                />
                <TextInput style={styles.text}/>
            </View>
        );
    }
}



//flowdir 이 row면 align이 세로고 justify가 가로래.
const styles = StyleSheet.create({
textBox:{
    flexDirection: "row",
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor:'white',
    width:300,
    height:50,
    borderWidth: 1,
    borderRadius: 5,
    margin:9, 
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 6,
},
text:{
    paddingLeft:10,
},

});