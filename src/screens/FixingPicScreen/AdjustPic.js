import React from "react";
import {View,StyleSheet,Image,Text, Modal,TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Network from'../../network/Network';

import HandCheckBox from './components/HandCheckBox';
import BrushCheckBox from './components/BrushCheckBox';
import WallColorBox from './components/WallColorBox';
import FloorColorBox from './components/FloorColorBox';


class LoadItem extends React.Component{//imageList
    constructor(props) {
        super(props);
        this.state={
            selected : this.props.selected,
            closeUp:false,
        }
    }
    render() {
        const lineColor = this.state.selected == true ? '#419DFF' : '#F1F0EE';
        console.log('selected'+this.state.selected)
        return (
            <View >
                <TouchableOpacity
                    onPress={()=>this.setState({selected: !this.state.selected}) }
                    style={{marginTop:10, marginHorizontal:10,justifyContent:'center',
                    width:60,height:60, borderWidth:2,borderColor:lineColor, backgroundColor:'white'}}
                    key={JSON.stringify(this.props.imageNum)}
                >
                    <Image
                        style={{width:60,height:60,resizeMode:'contain'}}
                        source= {require("../../../assets/img/smallSofa.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
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

export default class AdjustPic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            furnitureScreen:false, //가구 선택하면 아래화면 바뀜
            wallHandChecked:false,
            floorHandChecked:false,
            wallBrushChecked:false,
            floorBrushChecked:false,

            selectedWallColor:'',
            selectedWallColor:'',

            closeUp:false,//사진 확대
            bottomFurnitureScreen:false,//아래 세부 가구 창 띄우기
            selectedFurniture:'',
        }
    }

    sendPic(){
        return Network.sendUserPic(this.state.sendImg)
            .then(res=>res.blob())//blob이나 arrayBuffer는 이미지,파일같은 data에 사용.
            .then(resp=>{
                //alert('사진 전송&변환 성공')
                console.log(resp)
            })
            .catch(error => {
                //alert('사진 전송&변환 error')
                console.log(error)
            })

    }
    

    getImages(){
        return Network.getFurnitureImg(this.state.selectedFurniture)
            .then(res=>res.json())
            .then(resp=>{
                //resp.result = JSON.stringify(resp.result);
                this.setState({imgList:resp.result})
                this.setState({loadingFinishFlag:true})
                console.log('선호 사진 가져오기 ok')
            })
            .catch(error => {
                console.log('선호 사진 가져오기 error')
                console.log(error)
            })
    }
    

    getBottomScreen(){
        if(!this.state.bottomFurnitureScreen){
            console.log('벽,바닥 색상')
            return(
                <View>
                    <Text style={[styles.subtitleText,{marginTop:30}]}>벽 색상</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontFamily:'NanumSquare_acR',fontSize:13}}>변경 전 색상</Text>
                                <Text style={{marginLeft:55, fontFamily:'NanumSquare_acR',fontSize:13}}>추천 색상</Text>
                            </View>
                            <WallColorBox 
                                img={this.state.img}
                                updateSelectedColor={(spuidColor) => {//WallColorBox안에  spuidColor 바뀌면 selectStyle에서도 그걸 알아야하니까 
                                    this.setState({ selectedWallColor : spuidColor })//spuidColor 를 다시 check에 넣어줌
                                }}
                                />
                            <View style={{flexDirection:'row'}}>
                                <HandCheckBox
                                    ischecked={this.state.wallHandChecked}
                                    updateHandChecked={(isChecked) => {//CheckBox안에 ischecked 값을 checkTerm에도 적용시켜줌
                                        this.setState({ wallHandChecked: isChecked })//isChecked 를 다시 check에 넣어줌
                                }}/>
                                <BrushCheckBox
                                    ischecked={this.state.wallBrushChecked}
                                    updateHandChecked={(isChecked) => {//CheckBox안에 ischecked 값을 checkTerm에도 적용시켜줌
                                        this.setState({ wallBrushChecked: isChecked })//isChecked 를 다시 check에 넣어줌
                                }}/>
                            </View>
                            

                            <Text style={[styles.subtitleText,{marginTop:40}]}>바닥 색상</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontFamily:'NanumSquare_acR',fontSize:13}}>변경 전 색상</Text>
                                <Text style={{marginLeft:55, fontFamily:'NanumSquare_acR',fontSize:13}}>추천 색상</Text>
                            </View>
                            <FloorColorBox 
                                img={this.state.img}
                                updateSelectedColor={(spuidColor) => {//WallColorBox안에  spuidColor 바뀌면 selectStyle에서도 그걸 알아야하니까
                                    this.setState({ selectedFloorColor : spuidColor })//spuidColor 를 다시 check에 넣어줌
                                }}
                                />
                            <View style={{flexDirection:'row'}}>
                                <HandCheckBox
                                    ischecked={this.state.floorHandChecked}
                                    updateFloorChecked={(isChecked) => {//CheckBox안에 ischecked 값을 checkTerm에도 적용시켜줌
                                        this.setState({ floorHandChecked: isChecked })//isChecked 를 다시 check에 넣어줌
                                }}/>
                                <BrushCheckBox
                                    ischecked={this.state.floorBrushChecked}
                                    updateFlooeChecked={(isChecked) => {//CheckBox안에 ischecked 값을 checkTerm에도 적용시켜줌
                                        this.setState({ floorBrushChecked: isChecked })//isChecked 를 다시 check에 넣어줌
                                }}/>
                            </View>
        
                            <TouchableOpacity 
                                style={{ marginLeft:210, marginTop:130}}
                                //onPress={()=>{this.timer()}}
                                >
                                <Image
                                    style={{width:120,height:46,resizeMode:'contain'}}
                                    source={require("../../../assets/img/nextButton.png")}
                                    />
                            </TouchableOpacity>
                </View>
            )
        }
        else{
            console.log('세부 가구를 그려')
            return(
                <View>
                    <Text style={[styles.subtitleText,{marginTop:30}]}>
                        선호도를 바탕으로 변형한 추천 결과입니다. 
                    </Text>
                    <Text style={{fontFamily:'NanumSquare_acR',fontSize:13}}>변경 전</Text>          
                    <FlatList
                        //contentContainerStyle={styles.list}
                        numColumns={2}
                        ListHeaderComponent={<View/>}
                        data={this.state.imgList}
                        renderItem={({item})=>
                            <LoadItem
                                imageList={item}
                                selected = {false}
                                //key={item.imageNum}
                            />
                        }
                        keyExtractor={item=>JSON.stringify(item.imageNum)}
                        //extraData={this.state.imgList.selected}
                        ListFooterComponent={<View/>}
                    />  
                </View>
               
            )
        }   
    }


    render(){
        return(
            <View style={{flex:1}}> 
                <View style={styles.board}>
                    <View style ={styles.middle1}>
                        <Text style={{fontSize:24, fontFamily:'NanumSquare_acB',marginBottom:5}}
                        >세부 인테리어 변경
                        </Text>
                        <Text style={{fontSize:14, fontFamily:'NanumSquare_acR',color:'gray'}}
                        >벽과 바닥 색, 가구의 세부 디자인을 조절해보세요
                        </Text>
                        <View style={{marginTop:15,flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity>
                                <Image 
                                style={{width:24, height:24,resizeMode:'contain'}}
                                source={require("../../../assets/img/leftArrow.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image 
                                style={{width:24, height:24,resizeMode:'contain'}}
                                source={require("../../../assets/img/rightArrow.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{marginLeft:220}}>
                                <Image 
                                style={{width:25, height:24,resizeMode:'contain'}}
                                source={require("../../../assets/img/download.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>this.setState({closeUp: !this.state.closeUp})}
                                style={{marginLeft:5}}
                            >
                                <Image
                                    style={{width:17,height:17, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={{width:320, borderWidth:1,alignItems:'center',borderColor:'black'}}>
                                <Image 
                                    style={{marginTop:2, width:290, height:175/*,resizeMode:'contain'*/}}
                                    source={require('../../../assets/img/interior(83).jpg')}//{this.state.img}/>
                                    />
                            </TouchableOpacity>
                        </View>   

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
                                        source= {require("../../../assets/img/interior(83).jpg")}
                                    />
                                </View>  
                            </TouchableOpacity>                   
                        </Modal>

                
                    </View>

                    <View style={{flex:1,marginLeft:32}}>
                        {this.getBottomScreen()}
                        
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
}

const styles = StyleSheet.create({
    rotate:{
        transform: [{ rotate: '90deg' }]
    },
    board:{
        flex: 1,
        backgroundColor:'white',
    },
    middle1:{
        marginTop:50,
        marginLeft:32,
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