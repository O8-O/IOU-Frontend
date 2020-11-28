import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard } from "react-native";
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Network from "../../../network/Network";

export default class Write extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:"",
            contentText:"",
            imgFiles : require('../../../../assets/img/addPicture.png'),
            img2 : require('../../../../assets/img/addPicture.png'),
        };
    }

    showPicker=()=>{
        ImagePicker.openPicker({
            multiple: true
          })
          .then(images => {
            console.log('free 사진선택 결과')
            console.log(images);
            //this.setState({imgFiles:null});
            this.state.imgFiles=[];
            for(var i = 0; i<images.length;i++){
                var uri = {uri: images[i].path};
                console.log(uri);
                var tempList = this.state.imgFiles.concat(uri);
                this.setState({imgFiles:tempList});
            }
          })
          .catch(err=>{
            console.log('free 사진선택 취소')
            console.log(err)
        })
    }

    callNWSendFreePost(){
        if(this.state.imgFiles == require('../../../../assets/img/addPicture.png')){
            //이미지가 없는 게시물이라면
            console.log('이미지 없어서 바꿀게')
            this.setState({imgFiles:null})
            return Network.sendFreePostNoPic(this.state.title,this.state.contentText)
            .then((resp)=>{
                console.log('callNWSendFreePost 완료')
                console.log(resp)
            })
            .catch((err)=>{
                console.log('callNWSendFreePost 에러')
                console.log(err)
            })
        }
        else if(this.state.imgFiles.length == 1){ //이미지가 있는 게시물이라면
            console.log('write 에서 보내려는 이미지 1장은')
            console.log(this.state.imgFiles)
            console.log(this.state.imgFiles[0].uri)
            return Network.sendFreePost1(this.state.title,this.state.contentText,this.state.imgFiles[0])
            .then((resp)=>{
                console.log('callNWSendFreePost 완료')
                console.log(resp)
            })
            .catch((err)=>{
                console.log('callNWSendFreePost 에러')
                console.log(err)
            })
        }
        else if(this.state.imgFiles.length == 2){ //이미지가 있는 게시물이라면
            console.log('sendFreePost2 에서 보내려는 이미지는')
            console.log(this.state.imgFiles)
            return Network.sendFreePost2(this.state.title,this.state.contentText,this.state.imgFiles)
            .then((resp)=>{
                console.log('sendFreePost2 > callNWSendFreePost 완료')
                console.log(resp)
            })
            .catch((err)=>{
                console.log('sendFreePost2 > callNWSendFreePost 에러')
                console.log(err)
            })
        }
        else if(this.state.imgFiles.length == 3){ //이미지가 있는 게시물이라면
            console.log('보내려는 이미지는')
            console.log(this.state.imgFiles)
            return Network.sendFreePost3(this.state.title,this.state.contentText,this.state.imgFiles)
            .then((resp)=>{
                console.log('callNWSendFreePost 완료')
                console.log(resp)
            })
            .catch((err)=>{
                console.log('callNWSendFreePost 에러')
                console.log(err)
            })
        }
        else if(this.state.imgFiles.length == 4){ //이미지가 있는 게시물이라면
            console.log('보내려는 이미지는')
            console.log(this.state.imgFiles)
            return Network.sendFreePost4(this.state.title,this.state.contentText,this.state.imgFiles)
            .then((resp)=>{
                console.log('callNWSendFreePost 완료')
                console.log(resp)
            })
            .catch((err)=>{
                console.log('callNWSendFreePost 에러')
                console.log(err)
            })
        }
        
    }

    doneButton(){
        if((this.state.title.length > 0 )&& (this.state.title.length < 20 )&&
            (this.state.contentText.length>0)){
            this.callNWSendFreePost()
            this.props.navigation.navigate("FreeBoard")
        }
        else{
            alert("제목과 글을 모두 작성해주세요!")
        }
    }


    pictures(){
        if(this.state.imgFiles == require('../../../../assets/img/addPicture.png')){
            return(
                <Image
                    style={{marginTop:2, width:182.7, height:110.25,resizeMode:'contain'}}
                    source= {require('../../../../assets/img/addPicture.png')}                    
                />
            )
            
        }
        else{
            console.log('pictures안에서 imgFiles출력')
            console.log(this.state.imgFiles)
            return(
                this.state.imgFiles.map(img=>(
                    <View style={styles.pictureBoarder} key={img.uri}>
                        <Image
                            style={{marginTop:2, width:'100%'/*140*/,height:'100%'/*93*/}}
                            source= {img}
                            key={img.uri}                       
                        />
                    </View>
                    
                ))
            )
        }
        
    }

    render(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View //흰 바탕 
                    style={{flex:1,backgroundColor:'white',marginHorizontal:5,marginTop:5}}>
                        <View style={styles.title}>
                            <Text style={styles.titleFont}>게시글 작성</Text>
                            <TouchableOpacity  
                                style={styles.doneButton}
                                activeOpacity={0.8}
                                onPress={()=>{this.doneButton()}}
                            >
                            <Text  style = {{fontFamily:'NanumSquare_acR',fontSize:16, color: "white"}}>
                                완료
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.textBox,{paddingTop:15, borderTopColor:'#EBEBEB',height:50}]}>
                            <TextInput 
                                placeholder="제목을 작성해 주세요"
                                style={styles.text}dfg
                                onChangeText={(input) => 
                                    this.setState({ title:input })}   
                            />    
                        </View>
                        <View style={[styles.textBox,{height:300}]}>
                            <TextInput 
                                placeholder="글을 작성해 주세요"
                                style={styles.text}
                                multiline={true}
                                onChangeText={(input) => 
                                    this.setState({ contentText:input })}   
                            />    
                        </View>
                        <Image 
                            style={{marginTop:18, width:18, height:18,resizeMode:'contain'}}
                            source={require("../../../../assets/img/gallery.png")}/>
                        <View
                            Style={{flexDirection:'row'}}>
                            <TouchableOpacity //사진 추가
                                onPress={this.showPicker}
                                style={{flexDirection:'row',flexWrap:'wrap'}}>
                                {this.pictures()}
                            </TouchableOpacity>
                        </View>
                        
                </View>

                <View style ={styles.bottom}>
                    <View style = {styles.shadow}></View>
                   <View style ={styles.bottomBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.MainScreen()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/homeBlack.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/snsButtonPink.png") }/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.InteriorScreen()}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/profile.png") }/>
                        </TouchableOpacity> 
                   </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }
    MainScreen() {
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("Free")
    }
    InteriorScreen() {
        this.props.navigation.navigate("UploadPic")
    }
    ProfileScreen(){
        this.props.navigation.navigate("Profile")
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'#EBEBEB',
    },
    title:{
        flexDirection:'row',
        paddingVertical:20,
        paddingHorizontal:5,
        borderWidth:2,
        width:'100%',
        borderColor:'white',
        alignItems:'center',
        justifyContent:'space-between',
    },
    doneButton:{
        marginLeft:60,
        width:60,
        height:30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7E76',
        elevation: 5,//이건 안드로이드 그림
    },
    titleFont:{
        fontFamily:'NanumSquare_acB',
        fontSize:25,
        marginTop:2,
    },
    textBox:{
        marginTop:3,
        //paddingBottom:10,
        borderColor: 'white',
        borderWidth: 1, 
        borderBottomColor:'#EBEBEB',
        fontSize:16,
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
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:12, 
        color: '#191919',
        marginBottom:2,
    },
    pictureBoarder:{
        marginTop:10,
        marginHorizontal:10,
        justifyContent:'center',
        width:144,height:98,
        borderWidth:2,
        borderColor:'#EBEBEB',
        backgroundColor:'white',
    },
    //
    bottom:{
        height:50,
        justifyContent:'flex-end',
        backgroundColor:'#F2F2F2',
        borderTopLeftRadius :8,
        borderTopRightRadius :8,
    },
    bottomBar:{
        height:45,
        backgroundColor:'white',
        borderColor:'#E8E8E8',
        borderTopLeftRadius :10,
        borderTopRightRadius :10,
        borderTopWidth:3,
        borderLeftWidth:1,
        borderRightWidth:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        //elevation: 200,//이건 안드로이드 그림자
    },
});