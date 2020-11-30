import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, Modal, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Network from'../../network/Network';

export default class Furnitures extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loadingFinishFlag:false,
            selectedImgData:this.props.route.params.selectedImgData,
            selectedImg:null,
        }
    }
    
    getFurnitureImages(){
        return Network.getFurnitureImg()
            .then(res=>res.json())
            .then(resp=>{
                //resp.result = JSON.stringify(resp.result);
                this.setState({imgList:resp.result})
                this.setState({loadingFinishFlag:true})
                console.log('getFurnitureImages 가져오기 ok')
            })
            .catch(error => {
                console.log('getFurnitureImages 가져오기 error')
                console.log(error)
            })
    }
    
    _renderPost=({item}) => {
        return (
            <View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15,width:'50%',fontFamily:'NanumSquare_acR'}}>
                        변경 전
                    </Text>
                    <Text style={{ fontSize:15, width:'50%',fontFamily:'NanumSquare_acR'}}>
                        변경 후
                    </Text>
                </View>
            </View>
               
        ) 
    }
    getFurnitureScreen(){
        if(!this.state.loadingFinishFlag){
            console.log('getFurnitureScreen 안그려')
            return <View/>
        }
        else{
            console.log('getFurnitureScreen 그려')
            console.log(this.state.imgList)
            return(  
                <FlatList
                    ListHeaderComponent={<View/>}
                    data={this.state.imgList}
                    keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                    ListFooterComponent={<View/>}
                />             
            )
        }   
    }
    async numToImg(){   
        try {
            console.log("Furnitures에서 numtoimg들어가기 전 selectedImg은 비어있어야 함")
            console.log(this.state.selectedImg)          
            const resp = await Network.numToImg(this.state.selectedImgData.imageNum);
            var uri = { uri: resp.url };
            this.setState({ selectedImg: uri });
            this.setState({pictureFlag:true});
        } catch (err) {
            console.log("callNumToInt 에러!!");
            console.log(err);
        }
    }

    componentDidMount(){
        this.numToImg()
    }
    
    render(){
        return(
            <View style={styles.container}>   
                <View style ={styles.board}>
                    <Text style={[styles.title,{marginTop:40}]}>
                        가구들이 다양하게 변형된 모습을 확인해 보세요. </Text>
                    {this.getFurnitureScreen()}
                        
                </View>
                
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
    AdjustPicScreen() {
        this.props.navigation.navigate("AdjustPic")
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F0F0F0',
    },
    board:{
        flex:1,
        marginHorizontal:5,
        marginTop:5,
        paddingHorizontal:30,
        backgroundColor:'white'
    },
    title:{
        fontFamily:'NanumSquare_acB',
        fontSize:23,
    },
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