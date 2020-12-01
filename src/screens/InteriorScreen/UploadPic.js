import React from "react";
import {View,StyleSheet,Image,Text,Modal, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker';
import {callImageData,callReqData} from "../../components/SaveData";
import Network from "../../network/Network";

export default class UploadPic extends React.Component{
    constructor(props) {
        super(props);//다른쪽에서 넘겨준걸 여기서 this.props.어쩌구 로 쓸 수 있음.
        this.state={
            selectPic : false,
            analyzePic : false,
            visible: false,
            img: require('../../../assets/img/addPicture.png'), // img = uri라고 보면 될듯.
            sendImg:'',
            
            /*다른 화면 이동 용 */
        }
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
    WaitScreen(){
        this.props.navigation.navigate("Wait")
    }
    SelectStyleScreen() {
        this.props.navigation.navigate("SelectStyle",{img:this.state.img,sendImg:this.state.sendImg});
    }

    getTitle(){
        return this.state.analyzePic ? 
            "등록한 사진의 분석이 완료되었습니다!" :
           "바꾸고 싶은 인테리어 사진을 선택하세요."         
    }


    nextButton(){
        if(this.state.selectPic)
            return(
                <TouchableOpacity 
                    style={{ marginLeft:250, marginTop:145}}
                    onPress={()=>{this.SelectStyleScreen()}}>
                    <Image
                        style={{width:120,height:46,resizeMode:'contain'}}
                        source={require("../../../assets/img/nextButton.png")}
                        />
                </TouchableOpacity>
            )
    }

    showPicker=()=>{
        //ImagePicker를 이용해서 카메라 or 사진선택앱을 선택하여 이미지 가져오기
        // 카메라를 다루려면 Camera, External Storage 퍼미션이 필요함
        // Android의 경우 퍼미션을 주려면 .. AndroidManifest.xml에서 직접 작성
        // <uses-permission android:name="android.permission.CAMERA" />
        // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 
        // PickerDialog의 옵션 객체
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
                this.setState({img:uri}); 
                const path = {uri: response.path};
                this.setState({sendImg:path});
                this.setState({selectPic : true});
            }
        });
 
    }

    RecommendPic(selectedPic,_imgList){
        this.props.navigation.navigate("RecommendPic",
        {image:selectedPic, recommendImages:_imgList});
    }

    componentDidMount() {
        callReqData().then((value) => {
        if(value !=null){
            if(value.reqNum == null || value.reqNum.length == 0) {
                console.log('난 처음 들어왔어')
                //1. 요청한 데이터의 결과가 나와서 요청이 없어지거나 
                //2. 아예 요청한 적이 없는 상태
                callImageData().then((value) => {
                    if(value.imageResult == null){//앱 처음 들어온 상태
                        console.log('난 처음 들어왔어')
                    }
                    else if(value.imageResult.length == 0) {
                        console.log('난 둘다 없는데 기다리는 중이야')
                        this.WaitScreen();
                    }
                    else {// 요청 데이터에 대한 결과가 왔습니다. -> 결과창으로 이동
                        console.log('난 결과왔어')
                        return Network.getNetworkSelectedPic() // 
                        .then((_resp1)=>{
                            const resp1 = _resp1;
                            return callImageData()
                            .then((resp2)=>{
                                console.log("upload / resp1은 :"+resp1+"resp2는 : "+resp2)
                                this.RecommendPic(resp1,resp2) 
                            })
                        })   
                    }
                })
            }
            else {//요청한 데이터가 있는데, 요청 데이터가 아직 안온 경우입니다
                // 대기 메시지 출력.
                this.WaitScreen();
            }
        }
        else{
            console.log('value가 null이야')
        }
        });
    }

    
    
    render(){
        return(
           <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{fontSize:18, fontFamily:'NanumSquare_acB'}}
                        >{this.getTitle()}
                        </Text>
                        <Image 
                            style={{marginTop:18, width:18, height:18,resizeMode:'contain'}}
                            source={require("../../../assets/img/gallery.png")}/>
                        <TouchableOpacity
                            onPress={this.showPicker}>
                            <Image 
                                style={{marginTop:2, width:290, height:175,resizeMode:'contain'}}
                                source={this.state.img}/>
                                
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        {this.nextButton()}
                    </View>

                    <Modal
                        visible={this.state.visible} 
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
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
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
        flex:2,
        justifyContent:"flex-end",
        marginLeft:50,
        //alignItems:'center'
    },
    box:{
        width:290,
        height:196,
        borderWidth:0.5,
        borderColor:'#191919',
        borderRadius:4,
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
    //modal
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.8)',
        flex:1,
        alignItems:'center',
    },
    modalBox:{
        marginTop:200,
        marginHorizontal:20,
        backgroundColor:'white',
        paddingTop:5,
        paddingHorizontal:10,
        borderRadius:15,

    }
});