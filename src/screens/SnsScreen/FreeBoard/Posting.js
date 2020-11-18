import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";
import Network from'../../../network/Network';

export default class Posting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data : this.props.item,
            pictureFlag:false,
            picForDetail:null,
        };
    }
    pressLikeButton(){
        this.setState({ liked: !this.state.liked})
        if(this.state.liked){
            return Network.increaseFreeLike(this.state.data.postNum)
            .then((response) => response.json())
            .then((resp)=>{
                console.log('pressLikeButton 실행 성공결과는 : ')
                console.log(resp.result)
            })
            .catch((err)=>{
                console.log("decreaseFreeLike 에러!!");
                console.log(err);
            })
        }
        else{
            return Network.decreaseFreeLike(this.state.data.postNum)
            .then((response) => response.json())
            .then((resp)=>{
                console.log('decreaseFreeLike 실행 성공결과는 : ')
                console.log(resp.result)
            })
            .catch((err)=>{
                console.log("decreaseFreeLike 에러!!");
                console.log(err);
            })
        }
        

    }
    numToImg(num){
        console.log('num 은 : '+num)
        return Network.numToImg(num)
        .then((resp)=>{
            console.log('res.url 은 : ')
            console.log(resp.url)
            this.setState({picForDetail : resp.url}) //data.contentImage 에 넣어야 함.
            
            this.setState({pictureFlag:true})
        })
        .catch((err)=>{
            console.log("callNumToInt 에러!!");
            console.log(err);
        })
    }

    pictureSpace(){
        if(this.state.pictureFlag){
                if((this.state.data.contentImage == null)){
                return <View/>
            }
            else{
                console.log('pictureSpace 그리게 될 최동 이미지는')
                console.log(this.state.picForDetail)
                return(
                    <Image
                        style={{width:290, height:150, /*resizeMode:'contain'*/}}
                        source={{uri : this.state.picForDetail}}
                    />
                )
            }
        }
    }

    componentDidMount(){
        if(this.state.data.contentImage != null)
            this.numToImg(this.state.data.contentImage)
    }



    render(){      
        const heartColor = this.state.liked ?  require("../../../../assets/img/heartPink.png") : 
                                               require("../../../../assets/img/heartBlack.png");

        return(
            <TouchableOpacity  
                style={styles.container}
                onPress = {()=>
                    this.props.navigate.navigate("PostDetail",
                    { navigate :this.props.navigation, data:this.state.data,img:this.state.picForDetail})}//{(data)=>this.props.onPress(data)}
                >
                <View //사용자 + 사진 
                    style={{flexDirection: 'row',alignItems:'center'}}>
                    <Image
                        style={{width:18, height:18,resizeMode:'contain'}}
                        source ={require("../../../../assets/img/circleUserIcon.png")}
                    />
                    <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:12}}>
                        {this.state.data.writer}
                    </Text>
                </View>
                <Text //제목
                    style={{marginVertical:11,fontFamily:'NanumSquare_acR',fontSize:14,}}>
                    {this.state.data.title}
                </Text>
                <View //첨부 사진
                    style={{alignItems:'center',backgroundColor:'white'}}>
                    {this.pictureSpace()}
                </View>
                <View //하트와 말풍선
                    style={{alignItems:'center',flexDirection: 'row',marginVertical:9}}>
                    <TouchableOpacity style={{alignItems:'center'}} //하트
                        onPress = {()=>{ this.pressLikeButton()}}
                    >
                        <Image
                            style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                            source={heartColor}
                        />
                    </TouchableOpacity>
                    <Text style = {[styles.numberFont,{ paddingLeft:5}]}
                    > {this.state.data.recommend}</Text>

                </View>
            </TouchableOpacity >
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
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:15, 
        color: 'black',
        marginBottom:2,  
    }
});