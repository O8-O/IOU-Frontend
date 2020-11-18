import React from "react";
import {View,StyleSheet,Text,Image,FlatList, TouchableOpacity, ScrollView } from "react-native";
import MyComment from './MyComment';
//import { useNavigation } from '@react-navigation/native';

export default class MyCommentFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[
                {
                    user: '1댓글이',
                    comment:'1이건 비밀이야 아무에게도 고백하지 않았던 이야기를 들려주면 큰 눈으로 너는 묻지',
                    picture:'',
                },
                {
                    user: '2댓글이',
                    comment: '2 있잖아 사랑이면 단번에 바로 알 수가 있대 헷갈리지 않고 반드시',
                    picture:'',
                },
                {
                    user: '3댓글이',
                    comment:'이게 내가 쓴 내용3',
                    picture:'',
                }
            ]
        };
    }
    PostDetail() {
        //const navigation = useNavigation();
        this.props.navigation.navigate("MyPostDetail")
    }
    _renderPost=({item}) => {
        return (
        <MyComment 
            item={item}
            navigate ={this.props.navigation}
        />
        )
    }
    _returnKey(item){
        return item.toString();
    }
    render(){
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                renderItem={this._renderPost}
            />
        )
    }
}