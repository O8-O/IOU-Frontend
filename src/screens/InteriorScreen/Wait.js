import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity } from "react-native";

export default class Wait extends React.Component{
    constructor(props){
        super(props);
        this.state={
            waitScreen:true,
        }
    }

    
    render(){       
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <Modal
                        visible={this.state.waitScreen} 
                        animationType="slide"> 
                        <View style={{alignItems:'center',marginTop:270}}>
                            <Text style={{fontFamily:'NanumSquare_acB',fontSize:18}}>
                                분석이 완료되면 알려드릴게요!
                            </Text>
                            <TouchableOpacity
                                style={{marginTop:40}}
                                onPress={()=>{this.MainScreen()}}>
                                <Image
                                    style={{width:183,height:60,resizeMode:'contain'}}
                                    source={require("../../../assets/img/goToMainButton.png")}/>
                            </TouchableOpacity>
                        </View>                        
                    </Modal>
                </View>                
            </View>
        );
    }

    MainScreen(){
        this.setState({waitScreen:false})
        this.props.navigation.navigate("MainBoard")
    }

}

const styles = StyleSheet.create({

    board:{
        flex: 1,
        backgroundColor:'white',
    },
    middle1:{
        flex:1,
        justifyContent:"flex-end",
        marginLeft:32,
        marginBottom:20,
    },
    subtitleText:{
        fontFamily:'NanumSquare_acB',
        fontSize:16,
        marginTop:10,
    },

});