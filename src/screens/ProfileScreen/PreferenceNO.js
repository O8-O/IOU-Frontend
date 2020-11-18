import React from "react";
import { SafeAreaView, View, StyleSheet,Text,Image,TouchableOpacity, Modal,ScrollView } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Network from'../../network/Network';
//import Picture from './Picture'

class LoadItem extends React.Component{//imageList
    constructor(props) {
        super(props);
        this.state={
            selected : this.props.selected,
            closeUp:false,
            i:this.props._i,
            imageList:this.props._imageList
        }
    }

    render() {
        //const sel = this.state.selected;
        const lineColor = selected == true ? '#419DFF' : '#F1F0EE';
        console.log('selected'+this.state.selected)
        console.log('i는 '+this.state.i)
        return(
            <View>
                <TouchableOpacity
                   onPress = {()=>{this.setState({ selected: !this.state.selected},
                                ()=>this.props.updateSelected(this.state.selected,this.state) )}
                    
                }
                    style={{marginTop:10, marginHorizontal:10,justifyContent:'center',
                    width:140,height:97, borderWidth:2,borderColor:lineColor, backgroundColor:'white'}}
                    key={this.props._imageNum}
                >
                    <Image
                        style={{width:140,height:93,resizeMode:'contain'}}
                        source= {this.state.imageList[this.state.i].adr}                       
                    />
                </TouchableOpacity>
                <TouchableOpacity //사진 돋보기 기능
                    onPress={()=>this.setState({closeUp: !this.state.closeUp}) }
                    style={{ width:20,height:20,position: 'absolute', alignItems:'center',justifyContent:'center', 
                    backgroundColor: 'white', right:15, bottom:5}}
                >
                    <Image
                        style={{width:18,height:18, resizeMode:'contain'}}
                        source= {require("../../../assets/img/closeUp.png")}
                    />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={()=>{this.setState({closeUp:false})}}>
                <Modal 
                    visible={this.state.closeUp} 
                    transparent={true}
                    onRequestClose={() => { this.setState({closeUp:false}) } }//뒤로가기 누르면 사라짐.
                    animationType="slide">                 
                    <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                    onPress={()=>this.setState({closeUp: false}) }> 
                        <View style={{ height:400, alignItems:'center'}}>
                            <Image
                                //style={{width:336,height:223.2,resizeMode:'contain'}}
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source= {this.state.imageList[this.state.i].adr}
                            />
                        </View>  
                    </TouchableOpacity>                   
                </Modal>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default class Preference extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loadingFinishFlag:false,
            selectedAry:[],
            i :0,
            imageList:[
                {   imageNum:3,selected: false,
                    adr : require("../../../assets/img/interior(1).jpg")},
                {   imageNum:4,selected:false,
                    adr : require("../../../assets/img/interior(8).jpg")},
                {   imageNum:5,selected:false,
                    adr : require("../../../assets/img/interior(13).jpg")},
                {   imageNum:6,selected:false,
                    adr : require("../../../assets/img/interior(28).jpg")},
                {   imageNum:7,selected:false,
                    adr : require("../../../assets/img/interior(29).jpg")},
                {   imageNum:8,selected:false,
                    adr : require("../../../assets/img/interior(30).jpg")},
                {   imageNum:9,selected:false,
                    adr : require("../../../assets/img/interior(34).jpg")},
                {   imageNum:10,selected:false,
                    adr : require("../../../assets/img/interior(35).jpg")},
                {   imageNum:11,selected: false,
                    adr : require("../../../assets/img/interior(40).jpg")},
                {   imageNum:12,selected:false,
                    adr : require("../../../assets/img/interior(56).jpg")},
                {   imageNum:13,selected: false,
                    adr : require("../../../assets/img/interior(70).jpg")},
                {   imageNum:14,selected:false,
                    adr : require("../../../assets/img/interior(79).jpg")},
                {   imageNum:15,selected:false,
                    adr :require("../../../assets/img/interior(80).jpg")},
                {   imageNum:16,selected:false,
                    adr :require("../../../assets/img/interior(82).jpg")},
                {   imageNum:17,selected:false,
                    adr :require("../../../assets/img/interior(83).jpg")},
                {imageNum:18,selected:false,
                    adr :require("../../../assets/img/interior(84).jpg")}
            ],
        };
        const newArray = this.state.imageList;
    }
    
    
    preferSelectButton(){
        for(var i = 0;i< this.state.imageList.length;i++){
            console.log(i+'번쨰 selected를 확인하자')
            if(this.state.imageList[i].selected == true){
                console.log(i+'번쨰 selected가 true야')
                var selectedPic = this.state.myArray.concat(this.state.imageList[i].imageNum);
                this.setState({ selectedAry: selectedPic })
            }
        }
        console.log('선택된 사진들은: '+toString( this.state.selectedAry));
    }
    changeSelected(_selected,_i){
        const newArray = this.state.imageList;
        console.log('imageList는 : '+toString(this.state.imageList));
        console.log('newarrary는 : '+toString(newArray));
        newArray[_i].selected = _selected;
        this.setState({imageList: newArray});

    }
    getI(){
        if(this.state.i >=15){
            this.state.i = 0;
            return this.state.i;
        }
        else{
            return this.state.i++
        }
    }
    getImageView(){
        //var i = 0;
        console.log('getimageview시작')
        return( 
            <View >          
                <FlatList
                    //contentContainerStyle={styles.list}
                    numColumns={2}
                    ListHeaderComponent={<View/>}
                    data={this.state.imageList}
                    renderItem={({item})=>
                        <LoadItem
                            selected = {false}
                            _imageNum={item.imageNum}
                            _i ={this.getI()}
                            _imageList={this.state.imageList}
                            updateSelected={(selected,state)=>
                                this.changeSelected(selected,state.i)   
                            }
                        />
                    }
                    keyExtractor={(index)=>JSON.stringify(index)}//stringfy해야 key중복 오류 없어짐.
                    //keyExtractor={(item)=>{JSON.stringify(item.imageNum), 
                    //    console.log('key 값은-'+JSON.stringify(item.imageNum))}}
                    extraData={this.state.imageList}
                    ListFooterComponent={<View/>}
                />
                <TouchableOpacity // 사진선택완료 버튼
                    style={styles.button}
                    onPress={()=>this.preferSelectButton()}
                > 
                    <Text style={{color:'white',fontFamily:'NanumSquare_acR', fontSize:16}}>
                        사진 선택 완료
                    </Text>
                </TouchableOpacity>  
            </View>
        )
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.border}>
                    <SafeAreaView style={styles.AndroidSafeArea}>
                    <Text style={styles.title}>
                        사용자 조사</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',color:'gray',fontSize:15,marginTop:15,marginHorizontal:30}}>
                        사용자의 인테리어 선호도 조사에 사용됩니다.       
                    </Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',color:'gray',fontSize:15,marginHorizontal:30,marginBottom:5}}>
                        마음에 드는 사진을 모두 골라주세요!        
                    </Text>
                    <View style={{alignItems:'center',marginBottom:70}}>
                        {this.getImageView()}
                    </View>
                    </SafeAreaView>
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
                           source= { require("../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity activeOpacity={0.6}>
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
        this.props.navigation.navigate("Main")
    }
    FreeBoard() {
        this.props.navigation.navigate("Free")
    }
    InteriorScreen() {
        this.props.navigation.navigate("UploadPic")
    }
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 45 : 45
    },
    container:{
        flex: 1,
    },
    border:{
        flex:1,
        backgroundColor:'#F0F0F0',
        paddingHorizontal:5,
        paddingTop:5,
    },
    title:{
        fontFamily:'NanumSquare_acB',
        fontSize:30,   
        marginHorizontal:30,
        //alignSelf:'center'
    },
    list:{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    picture:{
        margin:5,
        //width:140,
        //height:93.3,
        resizeMode:'contain',
        backgroundColor:'pink',
        flexDirection:'row'
    },

    button:{
        backgroundColor:'#FF7E76',
        borderRadius:3,
        width:120,
        height:30,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        marginTop:10,
        marginBottom:30,
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
    },

});