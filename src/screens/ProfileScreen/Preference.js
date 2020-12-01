import React from "react";
import { SafeAreaView, View, StyleSheet,Text,Image,TouchableOpacity, Modal,ScrollView } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Network from'../../network/Network';
//import Picture from './Picture'

export default class Preference extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loadingFinishFlag:false,
            selectedAry:[
                0,0,0,0,0,
                0,0,0,0,0,
                0,0,0,0,0,0],
            imageList:[
                {   imageNum:"1",selected: false,
                    adr : require("../../../assets/img/interior(1).jpg")},
                {   imageNum:"2",selected:false,
                    adr : require("../../../assets/img/interior(8).jpg")},
                {   imageNum:"3",selected:false,
                    adr : require("../../../assets/img/interior(13).jpg")},
                {   imageNum:"4",selected:false,
                    adr : require("../../../assets/img/interior(28).jpg")},
                {   imageNum:"5",selected:false,
                    adr : require("../../../assets/img/interior(29).jpg")},
                {   imageNum:"6",selected:false,
                    adr : require("../../../assets/img/interior(30).jpg")},
                {   imageNum:"7",selected:false,
                    adr : require("../../../assets/img/interior(34).jpg")},
                {   imageNum:"8",selected:false,
                    adr : require("../../../assets/img/interior(35).jpg")},
                {   imageNum:"9",selected: false,
                    adr : require("../../../assets/img/interior(40).jpg")},
                {   imageNum:"10",selected:false,
                    adr : require("../../../assets/img/interior(56).jpg")},
                {   imageNum:"11",selected: false,
                    adr : require("../../../assets/img/interior(70).jpg")},
                {   imageNum:"12",selected:false,
                    adr : require("../../../assets/img/interior(79).jpg")},
                {   imageNum:"13",selected:false,
                    adr :require("../../../assets/img/interior(80).jpg")},
                {   imageNum:"14",selected:false,
                    adr :require("../../../assets/img/interior(82).jpg")},
                {   imageNum:"15",selected:false,
                    adr :require("../../../assets/img/interior(83).jpg")},
                {   imageNum:"16",selected:false,
                    adr :require("../../../assets/img/interior(84).jpg")}
            ],
            result:{}, // 서버에 보내줄 결과.
            closeUp0:false,
            closeUp1:false,
            closeUp2:false,
            closeUp3:false,
            closeUp4:false,
            closeUp5:false,
            closeUp6:false,
            closeUp7:false,
            closeUp8:false,
            closeUp9:false,
            closeUp10:false,
            closeUp11:false,
            closeUp12:false,
            closeUp13:false,
            closeUp14:false,
            closeUp15:false,
        };
        //this.fn = this.fn.bind(this);
    }
    checkpreferenceDone(){//선호도 조사를 했는지 안했는지에 따라 다른화면으로 가기
        return Network.loadUserPreference2(this.state.userId)
            .then(res=>res.json())
            .then(resp=>{
                if(!resp.result){// 첫 선호도 조사라면
                    this.sendFirstResult()
                }
                else{//아니라면 update
                    this.sendUpdataResult()
                }
            })
    }

    sendUpdataResult(){// 첫 선호도 조사 이후 재조사 시
        return Network.preferenceResult( this.state.result)
            .then(res => res.json())
            .then(res=>{
                if(res.result){
                    this.ProfileScreen();
                }
                else{
                    console.log('선호도 결과 전송 실패')
                    console.log(res.result)
                    console.log(this.state.result)
                }
                    
            })
            .catch(err=>{
                console.log('선호도 결과 전송 오류발생함')
                console.log(err)
            })
    }

    sendFirstResult(){// 첫 선호도 조사 시
        return Network.firstPreferenceResult( this.state.result)
            .then(res => res.json())
            .then(res=>{
                if(res.result){
                    this.ProfileScreen();
                }
                else{
                    console.log('선호도 결과 전송 실패')
                    console.log(res.result)
                    console.log(this.state.result)
                }
                    
            })
            .catch(err=>{
                console.log('선호도 결과 전송 오류발생함')
                console.log(err)
            })
    }
    
    preferSelectButton(){
        var selectedPic =[];
        //console.log('selectedAry:'+this.state.selectedAry)
        for(var i = 0;i< this.state.selectedAry.length;i++){
            if(this.state.selectedAry[i] == 1){
                selectedPic = selectedPic.concat(this.state.imageList[i].imageNum);    
            }
        }
        this.setState({ result: selectedPic },
            //()=>{console.log('선택된 사진들은: '+this.state.result)},
            ()=>{this.checkpreferenceDone()}//{this.sendResult()}
        )
        this.ProfileScreen();
    }
    changeSelected(i){ // 사진 선택됐는지 안됐는지. 됐으면 1로 바꾸고  아니면 0
        const newArray = [...this.state.selectedAry];
        if(this.state.selectedAry[i] == 0){
            newArray[i] = 1;
        }
        else{
            newArray[i] = 0;
        }
        this.setState({ selectedAry: newArray });
    }

    makeModal(imageUrl){
        //console.log('모달..? : '+this.state.closeUp)
        //return(
            //<TouchableWithoutFeedback onPress={()=>{this.setState({closeUp:false})}}>
                <Modal 
                    visible={true} 
                    transparent={true}
                    onRequestClose={() => { this.setState({closeUp:false}) } }//뒤로가기 누르면 사라짐.
                    animationType="slide">                 
                    <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                    onPress={()=>this.setState({closeUp: false}) }> 
                        <View style={{ height:400, alignItems:'center'}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source= {imageUrl}
                            />
                        </View>  
                    </TouchableOpacity>                   
                </Modal>
            //</TouchableWithoutFeedback>
        //)
    }
    color(i){
        const lineColor = this.state.selectedAry[i] == 1 ? '#419DFF' : '#F1F0EE';
        return lineColor
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.border}>
                    <SafeAreaView style={styles.AndroidSafeArea}>
                    <Text style={styles.title}>
                        선호도 조사</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',color:'gray',fontSize:15,marginTop:15,marginHorizontal:30}}>
                        사용자의 인테리어 선호도 조사에 사용됩니다.       
                    </Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',color:'gray',fontSize:15,marginHorizontal:30,marginBottom:5}}>
                        마음에 드는 사진을 모두 골라주세요!        
                    </Text>
                    <ScrollView>
                    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                        <View // 사진 0
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(0) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(0)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[0].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp0: !this.state.closeUp0},
                                    ()=>this.makeModal(this.state.imageList[0].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp0} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp0:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp0: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[0].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 1
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(1) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(1)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[1].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp1: !this.state.closeUp1},
                                    ()=>this.makeModal(this.state.imageList[1].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp1} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp1:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp1: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[1].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 2
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(2) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(2)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[2].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp2: !this.state.closeUp2},
                                    ()=>this.makeModal(this.state.imageList[2].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp2} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp2:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp2: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[2].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 3
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(3) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(3)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[3].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp3: !this.state.closeUp3},
                                    ()=>this.makeModal(this.state.imageList[3].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp3} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp3:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp3: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[3].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 4
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(4) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(4)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[4].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp4: !this.state.closeUp4},
                                    ()=>this.makeModal(this.state.imageList[4].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp4} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp4:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp4: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[4].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 5
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(5) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(5)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[5].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp5: !this.state.closeUp5},
                                    ()=>this.makeModal(this.state.imageList[5].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp5} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp5:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp5: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[5].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 6
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(6) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(6)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[6].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp6: !this.state.closeUp6},
                                    ()=>this.makeModal(this.state.imageList[6].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp6} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp6:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp6: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[6].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 7
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(7) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(7)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[7].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp7: !this.state.closeUp7},
                                    ()=>this.makeModal(this.state.imageList[7].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp7} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp7:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp7: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[7].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View // 사진 8
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(8) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(8)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[8].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp8: !this.state.closeUp8},
                                    ()=>this.makeModal(this.state.imageList[8].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp8} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp8:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp8: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[8].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 9
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(9) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(9)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[9].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp9: !this.state.closeUp9},
                                    ()=>this.makeModal(this.state.imageList[9].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp9} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp9:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp9: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[9].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 10
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(10) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(10)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[10].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp10: !this.state.closeUp10},
                                    ()=>this.makeModal(this.state.imageList[10].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp10} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp10:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp10: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[10].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 11
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(11) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(11)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[11].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp11: !this.state.closeUp11},
                                    ()=>this.makeModal(this.state.imageList[11].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp11} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp11:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp11: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[11].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 12
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(12) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(12)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[12].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp12: !this.state.closeUp12},
                                    ()=>this.makeModal(this.state.imageList[12].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp12} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp12:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp12: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[12].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 13
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(13) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(13)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[13].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp13: !this.state.closeUp13},
                                    ()=>this.makeModal(this.state.imageList[13].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp13} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp13:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp13: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[13].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 14
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(14) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(14)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[14].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp14: !this.state.closeUp14},
                                    ()=>this.makeModal(this.state.imageList[14].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp14} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp14:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp14: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[14].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>
                        <View //사진 15
                        >
                            <TouchableOpacity
                                onPress = {()=>{this.changeSelected(15) }}
                                style={[styles.pictureTouchable,{borderColor:this.color(15)}]}>
                                <Image
                                    style={{width:140,height:93,resizeMode:'contain'}}
                                    source= {this.state.imageList[15].adr}                       
                                />
                            </TouchableOpacity>
                            <TouchableOpacity //사진 돋보기 기능
                                onPress={()=>this.setState({closeUp15: !this.state.closeUp15},
                                    ()=>this.makeModal(this.state.imageList[15].adr)) }
                                style={styles.closeUp}
                            >
                                <Image
                                    style={{width:18,height:18, resizeMode:'contain'}}
                                    source= {require("../../../assets/img/closeUp.png")}
                                />
                            </TouchableOpacity>
                            <Modal 
                                visible={this.state.closeUp15} 
                                transparent={true}
                                onRequestClose={() => { this.setState({closeUp15:false}) } }//뒤로가기 누르면 사라짐.
                                animationType="slide">                 
                                <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)',flex:1,}}
                                onPress={()=>this.setState({closeUp15: false}) }> 
                                    <View style={{ height:400, alignItems:'center'}}>
                                        <Image
                                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                            source= {this.state.imageList[15].adr}
                                        />
                                    </View>  
                                </TouchableOpacity>                   
                            </Modal>
                        </View>

                    </View>
                    </ScrollView>
                    <TouchableOpacity // 사진선택완료 버튼
                        style={styles.button}
                        onPress={()=>this.preferSelectButton()}
                    > 
                        <Text style={{color:'white',fontFamily:'NanumSquare_acR', fontSize:16}}>
                            사진 선택 완료
                        </Text>
                    </TouchableOpacity>  
                    </SafeAreaView>
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
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.InteriorScreen()}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
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
    pictureTouchable:{
        marginTop:10,
        marginHorizontal:10,
        justifyContent:'center',
        width:144,height:98,
        borderWidth:2,
        backgroundColor:'white'
    },
    closeUp:{
        width:20,height:20,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:15, bottom:5
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