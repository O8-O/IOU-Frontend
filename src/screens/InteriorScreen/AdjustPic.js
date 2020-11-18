/*이거 안쓰는듯*/

import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity } from "react-native";
import CheckBox from './CheckBox';
import LightBox from './LightBox';

export default class SelectStyle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            waitScreen:false,
            img : this.props.route.params.img,
            /*spoid*/
            spoid:false,
            selectedColor:'purple',
        }
    }
    
    render(){
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{fontSize:19, fontFamily:'NanumSquare_acB'}}
                        >색상과 바꿀 설정을 선택하세요.
                        </Text>
                        <Image 
                            style={{marginTop:15, width:18, height:18,opacity:0.3,resizeMode:'contain'}}
                            source={require("../../../assets/img/gallery.png")}/>
                        <TouchableOpacity>
                            <Image 
                                style={{marginTop:2, width:290, height:175,resizeMode:'contain'}}
                                source={this.state.img}/>
                        </TouchableOpacity> 
                    </View>
                    <View style={{flex:1,marginLeft:32}}>
                        <Text style={styles.subtitleText}>주요 색상</Text>

                        <Text style={styles.subtitleText}>조명 색상</Text>
                        <CheckBox/>
                        
                        <LightBox/>

                        <TouchableOpacity 
                            style={{ marginLeft:200, marginTop:120}}
                            //onPress={()=>{this.setState({waitScreen:true})}}>분석이 완료되면 화면.
                            onPress={()=>{this.RecommendPic()}}>
                            <Image
                                style={{width:120,height:46,resizeMode:'contain'}}
                                source={require("../../../assets/img/nextButton.png")}
                                />
                        </TouchableOpacity>
                    </View>
                    

                    <Modal
                        visible={this.state.waitScreen} 
                        animationType="slide"> 
                        <View style={{alignItems:'center',marginTop:270}}>
                            <Text style={{fontFamily:'NanumSquare_acB',fontSize:18}}>
                                분석이 완료되면 알려드릴게요!
                            </Text>
                            <TouchableOpacity
                                style={{marginTop:20}}
                                onPress={()=>{this.MainScreen()}}>
                                <Image
                                    style={{width:183,height:50,resizeMode:'contain'}}
                                    source={require("../../../assets/img/goToMainButton.png")}/>
                            </TouchableOpacity>
                        </View>                        
                    </Modal>
                </View>
                
                <View style ={styles.bottom}>
                   <View style ={styles.bottomBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.MainScreen()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/homeBlack.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/snsButton.png") }/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/interiorPink.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/profile.png") }/>
                        </TouchableOpacity> 
                   </View>
                </View>
            </View>
        );
    }

    MainScreen(){
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    Preference(){
        this.props.navigation.navigate("Preference")
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

    bottom:{
        height:50,
        justifyContent:'flex-end',
        backgroundColor:'#F2F2F2',
        borderTopLeftRadius :8,
        borderTopRightRadius :8,
    },
    bottomBar:{
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:45,
        backgroundColor:'white',
        borderColor:'#E8E8E8',
        borderTopLeftRadius :10,
        borderTopRightRadius :10,
        borderTopWidth:3,
        borderLeftWidth:1,
        borderRightWidth:1,
    },
});