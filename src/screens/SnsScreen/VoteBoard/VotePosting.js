import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";
import Network from'../../../network/Network';

export default class VotePosting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data : this.props.item,
            pictureFlag1:false,
            pictureFlag2:false,
            picForDetail1:null,
            picForDetail2:null,
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
    numToImg1(num){
        console.log('num 은 : '+num)
        return Network.numToImg(num)
        .then((resp)=>{
            console.log('res.url 은 : ')
            console.log(resp.url)
            this.setState({picForDetail1 : resp.url}) //data.contentImage 에 넣어야 함.
            this.setState({pictureFlag1:true})
        })
        .catch((err)=>{
            console.log("callNumToInt 에러!!");
            console.log(err);
        })
    }
    numToImg2(num){
        console.log('num 은 : '+num)
        return Network.numToImg(num)
        .then((resp)=>{
            console.log('res.url 은 : ')
            console.log(resp.url)
            this.setState({picForDetail2 : resp.url}) //data.contentImage 에 넣어야 함.
            this.setState({pictureFlag2:true})
        })
        .catch((err)=>{
            console.log("callNumToInt 에러!!");
            console.log(err);
        })
    }

    pictureSpace(){
        if(this.state.pictureFlag1 &&this.state.pictureFlag2){
            console.log('vote/pictureSpace 그리게 될 최동 이미지는')
            console.log(this.state.picForDetail1)
            console.log(this.state.picForDetail2)
            return(
                <View style={{flexDirection:'row'}}>
                    <Image
                        style={{width:150, height:150, /*resizeMode:'contain'*/}}
                        source={{uri : this.state.picForDetail1}}
                    />
                    <Image
                        style={{marginLeft:5, width:150, height:150, /*resizeMode:'contain'*/}}
                        source={{uri : this.state.picForDetail2}}
                    />
                </View>
                
            )
        }
    }

    componentDidMount(){
        console.log("새 창 그리기 시작")
        this.numToImg1(this.state.data.contentImage1);
        this.numToImg2(this.state.data.contentImage2);
    }


    render(){      
        return(
            <TouchableOpacity  
                style={styles.container}
                onPress = {()=>
                    this.props.navigate.navigate("VotePostDetail",
                    { navigate :this.props.navigation, data:this.state.data,
                        img1:this.state.picForDetail1,img2:this.state.picForDetail2})}
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
                    <Image
                        style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                        source={require("../../../../assets/img/heartBlack.png")}
                    />
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