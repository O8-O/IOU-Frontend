import React from "react";
import {View,StyleSheet,Text,Image,FlatList, TouchableOpacity, TextInput,ScrollView } from "react-native";
import Comment from './Comment';
import Network from'../../../network/Network';
//import { useNavigation } from '@react-navigation/native';

export default class CommentFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            commentList: [],
            data:this.props.data,
            getCommentFlag:false,
            myComment:"", // 내가 작성한 댓글
            commentNum:0, // 댓글 수
        };
    }
    PostDetail() {
        //const navigation = useNavigation();
        this.props.navigation.navigate("PostDetail")
    }

    _renderPost=({item}) => {
        return (
            <Comment 
                item={item}
                navigate ={this.props.navigation}
                callGetComment = {()=>this.callGetComment()}
            />
        )
    }
    _returnKey(item){
        return item.toString();
    }
    callSendCommentToServer(){
        this.textInput.clear()
        return Network.sendCommentToServer(1,this.state.data.postNum,this.state.myComment)
        .then(()=>{
            this.setState(()=>{this.componentDidMount()})
            this.callGetComment()
        })
    }

    callGetComment(){
        return Network.getComment("1",this.state.data.postNum)
        .then((response) => response.json())
        .then((resp)=>{
            console.log('getComment 불러온 댓글들은')
            console.log(resp.result)
            this.setState({commentNum:resp.result.count})
            this.props.getCommentNum(this.state.commentNum);
            this.setState({commentList:resp.result.rows})
            this.setState({commentList : this.state.commentList.reverse()})
            
        })
    }

    drawFlatlist(){
            console.log('댓글 그리자')
            return(
                    <FlatList
                        style={{height:100}}
                        nestedScrollEnabled ={true}
                        data={this.state.commentList}
                        keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                        renderItem={this._renderPost}
                    />
            )
    }

    componentDidMount(){
        this.callGetComment()
    }
    render(){
        return (
            
            <View style={{flex:1,borderWidth:2,borderColor:'white',borderTopColor:'#EBEAEA'}}>
                <View style={{marginTop:10}}>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15}}>
                        Comment
                    </Text>
                </View>
                <View>
                    <View style={styles.commentBox}>
                        <TextInput 
                                placeholder="댓글을 입력하세요.."
                                style={styles.text}
                                multiline={true}
                                secureTextEntry={true}
                                ref={input => { this.textInput = input }}
                                onChangeText={(input) => 
                                    this.setState({ myComment:input})}
                                
                        />   
                    </View>
                    <TouchableOpacity 
                        style={styles.submit}
                        activeOpacity={0.6}
                        onPress={()=>this.callSendCommentToServer()}>
                        <Text>
                            등록
                        </Text>
                    </TouchableOpacity >
                </View>      

                {this.drawFlatlist()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    commentBox:{
        //flex:1,
        width:'90%',
        height:70,
        marginTop:5,
        borderColor:'#EBEAEA',
        borderWidth:2,
        borderRadius:5,

    },
    text:{
        flex:1,
        width:'100%',
        textAlignVertical:'top' ,
        backgroundColor:'white',
        paddingVertical: 0,//default로 textbox에 padding있는것 없애기.
        fontFamily:'Ubuntu_Regular',
        fontSize:16,
    },
    submit:{
        flexDirection:'row',
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:0, bottom:25,
    },
})