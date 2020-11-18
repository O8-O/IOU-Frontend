import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity} from "react-native";
import Network from'../../../network/Network';

export default class MyPosting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data : this.props.item,
            changedImg:"",
            pictureFlag:false,
        };
    }

    numToImg(num){
        console.log('num 은 : '+num)
        return Network.numToImg(num)
        .then((resp)=>{
            console.log('res.url 은 : ')
            console.log(resp.url)
            this.setState({contentImage : resp.url},
                //()=>{this.pictureSpace()}
                {pictureFlag:true})

        })
        .catch((err)=>{
            console.log("callNumToInt 에러!!");
            console.log(err);
        })
   
    }
    pictureSpace(){
        if(this.state.pictureFlag){
            if((this.state.data.contentImage == null) || (this.state.data.contentImage == "")){
                return <View/>
            }
            else{
                console.log('pictureSpace 그리게 될 최동 이미지는')
                console.log(this.state.contentImage)
                return(
                    <Image
                        style={{width:290, height:150, resizeMode:'contain'}}
                        source={{uri : this.state.contentImage}}
                    />
                )
            }
        }
    }

    componentDidMount(){
        if(this.state.data.contentImage != null){}
            //this.numToImg(this.state.data.contentImage)
    }



    render(){      
        const heartColor = this.state.liked ?  require("../../../../assets/img/heartPink.png") : 
                                               require("../../../../assets/img/heartBlack.png");

        return(
            <TouchableOpacity  
                style={styles.container}
                onPress = {()=>
                    this.props.navigate.navigate("PostDetail",
                    { navigate :this.props.navigation, data:this.state.data})}//{(data)=>this.props.onPress(data)}
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
                        onPress = {()=>{ this.setState({ liked: !this.state.liked})}}
                    >
                        <Image
                            style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                            source={heartColor}
                        />
                    </TouchableOpacity>
                    <Text style = {[styles.numberFont,{ paddingLeft:5}]}
                    > {this.state.data.recommend}</Text>
                    <Image //말풍선
                        style={{ width:18, height:18,resizeMode:'contain',marginLeft:13}}
                        source={require("../../../../assets/img/talkBubble.png")}
                    />
                    <Text //댓글 수 
                        style={[styles.numberFont,{ marginLeft:6}]}>
                        {this.state.data.commentNum}
                    </Text>
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