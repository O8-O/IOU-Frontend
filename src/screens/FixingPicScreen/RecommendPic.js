import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, Modal, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Network from'../../network/Network';
class LoadItem extends React.Component{//imageList
    constructor(props) {
        super(props);
        this.state={
            //selected : this.props.selected,
            closeUp:false,
        }
    }

    render() {
        //const lineColor = this.state.selected == true ? '#419DFF' : '#F1F0EE';
        console.log('selected'+this.state.selected)
        return (
            <View >
                <TouchableOpacity
                    onPress={this.props.onPress }
                    style={{marginTop:10, marginHorizontal:10,justifyContent:'center',
                    width:140,height:97, borderWidth:2,borderColor:'#F1F0EE', backgroundColor:'white'}}
                    key={JSON.stringify(this.props.imageNum)}
                >
                    <Image
                        style={{width:140,height:93,resizeMode:'contain'}}
                        source= {require("../../../assets/img/interior(83).jpg")}
                    />
                </TouchableOpacity>
                <TouchableOpacity //돋보기 기능
                    onPress={()=>this.setState({closeUp: !this.state.closeUp}) }
                    style={{ position: 'absolute', backgroundColor: '#FFFFFF', right:15, bottom:5}}
                >
                    <Image
                        style={{width:20,height:20, opacity:0.7,resizeMode:'contain'}}
                        source= {require("../../../assets/img/closeUp.png")}
                    />
                </TouchableOpacity>
                <Modal 
                    visible={this.state.closeUp} 
                    transparent={true}
                    animationType="slide">
                    <View style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}> 
                        <View style={{ width:'100%', alignItems:'center',backgroundColor:'white'}}>
                            <Image
                                    style={{width:336,height:223.2,resizeMode:'contain'}}
                                    source= {require("../../../assets/img/interior(83).jpg")}
                            />
                            <TouchableOpacity
                                onPress={()=>this.setState({closeUp: !this.state.closeUp}) }
                                style={{ position: 'absolute', backgroundColor: '#FFFFFF', right:15, bottom:10}}
                            >
                                <Image
                                    style={{width:20,height:20, opacity:0.7,resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeDown.png")}
                                />
                            </TouchableOpacity>
                        </View>                       
                    </View>
                </Modal>
            </View>
            
        )
    }

}

export default class RecommendPic extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            img : this.props.route.params.img,
            sendImg : this.props.route.params.sendImg,
            loadingFinishFlag:false,
        }
    }
    
    getImages(){
        return Network.getRecommendImg()
            .then(res=>res.json())
            .then(resp=>{
                //resp.result = JSON.stringify(resp.result);
                this.setState({imgList:resp.result})
                this.setState({loadingFinishFlag:true})
                console.log('recommend 사진 가져오기 ok')
            })
            .catch(error => {
                console.log('recommend 사진 가져오기 error')
                console.log(error)
            })
    }
    

    getRecommendScreen(){
        if(!this.state.loadingFinishFlag){
            console.log('안그려')
            return <View/>
        }
        else{
            console.log('플랫리스트를 그려')
            console.log(this.state.imgList)
            return(             
                <FlatList
                    //contentContainerStyle={styles.list}
                    numColumns={2}
                    ListHeaderComponent={<View/>}
                    data={this.state.imgList}
                    renderItem={({item})=>
                        <LoadItem
                            imageList={item}
                            selected = {false}
                            onPress={()=>this.AdjustPicScreen()}
                            //key={item.imageNum}
                        />
                    }
                    keyExtractor={item=>JSON.stringify(item.imageNum)}
                    //extraData={this.state.imgList.selected}
                    ListFooterComponent={<View/>}
                />  
            )
        }   
    }
    componentDidMount(){
        this.getImages()
    }
    
    render(){
        return(
            <View style={styles.container}>
                
                <View style ={styles.board}>
                    
                        <Text style={[styles.title,{marginTop:40}]}>
                            사용자의 선호도를 바탕으로 변형한 </Text>
                        <Text style={[styles.title,{marginBottom:10}]}>이미지입니다.</Text>
                        <Text style={{fontFamily:'NanumSquare_acR',fontSize:15,marginTop:15}}>
                            원본 이미지</Text>
                        <Image 
                            style={{marginTop:2, width:290, height:175,resizeMode:'contain'}}
                            source={this.state.img}/>
                        <Text style={{fontFamily:'NanumSquare_acR',fontSize:15,marginTop:50,marginBottom:10}}>
                            변형된 이미지들의 추천 목록입니다 </Text>
                            
                        <View style={{alignItems:'center'}}>
                            {this.getRecommendScreen()}
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
        fontSize:20,
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