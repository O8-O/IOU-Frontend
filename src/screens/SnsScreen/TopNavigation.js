import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";

export default class TopNavigation extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            free:this.props.free,
            vote:this.props.vote,
            best:this.props.best,

        };
    }
    render(){
        const freeColor = this.state.free ? '#FF7E76': 'black';
        const voteColor = this.state.vote ? '#FF7E76': 'black';
        const bestColor = this.state.free ? '#FF7E76': 'black';
        const freeBar = this.state.free ? '#FF7E76': '#EBEAEA';
        const voteBar = this.state.vote ? '#FF7E76': '#EBEAEA';
        const bestBar = this.state.free ? '#FF7E76': '#EBEAEA';
        return(
            <View style ={styles.top}>
                <View style ={styles.topBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.FreeBoard()}
                            style={[styles.underLine,{borderBottomColor:freeBar}]}
                        >
                            <Text style={{ alignSelf:'center', color:freeColor}}>
                                자유
                            </Text>
                        </TouchableOpacity >

                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.VoteBoard()} 
                            style={[styles.underLine,{borderBottomColor:voteBar}]}
                        >
                           <Text style={{alignSelf:'center',color:voteColor}}>
                               투표</Text>
                        </TouchableOpacity>
                        {/*
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>{this.setState({free: false, vote:false, best:true}),
                                 this.BestBoard()} 
                        }>
                           <Text>인기</Text>
                        </TouchableOpacity >
                        */}
                </View>
            </View>
        )
    }

    
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    VoteBoard() {
        this.props.navigation.navigate("VoteBoard")
    }
    BestBoard() {
        this.props.navigation.navigate("BestBoard")
    }
}

const styles = StyleSheet.create({
    underLine:{
        borderWidth:2,
        borderColor:'white',
        width:200,
        height:'100%',
        justifyContent:'center'
    },
    bottom:{
        height:50,
        justifyContent:'flex-end',
        backgroundColor:'#F2F2F2',
        borderTopLeftRadius :8,
        borderTopRightRadius :8,
    },
    topBar:{
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