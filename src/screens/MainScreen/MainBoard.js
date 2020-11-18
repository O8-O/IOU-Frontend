import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ScrollView } from "react-native";
import MainPostFeed from "./MainPostFeed";
//import Network from'../../network/Network';

export default class MainBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            navigation : this.props.navigation,
            data:[],
            postLoadFlag:false,
            isFetching:false,
        }
    }

    PostFeedScreen(){
        return(
            <MainPostFeed 
                navigation={this.state.navigation}
            />      
        )
        
    }
    render(){
        return(
            <View style={styles.container}>
                <View style ={styles.middle}>
                    {this.PostFeedScreen()} 
                </View>
                
                
                <View style ={styles.bottom}>
                   <View style ={styles.bottomBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.MainScreen()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/homePink.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/snsButton.png") }/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.InteriorScreen()}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/profile.png") }/>
                        </TouchableOpacity> 
                   </View>
                </View>
            </View>
        );
    }

    MainScreen() {
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    InteriorScreen() {
        this.props.navigation.navigate("UploadPic")
    }
    ProfileScreen(){
        this.props.navigation.navigate("Profile")
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'#F0F0F0'
    },
    middle:{
        flex:1,
    },
    writeButton:{
        width:50,height:50,
        borderRadius:100,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: '#FF7E76', 
        right:15, bottom:63,
        elevation:7,
    },
    bottom:{
        height:50,
        justifyContent:'flex-end',
        backgroundColor:'#F2F2F2',
        borderTopLeftRadius :8,
        borderTopRightRadius :8,
    },
    bottomBar:{
        height:45,
        backgroundColor:'white',
        borderColor:'#E8E8E8',
        borderTopLeftRadius :10,
        borderTopRightRadius :10,
        borderTopWidth:3,
        borderLeftWidth:1,
        borderRightWidth:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        //elevation: 200,//이건 안드로이드 그림자
    },

});