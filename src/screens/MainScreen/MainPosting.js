import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ImageStore } from "react-native";
import Network from'../../network/Network';

export default class MainPosting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data : this.props.item,
            pictureFlag:false,
            picForDetail:[],
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
    /*
    numToImg(num){
        console.log('Main posting 의 num 은 : '+num)
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
    }*/
    async numToImg1(num){   
        try {
            const resp = await Network.numToImg(num);
            var uri = { uri: resp.url };
            var temp = this.state.picForDetail.concat(uri);
            this.setState({ picForDetail: temp });
            this.setState({pictureFlag:true});
        } catch (err) {
            console.log("callNumToInt 에러!!");
            console.log(err);
        }
    }
    async numToImg2(num){    
        try {
            const resp = await Network.numToImg(num[0]);
            var uri = { uri: resp.url };
            var temp = this.state.picForDetail.concat(uri);
            this.setState({ picForDetail: temp });

            const resp_1 = await Network.numToImg(num[1]);
            var uri_1 = { uri: resp_1.url };
            var temp_1 = this.state.picForDetail.concat(uri_1);
            this.setState({ picForDetail: temp_1 });

            this.setState({pictureFlag:true});
        } catch (err) {
            console.log(err);
        }      
    }
    async numToImg3(num){    
        try {
            const resp = await Network.numToImg(num[0]);
            var uri = { uri: resp.url };
            var temp = this.state.picForDetail.concat(uri);
            this.setState({ picForDetail: temp });

            const resp_1 = await Network.numToImg(num[1]);
            var uri_1 = { uri: resp_1.url };
            var temp_1 = this.state.picForDetail.concat(uri_1);
            this.setState({ picForDetail: temp_1 });

            const resp_2 = await Network.numToImg(num[2]);
            var uri_2 = { uri: resp_2.url };
            var temp_2 = this.state.picForDetail.concat(uri_2);
            this.setState({ picForDetail: temp_2 });

            this.setState({pictureFlag:true});
        } catch (err) {
            console.log(err);
        }      
    }
    async numToImg4(num){    
        try {
            const resp = await Network.numToImg(num[0]);
            var uri = { uri: resp.url };
            var temp = this.state.picForDetail.concat(uri);
            this.setState({ picForDetail: temp });

            const resp_1 = await Network.numToImg(num[1]);
            var uri_1 = { uri: resp_1.url };
            var temp_1 = this.state.picForDetail.concat(uri_1);
            this.setState({ picForDetail: temp_1 });

            const resp_2 = await Network.numToImg(num[2]);
            var uri_2 = { uri: resp_2.url };
            var temp_2 = this.state.picForDetail.concat(uri_2);
            this.setState({ picForDetail: temp_2 });

            const resp_3 = await Network.numToImg(num[2]);
            var uri_3 = { uri: resp_3.url };
            var temp_3 = this.state.picForDetail.concat(uri_3);
            this.setState({ picForDetail: temp_3 });

            this.setState({pictureFlag:true});
        } catch (err) {
            console.log(err);
        }      
    }



    pictureSpace(){
        if(this.state.pictureFlag){
            if((this.state.data.contentImage == null)){
                console.log('pictureSpace 이미지 없어서 안그림')
                return <View/>
            }
            else{
                return(
                    <Image
                        style={{backgroundColor:'pink', width:290, height:150 /*resizeMode:'contain'*/}}
                        source={this.state.picForDetail[0]}
                    />
                )
            }
        }
    }

    /*
    componentDidMount(){
        if(this.state.data.contentImage != null)
            this.numToImg(this.state.data.contentImage)
    }*/
    multipleImage(){
        if(this.state.data.contentImage !=null){
            if(this.state.data.contentImage.length >1){
                return(
                    <Image
                        style={styles.closeUp}
                        source={require("../../../assets/img/multipleImages.png")}
                    />
                )
            }
            else{
                return(
                    <View/>
                )
            }
        }
    }
    componentDidMount(){
        console.log("새 창 그리기 시작")
        if(this.state.data.contentImage != null){
            if(this.state.data.contentImage.length == 1){
                this.numToImg1(this.state.data.contentImage)
            }
            else if(this.state.data.contentImage.length == 2){
                this.numToImg2(this.state.data.contentImage)
            }
            else if(this.state.data.contentImage.length == 3){
                this.numToImg3(this.state.data.contentImage)
            }
            else if(this.state.data.contentImage.length == 4){
                this.numToImg4(this.state.data.contentImage)
            }
        }
            
    }



    render(){      
        const heartColor = this.state.liked ?  require("../../../assets/img/heartPink.png") : 
                                               require("../../../assets/img/heartBlack.png");

        return(
            <TouchableOpacity  
                style={styles.container}
                onPress = {()=>
                    this.props.navigate.navigate("MainPostDetail",
                    { navigate :this.props.navigation, data:this.state.data,img:this.state.picForDetail})}//{(data)=>this.props.onPress(data)}
                >
                <View //사용자 + 사진 
                    style={{flexDirection: 'row',alignItems:'center'}}>
                    <Image
                        style={{width:18, height:18,resizeMode:'contain'}}
                        source ={require("../../../assets/img/circleUserIcon.png")}
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
                    {this.multipleImage()}
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
        marginBottom:5,
        marginHorizontal:5,
        paddingHorizontal:45,
        paddingTop:12,
        backgroundColor:'white',
    },
    closeUp:{ // 확대 버튼
        width:20,height:20,
        resizeMode:'contain',
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        right:8, bottom:3,
        opacity:0.8,
    },
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:15, 
        color: 'black',
        marginBottom:2,  
    }
});