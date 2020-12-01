import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity,ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Network from'../../network/Network';

export default class AdjustPic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            closeUp:false,//사진 확대
            selectedFurniture:'',
            selectedImgData:this.props.route.params.selectedImgData,
            selectedImg:null,
            pictureFlag:false,
        }
    }
    
    getRecommendFurnitureImages(){
        return Network.getFurnitureImg(this.state.selectedFurniture)
            .then(res=>res.json())
            .then(resp=>{
                this.setState({imgList:resp.result})
                this.setState({loadingFinishFlag:true})
                console.log('선호 사진 가져오기 ok')
            })
            .catch(error => {
                console.log('선호 사진 가져오기 error')
                console.log(error)
            })
    }

    pictureSpace(){
        if(this.state.pictureFlag){
            return(
                <Image 
                    style={{width:'100%',height:'100%',resizeMode:'contain',}}
                    source={this.state.selectedImg}//{this.state.img}/>
                />
            )
        }
        
    }

    async numToImg(){   
        try {
            console.log("AdjustPic에서 numtoimg들어가기 전 picForDetail은 비어있어야 함")
            console.log(this.state.selectedImg)   
            console.log(this.state.selectedImgData)       
            const resp = await Network.numToImg(this.state.selectedImgData.imageNum);
            var uri = { uri: resp.url };
            this.setState({ selectedImg: uri });
            this.setState({pictureFlag:true});
        } catch (err) {
            console.log("callNumToInt 에러!!");
            console.log(err);
        }
    }

    getId(){
        this.setState({id : Network.getNetworkId()})    
    }

    componentDidMount(){
        this.numToImg()
        this.getId()
    }

    render(){
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{alignSelf:'center',fontSize:24, fontFamily:'NanumSquare_acB', marginTop:10,marginBottom:20}}
                        >변경된 세부 인테리어 결과
                        </Text>
                        <Text style={{alignSelf:'center',fontSize:14, marginBottom:2,fontFamily:'NanumSquare_acR',color:'#A9A9A9'}}>
                            {this.state.id} 님의 선호도에 따른 인테리어 변형 결과입니다.
                        </Text>
                        <Text style={{alignSelf:'center',fontSize:14, fontFamily:'NanumSquare_acR',color:'#A9A9A9'}}
                        >벽, 바닥, 가구의 세부 디자인들을 확인해보세요! 
                        </Text>
                        <View style={{marginTop:30,height:450}}>
                            {this.pictureSpace()}
                        </View>      

                        <TouchableOpacity  
                            style={styles.nextButton}
                            activeOpacity={0.8}
                            onPress={()=>{this.FurnituresScreen()}}
                        >
                            <Text  style = {{fontFamily:'NanumSquare_acR',fontSize:16, color: "white"}}>
                                더 많은 변형 결과 보러가기
                            </Text>
                        </TouchableOpacity>            
                    </View>                 
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

    MainScreen(){
        this.setState({waitScreen:false})
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    RecommendPic(){
        this.props.navigation.navigate("RecommendPic");
    }
    ProfileScreen(){
        this.props.navigation.navigate("Preference")
    }
    FurnituresScreen(){
        this.props.navigation.navigate("Furnitures",{selectedImgData:this.state.selectedImgData})
    }
}

const styles = StyleSheet.create({
    board:{
        flex: 1,
        backgroundColor:'white',
    },
    middle1:{
        marginTop:30,
        marginHorizontal:30,
    },
    subtitleText:{
        fontFamily:'NanumSquare_acB',
        fontSize:18,
        marginTop:30,
        marginBottom:10,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        flex: 0,
    },
    nextButton: {
        width:200,
        height:34,
        borderRadius: 5,
        marginTop:25,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7E76',
        elevation: 5,//이건 안드로이드 그림자
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