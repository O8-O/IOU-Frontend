import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard } from "react-native";
import ImagePicker from 'react-native-image-picker';
import Network from'../../../network/Network';

export default class VoteWrite extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:"",
            contentText:"",
            imgFile1 : require('../../../../assets/img/addPicture.png'),
            imgFile2 : require('../../../../assets/img/addPicture.png'),
        };
    }

    showPicker1=()=>{
        const options= {
            title:'사진 선택하기', //다이얼로그의 제목
            takePhotoButtonTitle: '카메라 실행하기',
            chooseFromLibraryButtonTitle:'갤러리에서 이미지 선택',
            cancelButtonTitle: '취소',
        };
 
        //위에서 만든 옵션을 기준으로 다이얼로그 보이기 
        ImagePicker.showImagePicker(options, (response)=>{
            if(response.didCancel){
                alert('사진 선택을 취소했습니다');
            }
            else{
                const uri = {uri: response.uri};
                this.setState({imgFile1:uri}); 
                const path = {uri: response.path};
                this.setState({sendImg:path});
            }
        });
    }

    showPicker2=()=>{
        const options= {
            title:'사진 선택하기', //다이얼로그의 제목
            takePhotoButtonTitle: '카메라 실행하기',
            chooseFromLibraryButtonTitle:'갤러리에서 이미지 선택',
            cancelButtonTitle: '취소',
        };
 
        //위에서 만든 옵션을 기준으로 다이얼로그 보이기 
        ImagePicker.showImagePicker(options, (response)=>{
            if(response.didCancel){
                alert('사진 선택을 취소했습니다');
            }
            else{
                const uri = {uri: response.uri};
                this.setState({imgFile2:uri}); 
                const path = {uri: response.path};
                this.setState({sendImg:path});
            }
        });
    }

    callNWSendFreePost(){  
        console.log('보내려는 이미지는')
        console.log(this.state.imgFile)
        return Network.sendFreePost(this.state.title,this.state.contentText,this.state.imgFile)
        .then((resp)=>{
            console.log('callNWSendFreePost 완료')
            console.log(resp)
        })
        .catch((err)=>{
            console.log('callNWSendFreePost 에러')
            console.log(err)
        })
    }

    doneButton(){
        if((this.state.title.length > 0 )&& (this.state.title.length < 20 )&&
            (this.state.contentText.length>0)){
            this.callNWSendFreePost()
            this.props.navigation.navigate("VoteBoard")
        }
        else{
            alert("제목과 글을 모두 작성해주세요!")
        }
        
    }

    /*서버에서 받을 것
       user, userPIcture, title, picture, heartNumber, commentNumber*/
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
                                onPress={this.showPicker1}
                                style={{width:190,backgroundColor:'pink'}}>
                                <Image 
                                    style={{marginTop:2, width:182.7, height:110.25,resizeMode:'contain'}}
                                    source={this.state.imgFile1}/>
                                    
                            </TouchableOpacity>
                            <TouchableOpacity //사진 추가
                                onPress={this.showPicker2}
                                style={{width:190}}>
                                <Image 
                                    style={{marginTop:2, width:182.7, height:110.25,resizeMode:'contain'}}
                                    source={this.state.imgFile2}/>
                                    
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
                           source= { require("../../../../assets/img/homePink.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/snsButton.png") }/>
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
        this.props.navigation.navigate("FreeBoard")
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