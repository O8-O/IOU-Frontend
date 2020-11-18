import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";
import Network from'../../../network/Network';

export default class VoteComment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:'',
            data : this.props.item,
        };
    }
    callDelete(){
        return Network.deleteComment(this.state.id,this.state.data.commentNum)
        .then(res=>res.json())
        .then((resp)=>{
            console.log('deleteComment의 응답 성공은 : ')
            console.log(resp.result)
            if(resp.result){
                this.props.callGetComment()
            }
        
        })
        .catch((err)=>{
            console.log("deleteComment의 에러!!");
            console.log(err);
        })
    }
    deleteButton(){
        console.log('지우는 권한')
        console.log(this.state.id + this.state.data.writer)
        if(this.state.id == this.state.data.writer){
            return(
                <TouchableOpacity
                    style={{width:20,alignItems:'center',alignSelf:'flex-end',backgroundColor:'white'}}
                    onPress={()=>this.callDelete()}>
                    <Text style={{color:'#FF7E76'}}>
                        X
                    </Text>
                </TouchableOpacity>
            )
        }
    }
    componentDidMount(){
        this.setState({id: Network.getNetworkId()})
    }
    render(){      
        const data = this.props.item;
        return(
            <View style={styles.commentBox}>
                <View //사용자 + 사진 
                    style={{flexDirection: 'row',alignItems:'center', marginTop:10}}>
                    <Image
                        style={{width:18, height:18,resizeMode:'contain'}}
                        source ={require("../../../../assets/img/circleUserIcon.png")}
                    />
                    <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:12}}>
                        {data.writer}
                    </Text>
                    <View style={{width:'78%'}}>
                        {this.deleteButton()}
                    </View>
                    
                </View>
                <View>
                    <Text style={{marginVertical:5}}>
                        {data.content}
                    </Text>
                </View>
            </View >
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        marginVertical:2.5,
        marginHorizontal:5,
        paddingHorizontal:45,
        paddingTop:12,
        backgroundColor:'white',
    },
    commentBox:{
        borderWidth:1,
        borderColor:'white',
        borderTopColor:'#EBEAEA',
        //borderBottomColor:'#EBEAEA',
    },
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:15, 
        color: 'black',
        marginBottom:2,
    }
});