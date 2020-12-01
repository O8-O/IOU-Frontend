import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity } from "react-native";
import CheckBox from './CheckBox';
import LightBox from './LightBox';
import Network from'../../network/Network';
import {onRequestUpload,onResult} from "../../components/SaveData";
export default class SelectStyle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            waitScreen:false,
            img : this.props.route.params.img,
            sendImg: this.props.route.params.sendImg,
            imgList:null, // 받아온 recommend images
            imageNum:0,
            /*spoid*/
            spoid:false,
            selectedColor:null, // 선택된 색
            dataReceived:false,
            resultFlag:false,
        }
    }
    
    async sendPic(){
        if(this.state.selectedColor == null){
            console.log('selectstyle/sendPic 선택된 조명 색상은 없음')
            try {
                this.setState({waitScreen:true});//modal 켜기
                //sendUserPicWithLight함수가 오래걸림.그래서 그전에 그냥 모달 켜줘
                const res = await Network.sendUserPic(this.state.sendImg);
                const resp = res.json();
                console.log("sendPic if 결과");
                console.log(resp.result);
                onRequestUpload(resp.result)

                this.setState({imageNum:resp.result},
                    ()=>{this.callGetRecommendData()})// 결과 받는 함수 시작
            } catch (error) {
                console.log("sendPic if 실패");
                console.log(error);
            }
        }
        else{
            console.log('selectstyle/sendPic 선택된 조명 색상은 : ')
            console.log(this.state.selectedColor)
            try {
                this.setState({waitScreen:true});//modal 켜기
                //sendUserPicWithLight함수가 오래걸림.그래서 그전에 그냥 모달 켜줘
                const res_1 = await Network.sendUserPicWithLight(this.state.sendImg, this.state.selectedColor);
                const resp_1 = res_1.json();
                console.log("sendPic else 결과");
                console.log(resp_1.result);

                this.setState({imageNum:resp_1.result},
                    ()=>{this.callGetRecommendData()})// 결과 받는 함수 시작
            } catch (error_1) {
                console.log("sendPic else 실패");
                console.log(error_1);
            }
        }

    }

    
    async callGetRecommendData(){
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        console.log('timeout끝');
        this.getRecommendData()
        await delay(20000);
        while(!this.state.dataReceived){
            await delay(10000);
            this.getRecommendData()
            console.log('timeout2끝');
            
        }
        console.log("데이터 그만 받아와")
        
        
    }
    async getRecommendData(){
        try {
            console.log('getRecommendData 시작')
            const num = this.state.imageNum.toString()
            console.log(" num 은 : ")
            console.log(num)
            const res = await Network.getRecommendImg(num);
            const resp = await res.json();
            console.log("selectstyle > getrecommend data 결과")
            console.log(resp.result)

            onResult(resp.result)//asyncStorage에 저장

            //this.setState({resultFlag:resp.result})
            if(resp.result){
                this.setState({dataReceived:true});
                console.log('getRecommendData 받아옴~')
                this.setState({waitScreen:false});//modal 끄기
                this.setState({ imgList: resp.result },
                    ()=>{this.RecommendPic()});
                console.log('getRecommendData 사진 가져오기 ok');
                console.log(this.state.imgList)
            }
            else{
                console.log('아직아니야 기다리자..')
            }

            
        } catch (error) {
            console.log('getRecommendData 사진 가져오기 error');
            console.log(error);
        }
    }

    RecommendPic(){
        console.log("나 recommend pic화면으로 넘어간다!!!!!!!!!!!!!!!")
        this.props.navigation.navigate("RecommendPic",
        {image:this.state.img,recommendImages:this.state.imgList});

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
                        <Text style={styles.subtitleText}>조명 색상</Text>
                        <CheckBox/>
                        
                        <LightBox 
                            img={this.state.img}
                            updateSelectedColor={(color) => {/*LightBox안에  spuidColor 바뀌면 selectStyle에서도 그걸 알아야하니까*/ 
                                this.setState({ selectedColor : color })/*spuidColor 를 다시 check에 넣어줌*/
                            }}
                            />
                            
                        <TouchableOpacity 
                            style={{ marginLeft:210, marginTop:160}}
                            //onPress={()=>{this.timer()}}>  
                            onPress={()=>{this.sendPic()}}>
                            
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

    /*테스트 용으로 넣어둔것 . 테스트 뒤 지워 */
    AdjustPicScreen() {
        this.props.navigation.navigate("AdjustPic")
    }

    MainScreen(){
        this.setState({waitScreen:false})
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    
    ProfileScreen(){
        this.props.navigation.navigate("Profile")
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