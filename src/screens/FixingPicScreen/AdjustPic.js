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


    makeModal(image){
        <Modal //이거 쓸거
            visible={this.state.closeUp} 
            transparent={true}
            onRequestClose={() => { this.setState({closeUp:false}) } }//뒤로가기 누르면 사라짐.
            animationType="slide">
            <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
            onPress={()=>this.setState({closeUp: false}) }> 
                <View style={{ height:400, alignItems:'center'}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source= {image}
                    />
                </View>  
            </TouchableOpacity>                   
        </Modal> 
    }
    getId(){
        this.setState({id : Network.getNetworkId()})    
    }

    componentDidMount(){
        this.getId()
    }
    render(){
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{alignSelf:'center',fontSize:24, fontFamily:'NanumSquare_acB',marginBottom:5}}
                        >변경된 세부 인테리어 결과
                        </Text>
                        <Text style={{alignSelf:'center',fontSize:14, marginBottom:2,fontFamily:'NanumSquare_acR',color:'#A9A9A9'}}>
                            {this.state.id} 님의 선호도에 따른 인테리어 변형 결과입니다.
                        </Text>
                        <Text style={{alignSelf:'center',fontSize:14, fontFamily:'NanumSquare_acR',color:'#A9A9A9'}}
                        >벽, 바닥, 가구의 세부 디자인들을 확인해보세요! 
                        </Text>
                        <View style={{marginTop:30,height:450}}>
                            <Image 
                                style={{width:'100%',height:'100%',resizeMode:'contain',}}
                                source={require('../../../assets/img/interior(83).jpg')}//{this.state.img}/>
                                />
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
        this.props.navigation.navigate("Furnitures")
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
        marginTop:40,
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