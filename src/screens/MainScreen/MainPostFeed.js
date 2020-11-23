import React from "react";
import {View,StyleSheet,Text,Image,FlatList, TouchableOpacity, ScrollView } from "react-native";
import MainPosting from './MainPosting';
import Network from'../../network/Network';


export default class MainPostFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            postLoadFlag:false,
            data:[],
            isFetching: false,
            
        };
    }

    PostDetail() {
        this.props.navigation.navigate("MainPostDetail")
    }

    _renderPost=({item}) => {
        return (
            <MainPosting 
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
       console.log('getMainBoardPosts 시작~')
    return Network.getMainBoardPosts()
        .then((response) => response.json())
        .then((res)=>{
            console.log("main board의 post feed는 성공")
            console.log(res)
            this.setState({data: res.result});
            //this.setState({data : this.state.data.reverse()})
        })
        .catch(err=>{
            console.log("main board1에서 에러났엉")
            console.log(err)
        })
        .then(()=>{
            console.log("main board data가 넘어온건")
            this.setState({ isFetching: false })
            this.setState({postLoadFlag:true})
            
        })
        .catch(err=>{
            console.log("main board2!에서 에러났엉")
            console.log(err)
        })
    };
    render(){
        if(this.state.postLoadFlag){
            console.log(this.state.data)
            return(
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.container}>
                            <Text style={styles.titleFont}>
                                지금 <Text style={{color:'#FF7E76'}}>뜨고</Text> 있는 글
                            </Text>
                        </View>
                    }
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

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginHorizontal:5,
        marginTop:5,
        paddingVertical:20,
        paddingLeft:40,
    },
    titleFont:{
        fontSize:20,
        fontFamily:'NanumSquare_acB'
    }
});