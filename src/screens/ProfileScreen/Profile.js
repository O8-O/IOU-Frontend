//이거 지워도 됨.
import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity } from "react-native";
import Network from "../../network/Network";


export default class Pictures extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:"",
        }
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
                <View style={{flex:1, backgroundColor:'white', paddingHorizontal:30}}>
                    <Text style = {styles.title}>
                        <Text style = {{color:'#FF7E76'}}> M</Text>y Page
                    </Text>
                    <View //사용자 + 사진 
                        style={{flexDirection: 'row',alignItems:'center'}}>
                        <Image
                            style={{width:30, height:30,resizeMode:'contain'}}
                            source ={require("../../../assets/img/circleUserIcon.png")}
                        />
                        <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Light',fontSize:20}}>
                            {this.state.id}
                        </Text>
                    </View>
                    <View style={{ marginTop:30, borderWidth:1, borderColor:'white',borderTopColor:'#A9A9A9'}}>
                        <TouchableOpacity
                            style={{borderWidth:1, borderColor:'white',borderBottomColor:'#A9A9A9'}}
                            onPress={()=>this.MyFreeBoardScreen()}
                            >
                            <Text style={styles.font}>
                                내가 쓴 글 확인
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{borderWidth:1, borderColor:'white',borderBottomColor:'#A9A9A9'}}
                            onPress={()=>this.PreferenceScreen()}
                            >
                            <Text style={styles.font}>
                                선호 이미지 다시 검사하기
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{borderWidth:1, borderColor:'white',borderBottomColor:'#A9A9A9'}}
                            onPress={()=>this.SelectedPicScreen()}
                            >
                            <Text style={styles.font}>
                                내가 고른 선호이미지 보기
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{borderWidth:1, borderColor:'white',borderBottomColor:'#A9A9A9'}}
                            onPress={()=>this.ChangePwScreen()}
                            >
                            <Text style={styles.font}>
                                비밀번호 변경
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
    MyFreeBoardScreen() {
        this.props.navigation.navigate("MyFreeBoard")
    }
    PreferenceScreen() {
        this.props.navigation.navigate("Preference")
    }
    ChangePwScreen(){
        this.props.navigation.navigate("ChangePw")
    }
    SelectedPicScreen(){
        this.props.navigation.navigate("SelectedPic")
    }
}

const styles = StyleSheet.create({
    title:{
        marginVertical:50,//제목 위치 위아래 조절
        fontSize:35,
        color: "black",
        fontFamily:'Ubuntu-Medium',
        alignSelf:'center'
    },
    font:{
        fontFamily:'NanumSquare_acR',
        marginVertical:20,
    },
    //
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

})