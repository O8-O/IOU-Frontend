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
            picForDetail:[],
            pictureFlag:false,
            image:this.props.image,
            closeUpImage:null,
            numberToKor:'',
            
        }
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
                            source= {this.state.closeUpImage}
                        />
                    </View>
                </TouchableOpacity>                   
            </Modal>
        )
    }
        
    async numToImg3(){    
        try {
            console.log('NW> num To img 3 의 this.state.image.link[0]은 ')
            console.log(this.state.image.link[0])
            const resp = await Network.numToFurnitureImg(this.state.image.link[0]);
            var uri = { uri: resp.url };
            var temp = this.state.picForDetail.concat(uri);
            this.setState({ picForDetail: temp });

            console.log('NW> num To img 3 의 this.state.image.link[1]은 ')
            console.log(this.state.image.link[1])
            const resp_1 = await Network.numToFurnitureImg(this.state.image.link[1]);
            var uri_1 = { uri: resp_1.url };
            var temp_1 = this.state.picForDetail.concat(uri_1);
            this.setState({ picForDetail: temp_1 });

            console.log('NW> num To img 3 의 this.state.image.link[2]은 ')
            console.log(this.state.image.link[2])
            const resp_2 = await Network.numToFurnitureImg(this.state.image.link[2]);
            var uri_2 = { uri: resp_2.url };
            var temp_2 = this.state.picForDetail.concat(uri_2);
            this.setState({ picForDetail: temp_2 });

            this.setState({pictureFlag:true});
        } catch (err) {
            console.log(err);
        }      
    }

    pictureSpace(){
        console.log('furniture pictureSpace 그리게 될 최동 이미지는')
        if(this.state.pictureFlag){
            return(              
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <View>
                        <TouchableOpacity //1 
                            onPress={()=>{this.press()}}
                            style={{marginTop:10, marginHorizontal:3,justifyContent:'center',
                            width:112,height:77, borderWidth:2,borderColor:'#F1F0EE'}}
                            key={JSON.stringify(this.state.image.imageNum)}
                        >
                        <Image
                            style={{width:110,height:74,/*resizeMode:'contain'*/}}
                            source={this.state.picForDetail[0]}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity //사진 돋보기 기능
                            onPress={()=>this.setState({closeUp: true,closeUpImage:this.state.picForDetail[0]})}
                            style={styles.closeUp}
                        >
                            <Image
                                style={{width:15,height:15, resizeMode:'contain'}}
                                source= {require("../../../assets/img/closeUp.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View>
                        <TouchableOpacity //2
                            onPress={()=>{this.press()}}
                            style={{marginTop:10, marginHorizontal:3,justifyContent:'center',
                            width:112,height:77, borderWidth:2,borderColor:'#F1F0EE', backgroundColor:'white'}}
                            key={JSON.stringify(this.state.image.imageNum)}
                        >
                        <Image
                            style={{width:110,height:74,resizeMode:'contain'}}
                            source={this.state.picForDetail[1]}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity //사진 돋보기 기능
                            onPress={()=>this.setState({closeUp: true,closeUpImage:this.state.picForDetail[1]})}
                            style={styles.closeUp}
                        >
                            <Image
                                style={{width:15,height:15, resizeMode:'contain'}}
                                source= {require("../../../assets/img/closeUp.png")}
                            />
                        </TouchableOpacity>
                    </View>
                   
                    <View>
                        <TouchableOpacity //3
                            onPress={()=>{this.press()}}
                            style={{marginTop:10, marginHorizontal:3,justifyContent:'center',
                            width:112,height:77, borderWidth:2,borderColor:'#F1F0EE', backgroundColor:'white'}}
                            key={JSON.stringify(this.state.image.imageNum)}
                        >
                        <Image
                            style={{width:110,height:74,resizeMode:'contain'}}
                            source={this.state.picForDetail[2]}
                        />

                        </TouchableOpacity>
                        <TouchableOpacity //사진 돋보기 기능
                            onPress={()=>this.setState({closeUp: true,closeUpImage:this.state.picForDetail[2]})}
                            style={styles.closeUp}
                        >
                            <Image
                                style={{width:15,height:15, resizeMode:'contain'}}
                                source= {require("../../../assets/img/closeUp.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>
            ) 
        }
    }
   
    componentDidMount(){
        console.log('compoennt did mount')
        this.numToImg3()
    }

    render() {
        console.log('selected'+this.state.selected)
        if(this.props.i == 1){
            this.state.numberToKor = '첫'
        }
        else if(this.props.i == 2){
            this.state.numberToKor = '두'
        }
        else if(this.props.i == 3){
            this.state.numberToKor = '세'
        }
        else if(this.props.i == 4){
            this.state.numberToKor = '네'
        }
        else if(this.props.i == 5){
            this.state.numberToKor = '다섯'
        }
        return (
            <View style={styles.furnitureBox}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17,fontFamily:'NanumSquare_acR',
                                marginLeft:3, marginBottom:15}}>
                            {this.state.numberToKor}번째 가구의 추천 변경 보기
                        </Text>
                    </View>
                </View>
                <View>
                    {this.pictureSpace()}
                </View>
                {this.showModal()}

            </View>
            
        )
    }
    AdjustPicScreen() {
        this.props.navigation.navigate("AdjustPic",{selectedImg:this.state.image})
    }

}

export default class Furnitures extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            //loadingFinishFlag:false,
            selectedImgData:this.props.route.params.selectedImgData,
            selectedImg:null,
        }
    }  
    getFurnitureScreen(){
            var i = 1;
            return(  
                <FlatList
                    ListHeaderComponent={<View/>}
                    data={this.state.selectedImgData.data.recommendFurniture}
                    keyExtractor={(index)=>JSON.stringify(index)}//{this._returnKey}
                    renderItem={({item,index})=>
                        <LoadItem
                            image={item}
                            i ={i++}
                            selected = {false}
                            key={index}
                        />
                    }
                    ListFooterComponent={<View/>}
                />             
            )
            

        //}   
    }

    render(){
        return(
            <View style={styles.container}>   
                <View style ={styles.board}>
                    <Text style={[styles.title,{marginTop:40}]}>
                        추천하는 가구들도 확인해 보세요! </Text>
                    <View style={{flex:1, marginTop:30}}>
                        {this.getFurnitureScreen()} 
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
        paddingHorizontal:5,
        backgroundColor:'white'
    },
    closeUp:{ // 확대 버튼
        width:17,height:17,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:4, bottom:2
    },
    title:{
        fontFamily:'NanumSquare_acB',
        fontSize:23,
    },
    furnitureBox:{
        marginTop:15,marginBottom:10, 
        paddingTop:10, paddingBottom:15,
        marginHorizontal:1,
        paddingHorizontal:5,
        backgroundColor:'white', elevation:3,
        borderWidth:1,
        borderColor:'#F2F2F2',
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