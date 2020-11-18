import React from "react";
import {View,StyleSheet,Text,Modal, Image,TouchableOpacity, ScrollView } from "react-native";

import Network from'../../network/Network';


/* 이게 callNumToInt 이 다 끝나고 돼야함. */
export default class SelectedPic extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            numList:[],
            imgList:[],
            changePicStartDraw:false,
            flag:false,
            closeUp:false,
            closeUpImage:null,
        };
        this.changePic = this.changePic.bind( this );
        this.getPictureView = this.getPictureView.bind( this );
    }

    getPic(){//선호도 조사를 했는지 안했는지에 따라 다른화면으로 가기
        console.log('내가 고른 선호도 사진들');
        return Network.loadUserPreference2()
            .then(res=>res.json())
            .then(res=>{
                console.log("받은거"+res.result.image)
                this.changePic(res.result.image)
            })
            .catch(err=>{
                console.log("사진변환의 오류"+err);
            })
    }

    changePic(list){//번호 url로 바꾸기
        console.log('changePic 내가 고른 선호도 사진들');
        console.log(list)
        this.callListNumToImg(list)
        this.setState({flag:true})
        this.getPictureView()  
    }
        
    async callListNumToImg(list){
        return new Promise((res,rej)=>{
            list.map(num=>{
                return this.callNumToInt(num);
            });
            res();
        })
    } 

    callNumToInt(num){
        console.log('num 은 : '+num)
        return Network.numToImg(num)
        .then((resp)=>{
            console.log('res.url 은 : ')
            console.log(resp.url)
            var tempList = this.state.imgList.concat(resp.url)
            this.setState({imgList : tempList})
        })
        .catch((err)=>{
            console.log("callNumToInt 에러!!");
        console.log(err);
        })
   
    }

    showModal(){
        console.log('모달 열어')
        console.log(this.state.closeUp)
        return(         
            <Modal 
                visible={this.state.closeUp} 
                transparent={true}
                onRequestClose={() => { this.setState({closeUp:false}) } }//뒤로가기 누르면 사라짐.
                animationType="slide">                 
                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                onPress={()=>this.setState({closeUp: false}) }> 
                    <View style={{ height:400, alignItems:'center'}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source= {{uri:this.state.closeUpImage}}
                        />
                    </View>  
                </TouchableOpacity>                   
            </Modal>
        )
    }

    getPictureView(){
        if(!this.state.flag){
            return <View/>
        }
        else{
            console.log('map전에 들어가는 data : ')
            console.log(this.state.imgList)
            return(
                this.state.imgList.map(img=>(
                    <View 
                        style={styles.pictureBorder}
                        key={img}  >
                        <Image
                            style={{width:140,height:93,resizeMode:'contain'}}
                            source= {{uri:img}}
                            key={img}                       
                        />
                        <TouchableOpacity //사진 돋보기 기능
                            onPress={()=>this.setState({closeUp: true,closeUpImage:img})}
                            style={styles.closeUp}
                        >
                            <Image
                                style={{width:18,height:18, resizeMode:'contain'}}
                                source= {require("../../../assets/img/closeUp.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    
                ))
            )
            
        }
    }

    drawScreen(){
        console.log('그림그려조')
        this.setState({flag:true})
        this.getPictureView()
    }

    /*서버에서 받을 것
       user, userPIcture, title, picture, heartNumber, commentNumber*/
    componentDidMount(){
        this.getPic()
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Text style={styles.title}>
                       <Text style = {{color:'#FF7E76'}}>My </Text> Preference
                    </Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',marginBottom:70}}>
                        {this.getPictureView()}
                    </View>                     
                </View>
                {this.showModal()}
                <View style ={styles.bottom}>
                    <View style = {styles.shadow}></View>
                   <View style ={styles.bottomBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.MainScreen()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/homeBlack.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/snsButton.png") }/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.InteriorScreen()}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/profilePink.png") }/>
                        </TouchableOpacity> 
                   </View>
                </View>
            </View>
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
        backgroundColor:'white',
    },
    title:{
        marginVertical:50,//제목 위치 위아래 조절
        fontSize:35,
        color: "black",
        fontFamily:'Ubuntu-Medium',
        alignSelf:'center'
    },
    pictureBorder:{
        marginTop:10,
        marginHorizontal:10,
        justifyContent:'center',
        width:144,height:98,
        borderWidth:2,
        borderColor:'#EBEBEB',
        backgroundColor:'white',
    },
    post:{
        //flex: 1,
        marginTop:5,
        marginHorizontal:6,
        paddingHorizontal:30,
        paddingTop:12,
        backgroundColor:'white',
    },
    closeUp:{ // 확대 버튼
        width:20,height:20,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:2, bottom:3
    },
    font:{
        //marginVertical:10,
        //marginHorizontal:30,
        fontFamily:'Ubuntu-Regular',
        fontSize:15,
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
