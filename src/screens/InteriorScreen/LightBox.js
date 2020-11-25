import React from "react";
import {View,StyleSheet,Image,Modal,Text,TouchableOpacity } from "react-native";
//import ColorPanel from 'react-native-color-panel';

export default class ColorBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            boxColor1:'#FFFACE',
            borderColor1:'gray',
            boxColor2:'white',
            borderColor2:'gray',
            boxColor3:'#FFCFB5',
            borderColor3:'gray',
            boxColor4:'#FF7E76',
            borderColor4:'gray',

            selectedBox:0, // 현재 체크된 box의 번호
            selectedColor:null,
            spuidSelected:false,
            spuidColor:'brown',
        }
    }

    box1(){
        if(this.state.selectedBox == 1){//box 1 선택해제
            this.setState({selectedBox : 0,borderColor1:'gray'});
            this.setState({selectedColor : null},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        else{//box 1을 선택
            this.setState({selectedBox : 1, 
                borderColor1:'red',borderColor2:'gray',borderColor3:'gray',borderColor4:'gray',
            });
            this.setState({selectedColor : this.state.boxColor1},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        this.props.updateSelectedColor(this.state.selectedColor);
    }
    box2(){
        if(this.state.selectedBox == 2){
            this.setState({selectedBox : 0,borderColor2:'gray'});
            this.setState({selectedColor : null},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        else{
            this.setState({selectedBox : 2,
                borderColor1:'gray',borderColor2:'red',borderColor3:'gray',borderColor4:'gray'
            });
            this.setState({selectedColor : this.state.boxColor2},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        this.props.updateSelectedColor(this.state.selectedColor);
    }
    box3(){
        if(this.state.selectedBox == 3){
            console.log('3번 선택 취소')
            this.setState({selectedBox : 0,borderColor3:'gray'});
            this.setState({selectedColor : null},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        else{
            console.log('3번 선택')
            this.setState({selectedBox : 3,
                borderColor1:'gray',borderColor2:'gray',borderColor3:'red',borderColor4:'gray'
            });
            this.setState({selectedColor : this.state.boxColor3},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
        }
        this.props.updateSelectedColor(this.state.selectedColor);
        console.log('light box안에서 바뀐 색상'+this.state.selectedColor)
    }
    box4(){
        if(this.state.selectedBox == 4){
            
            this.setState({selectedBox : 0,borderColor4:'gray'});
            this.setState({selectedColor : null},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor)});
            console.log('4번 선택 취소')
        }
        else{
            //console.log('4번 선택')
            this.setState({selectedBox : 4, 
                borderColor1:'gray',borderColor2:'gray',borderColor3:'gray',borderColor4:'red'
            });
            this.setState({selectedColor : this.state.boxColor4},
                ()=>{this.props.updateSelectedColor(this.state.selectedColor);});
            console.log('4번 선택')
        }
        setTimeout(
            () => {console.log('light box안에서 바뀐 색상'+this.state.selectedColor)}
            , 5000);//5sec
        
    }

    colorChange(){//spuid 눌렀을때, 선택된 상자들의 색깔 바꿔주기
        if(this.state.spuidSelected){
            if(this.state.selectedBox == 1){
                this.setState({boxColor1:this.state.spuidColor})
            }
            else if(this.state.selectedBox == 2){
                this.setState({boxColor2:this.state.spuidColor})
            }
            else if(this.state.selectedBox == 3){
                this.setState({boxColor3:this.state.spuidColor})
            }
            else if(this.state.selectedBox == 4){
                this.setState({boxColor4:this.state.spuidColor})
            }

            this.setState({spuidSelected:false})//스포이드 정보 없애주기
        }   
    }

    pressSpuid(){
        this.setState({spuidSelected:!this.state.spuidSelected});
        console.log('스포이드'+this.state.spuidSelected)
    }

    render(){
        return(
            <View /*조명색 상자*/style={{flexDirection:'row',marginTop:10}}>
                <TouchableOpacity style={[
                    styles.colorBox,{borderColor:this.state.borderColor1,backgroundColor:this.state.boxColor1}]}
                    onPress = { ()=>this.box1()}
                />
                <TouchableOpacity style={[
                    styles.colorBox,{borderColor:this.state.borderColor2,backgroundColor:this.state.boxColor2}]}
                    onPress = { ()=>this.box2()}
                />
                <TouchableOpacity style={[
                    styles.colorBox,{borderColor:this.state.borderColor3,backgroundColor:this.state.boxColor3}]}
                    onPress = { ()=>this.box3()}
                />
                <TouchableOpacity style={[
                    styles.colorBox,{borderColor:this.state.borderColor4,backgroundColor:this.state.boxColor4}]}
                    onPress = { ()=>this.box4()}
                />

                <TouchableOpacity 
                    style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>this.pressSpuid()}
                >
                    <Image
                        style={{width:20,height:20, resizeMode:'contain'}}
                        source={require('../../../assets/img/spoid.png')}
                    />
                </TouchableOpacity>
                <Modal
                    visible={this.state.spuidSelected} 
                    transparent={true}
                    animationType="slide"> 
                    <View style={styles.modalBackground}>
                        <Image
                            style={{marginTop:125, marginLeft:32, width:290, height:175,resizeMode:'contain'}}
                            source={this.props.img}/>
                        <View style={{flexDirection:'row', marginLeft:20,marginTop:10}}>
                            <ColorPanel
                                style={{ width:190,height:250}}
                                fullColor={true}
                                color={this.state.spuidColor}
                                brightnessLowerLimit={0}
                                onColorChange={color => this.setState({ spuidColor: color })}
                            />
                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#FF7E76', borderRadius:3,
                                    marginTop:250, marginLeft:32, width:100,height:30,
                                    alignItems:'center',justifyContent:'center'
                                }}
                                onPress={()=>this.colorChange()}
                            > 
                                <Text style={{color:'white',fontFamily:'NanumSquare_acR', fontSize:16}}>
                                    색 선택 완료
                                </Text>
                            </TouchableOpacity> 
                        </View>
                           
                    </View>
                </Modal>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    colorBox:{
        width:30,
        height:30,
        marginRight:9,
        borderRadius:3,
        borderWidth:1,
    },
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.8)',
        flex:1,
    },
});