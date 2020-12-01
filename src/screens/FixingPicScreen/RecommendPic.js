import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, Modal, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Network from'../../network/Network';
import {clearAll} from "../../components/SaveData";

class LoadItem extends React.Component{//imageList
    constructor(props) {
        super(props);
        this.state={
            //selected : this.props.selected,
            closeUp:false,
            picForDetail:null,
            pictureFlag:false,
            image:this.props.image,
            recommendImages:this.props.imgList
        }
    }
    async numToImg(){   
        try {
            console.log("posting에서 numtoimg1들어가기 전 picForDetail은 비어있어야 함")
            console.log(this.state.picForDetail)
            
            const resp = await Network.numToImg(this.state.image.imageNum);
            var uri = { uri: resp.url };
            this.setState({ picForDetail: uri });
            this.setState({pictureFlag:true});
        } catch (err) {
            console.log("callNumToInt 에러!!");
            console.log(err);
        }
    }

    pictureSpace(){
        if(this.state.pictureFlag){
            console.log("reecommend>picturespace에서 사진 그린다")
            return(              
                <Image
                    style={{width:140,height:93,resizeMode:'contain'}}
                    source={this.state.picForDetail}
                />
            ) 
        }
    }
    press(){
        console.log('RecommendPic > press누름')
        console.log(this.state.image)
        this.props.selecteImg(this.state.image)
        //this.props.AdjustPicScreen()
    }
    componentDidMount(){
        console.log("recommend data num to int로 바꾸자!!!")
        this.numToImg()
    }
    render() {
        return (
            <View >
                <TouchableOpacity
                    onPress={()=>{this.press()}}
                    style={{marginTop:10, marginHorizontal:10,justifyContent:'center',
                    width:140,height:97, borderWidth:2,borderColor:'#F1F0EE', backgroundColor:'white'}}
                    key={JSON.stringify(this.state.image.imageNum)}
                >
                {this.pictureSpace()}
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
                    onRequestClose={() => { this.setState({closeUp:false}) } }//뒤로가기 누르면 사라짐.
                    animationType="slide">
                    <View style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                        onPress={()=>this.setState({closeUp: false}) }> 
                        <View style={{ height:400, alignItems:'center'}}>
                            <Image
                                    style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                    source= {this.state.picForDetail}
                            />
                        </View>                       
                    </View>
                </Modal>
            </View>
            
        )
    }
    AdjustPicScreen() {
        this.props.navigation.navigate("AdjustPic",{selectedImg:this.state.image})
    }

}

export default class RecommendPic extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            image : this.props.route.params.image,
            //sendImg : this.props.route.params.sendImg,
            recommendImages : this.props.route.params.recommendImages,
            loadingFinishFlag:false,
            selectedImg:null,
        }
    }
    clear(){
        clearAll();
        this.InteriorScreen();
    }
    componentDidMount(){
        console.log('받은 recommend dadta는')
        console.log(this.state.recommendImages)
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style ={styles.board}> 
                    <Text style={[styles.title,{marginTop:30}]}>
                        선호도를 바탕으로 변경한 결과입니다</Text>
                    
                    <Text style={{fontFamily:'NanumSquare_acR',fontSize:15,marginTop:25,marginBottom:10}}>
                        원본 이미지</Text>
                    <Image 
                        style={{alignSelf:'center', marginTop:2, width:290, height:175,resizeMode:'contain'}}
                        source={this.state.image}/>
                    <TouchableOpacity  
                        style={styles.nextButton}
                        activeOpacity={0.8}
                        onPress={()=>{this.clear()}}
                    >
                        <Text  style = {{fontFamily:'NanumSquare_acR',fontSize:15, color: "white"}}>
                            다른 사진으로 바꾸기 
                        </Text>
                    </TouchableOpacity> 
                    <Text style={{fontFamily:'NanumSquare_acR',fontSize:15,marginTop:20,marginBottom:10}}>
                        변경된 이미지들의 추천 목록입니다 </Text>
                        <FlatList
                            //contentContainerStyle={styles.list}
                            numColumns={2}
                            //ListHeaderComponent={<View/>}
                            data={this.state.recommendImages}
                            keyExtractor={(item, index) => 'key'+index}
                            renderItem={({item,index})=>
                            <LoadItem
                                image={item}
                                selected = {false}
                                selecteImg={(img)=>{this.setState({selectedImg:img},
                                    ()=>this.AdjustPicScreen()
                                    );}}
                                key={index}
                            />
                            }
                        />        
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
        console.log('여기 안가..?')
        console.log('adjust pic가기 전 selectedimg 뭔지 체크')
        console.log(this.state.selectedImg)
        this.props.navigation.navigate("AdjustPic",{selectedImgData:this.state.selectedImg})
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
        fontSize:22,
    },
    nextButton: {
        width:140,
        height:30,
        borderRadius: 5,
        marginTop:15,
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