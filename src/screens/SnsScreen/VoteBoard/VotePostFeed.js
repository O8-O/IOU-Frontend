import React from "react";
import {View,StyleSheet,Text,Image,FlatList, TouchableOpacity, ScrollView } from "react-native";
import VotePosting from './VotePosting';
import Network from'../../../network/Network';

export default class VotePostFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            postLoadFlag:false,
            data:[],
            isFetching: false,
            
        };
    }

    PostDetail() {
        this.props.navigation.navigate("VotePostDetail")
    }

    _renderPost=({item}) => {
        return (
            <VotePosting 
                item={item}
                navigate ={this.props.navigation}
            />    
        ) 
    }
    
    _returnKey(item){
        return item.toString();
    }
    onRefresh() {
        this.setState({isFetching: true},
            () => {this.componentDidMount()}
            );
   }
   componentDidMount(){
       console.log('getVoteBoardPosts 시작~')
    return Network.getVoteBoardPosts()
        .then((response) => response.json())
        .then((res)=>{
            console.log("Vote board의 post feed는 성공")
            console.log(res.result)
            this.setState({data: res.result});
            //this.setState({data : this.state.data.reverse()})
        })
        .catch(err=>{
            console.log("Vote board1에서 에러났엉")
            console.log(err)
        })
        .then(()=>{
            console.log("Vote board data가 넘어온건")
            this.setState({ isFetching: false })
            this.setState({postLoadFlag:true})
            
        })
        .catch(err=>{
            console.log("Vote board2!에서 에러났엉")
            console.log(err)
        })
    };
    render(){
        if(this.state.postLoadFlag){
            console.log(this.state.data)
            return(
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                    renderItem={this._renderPost}
                    onRefresh={() => this.onRefresh()}
                    //refreshing={this.state.isFetching}  
                    refreshing={this.state.isFetching}
                />  
            )
        }
        else{
            return <View/>
        }

    }
}