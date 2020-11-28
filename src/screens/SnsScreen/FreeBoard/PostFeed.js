import React from "react";
import {View,StyleSheet,Text,Image,FlatList, TouchableOpacity, ScrollView } from "react-native";
import Posting from './Posting';
import Network from'../../../network/Network';


export default class PostFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            postLoadFlag:false,
            data:[],
            isFetching: false,
            isMounted :false,
        };
    }

    PostDetail() {
        this.props.navigation.navigate("PostDetail")
    }

    _renderPost=({item}) => {
        return (
            <Posting 
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
        this.state.isMounted = true;
        if (this.state.isMounted) {
            console.log('getFreeBoardPosts 시작~')
            return Network.getFreeBoardPosts()
                .then((response) => response.json())
                .then((res)=>{
                    console.log("post feed는 성공")
                    console.log(res)
                    this.setState({data: res.result});
                    this.setState({data : this.state.data.reverse()})
                })
                .catch(err=>{
                    console.log("free board1에서 에러났엉")
                    console.log(err)
                })
                .then(()=>{
                    console.log("data가 넘어온건")
                    this.setState({ isFetching: false })
                    this.setState({postLoadFlag:true})
                    
                })
                .catch(err=>{
                    console.log("free board2!에서 에러났엉")
                    console.log(err)
                })
        }
    };
    componentWillUnmount() {
        this.state.isMounted = false;
    }
    render(){
        if(this.state.postLoadFlag){
            console.log(this.state.data)
            return(
                <FlatList
                    data={this.state.data}
                    keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                    renderItem={this._renderPost}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                />  
            )
        }
        else{
            return <View/>
        }

    }
}