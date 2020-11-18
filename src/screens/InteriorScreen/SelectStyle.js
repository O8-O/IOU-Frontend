import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity } from "react-native";
import CheckBox from './CheckBox';
import LightBox from './LightBox';
import Network from'../../network/Network';

export default class SelectStyle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            waitScreen:false,
            img : this.props.route.params.img,
            sendImg: this.props.route.params.sendImg,
            /*spoid*/
            spoid:false,
            selectedColor:null, // 선택된 색
        }
    }
    
    MainScreen(){
        this.setState({waitScreen:false})
        console.log('색상'+this.state.selectedColor)

        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    RecommendPic(){
        this.props.navigation.navigate("RecommendPic",{img:this.state.img,sendImg:this.state.sendImg});
    }
    ProfileScreen(){
        this.props.navigation.navigate("Profile")
    }
    sendPic(){
        if(this.state.selectedColor == null){
            console.log('selectstyle/sendPic 선택된 조명 색상은 없음')
            return Network.sendUserPic(this.state.sendImg)
            .then(res=>res.json())//blob())   blob이나 arrayBuffer는 이미지,파일같은 data에 사용.
            .then(resp=>{
                //alert('사진 전송&변환 성공')
                console.log(resp)
            })
            .catch(error => {
                //alert('사진 전송&변환 error')
                console.log(error)
            })
        }
        else{
            console.log('selectstyle/sendPic 선택된 조명 색상은 : ')
            console.log(this.state.selectedColor)
            return Network.sendUserPicWithLight(this.state.sendImg,this.state.selectedColor)
            .then(res=>res.json())//blob())   blob이나 arrayBuffer는 이미지,파일같은 data에 사용.
            .then(resp=>{
                console.log('사진 전송&변환 성공')
                console.log(resp)
            })
            .catch(error => {
                console.log('사진 전송&변환 error')
                console.log(error)
            })
        }

    }
    timer() {
        this.setState({waitScreen:true});
        console.log('이미지 주소 : '+this.state.sendImg);
        this.sendPic();//서버로 사진 전송하고 결과 기다렸다 받기.
        setTimeout(
            () => {this.setState({waitScreen:false}),this.RecommendPic()}
            , 1000);//1sec
    }

    render(){
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{fontSize:19, fontFamily:'NanumSquare_acB'}}
                        >조명 색상을 설정해 주세요.
                        </Text>
                        <Image 
                            style={{marginTop:15, width:18, height:18,opacity:0.3,resizeMode:'contain'}}
                            source={require("../../../assets/img/gallery.png")}/>
                        <TouchableOpacity>
                            <Image 
                                style={{marginTop:2, width:290, height:175,resizeMode:'contain'}}
                                source={this.state.img}/>
                        </TouchableOpacity> 
                    </View>
                    <View style={{flex:1,marginLeft:42}}>
                        <Text style={styles.subtitleText}>주요 색상</Text>
                        <Text style={styles.subtitleText}>조명 색상</Text>
                        <CheckBox/>
                        
                        <LightBox 
                            img={this.state.img}
                            updateSelectedColor={(color) => {/*LightBox안에  spuidColor 바뀌면 selectStyle에서도 그걸 알아야하니까*/ 
                                this.setState({ selectedColor : color })/*spuidColor 를 다시 check에 넣어줌*/
                            }}
                            />
                        <TouchableOpacity 
                            style={{ marginLeft:210, marginTop:130}}
                            //onPress={()=>{this.RecommendPic()}}>
                            onPress={
                                ()=>{this.timer()}
                            }>
                            
                            <Image
                                style={{width:120,height:46,resizeMode:'contain'}}
                                source={require("../../../assets/img/nextButton.png")}
                                />
                        </TouchableOpacity>
                    </View>                   

                    <Modal
                        visible={this.state.waitScreen} 
                        animationType="slide"> 
                        <View style={{alignItems:'center',marginTop:270}}>
                            <Text style={{fontFamily:'NanumSquare_acB',fontSize:18}}>
                                분석이 완료되면 알려드릴게요!
                            </Text>
                            <TouchableOpacity
                                style={{marginTop:40}}
                                onPress={()=>{this.MainScreen()}}>
                                <Image
                                    style={{width:183,height:60,resizeMode:'contain'}}
                                    source={require("../../../assets/img/goToMainButton.png")}/>
                            </TouchableOpacity>
                        </View>                        
                    </Modal>
                </View>                
                
                <View style ={styles.bottom}>
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
                        <TouchableOpacity activeOpacity={0.6}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/interiorPink.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this. ProfileScreen()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/profile.png") }/>
                        </TouchableOpacity> 
                   </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    board:{
        flex: 1,
        backgroundColor:'white',
    },
    middle1:{
        flex:1,
        justifyContent:"flex-end",
        marginLeft:32,
        marginBottom:20,
    },
    subtitleText:{
        fontFamily:'NanumSquare_acB',
        fontSize:16,
        marginTop:10,
    },

    bottom:{
        height:50,
        justifyContent:'flex-end',
        backgroundColor:'#F2F2F2',
        borderTopLeftRadius :8,
        borderTopRightRadius :8,
    },
    bottomBar:{
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:45,
        backgroundColor:'white',
        borderColor:'#E8E8E8',
        borderTopLeftRadius :10,
        borderTopRightRadius :10,
        borderTopWidth:3,
        borderLeftWidth:1,
        borderRightWidth:1,
    },
});