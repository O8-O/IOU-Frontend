import React, { Component } from "react";
import { View, Keyboard,Text, StyleSheet,TextInput, TouchableWithoutFeedback,TouchableOpacity ,Image, KeyboardAvoidingView, BackHandler} from "react-native";
import CheckBox from './CheckBox';
import Network from'../../network/Network';

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId:"",
            userPw:"",
            checkRemember : false 
        };
    }

    checkpreferenceDone(){//선호도 조사를 했는지 안했는지에 따라 다른화면으로 가기
        return Network.loadUserPreference(this.state.userId)
            .then(res=>res.json())
            .then(resp=>{
                console.log('선호도 조사 했는지 안했는지 테스트')
                console.log(resp)
                if(!resp.result){// 선호도 조사한 적이 없다면
                    this.PreferenceScreen()
                }
                else{//아니라면 선호도 조사창으로 간다.
                    this.FreeBoard()
                }
            })
    }

    pressLogin(){
        console.log('아이디 : '+this.state.userId+'패스워드:'+this.state.userPw)
        return Network.prepareLogin(this.state.userId,this.state.userPw)
            .then(res=>res.json())
            .then(resp=>{
                if(resp.result){
                    console.log('로그인 성공')
                    this.checkpreferenceDone()    
                }
                else{
                    alert(resp.msg)
                    console.log(resp)
                }
            })
            .catch(error => {
                alert('로그인 error')
                console.log(error)
            })
    }

    render(){
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style ={styles.container}>
                <View style={styles.top}>
                    <Text style = {styles.title}>
                        Interior<Text style = {{color:'#FF7E76'}}> O</Text>n You
                    </Text>
                    <Text style = {{fontFamily:'Ubuntu-Light',fontSize:15,color: "#A9A9A9"}}>
                        World first interior design for you
                    </Text>
                </View>       
                <View style={{ flex:1, paddingTop:30}}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.textBox}>
                                <Image style={{resizeMode:'contain',marginLeft:10 }}
                                source={require("../../../assets/img/UserIcon.png")}
                                />
                                <TextInput 
                                    placeholder="ID"
                                    style={styles.text}
                                    onChangeText={(userId)=>this.setState({userId})}
                                />    
                            </View>
                            <View style={[styles.textBox,{marginTop:10}]}>
                                <Image 
                                style={{resizeMode:'contain',marginLeft:10,width:24,height:24}}
                                source={require("../../../assets/img/lock.png")}
                                />
                                <TextInput 
                                    placeholder="PW"
                                    secureTextEntry={true}
                                    style={styles.text}
                                    onChangeText={(userPw)=>this.setState({userPw})}
                                />
                            </View> 
                        </View>
                </View>
                
                <View style={styles.bottom}>
                    <View style={{height:65, alignItems: 'center'}}>
                        <TouchableOpacity  
                            style={styles.button}activeOpacity={0.8}
                            onPress={()=>this.pressLogin()}//AdjustPicScreen()}//
                        >
                            <Text  style = {{ fontFamily:'Ubuntu-Medium',fontSize:18, color: "white"}}>
                                LOG IN
                            </Text>
                        </TouchableOpacity>
                    </View>    
                    <View style ={styles.createForgot}>
                        <TouchableOpacity  
                            onPress={()=>this.RegisterScreen()}
                            style={styles.textButton1}activeOpacity={0.8}
                        >
                            <Text 
                                style = {{color:'#A9A9A9',fontFamily:'Ubuntu-Medium'}}
                            >createAccount</Text>
                        </TouchableOpacity>
                            <TouchableOpacity  
                                style={styles.textButton2}activeOpacity={0.8}
                                onPress={()=>this.ProfileScreen()}//AdjustPicScreen()}//>
                                >
                                <Text style = {{color:'#A9A9A9',fontFamily:'Ubuntu-Light'}}>
                                    Forgot Someting?
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ); 
    }
    RegisterScreen() {
        this.props.navigation.navigate("Register")
    }
    MainScreen(){
        this.props.navigation.navigate("MainBoard")
    }
    FreeBoard() {
        this.props.navigation.navigate("FreeBoard")
    }
    PreferenceScreen(){
        this.props.navigation.navigate("Preference")
    }
    ProfileScreen(){
        this.props.navigation.navigate("Profile")
    }
}



const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'white'
    },
    /*Top--------------------------- */
    top:{
        flex:1,
        justifyContent: 'center',//세로 가운데 맞춤
        alignItems: 'center',//가로 가운데 맞춤
        backgroundColor:"white",
    },
    title:{
        marginTop:60,//제목 위치 위아래 조절
        fontSize:43,
        color: "black",
        fontFamily:'Ubuntu-Medium',
    },

    /* -mid--------------------------- */
    rememberMe:{
        flex:1,
        flexDirection: 'row',//옆으로 붙이는거
        paddingLeft:60,
    },
    textBox:{
        flexDirection: "row",
        alignItems: 'center',
        borderColor: 'white',
        backgroundColor:'white',
        width:300,
        height:50,
        borderWidth: 1,
        borderRadius: 5,
        margin:9, 
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 14,
        elevation: 7,
    },
    text:{
        paddingLeft:10,
        fontSize:14,
        width:240,
    },
/* -bot--------------------------- */
    bottom:{
        flex:1,
    },
    button: {
        width:300,
        height:40,
        borderWidth: 1,
        borderColor:'#FF7E76',
        borderRadius: 5,
        margin:16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7E76',
        shadowColor: '#000',//shadow 는 ios에서 사용됨 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 6,//이건 안드로이드 그림자
    },
    textButton1: {
        flex: 1,
        justifyContent: 'center',
    },
    textButton2: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"flex-end",
    },
    createForgot:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:35,
        fontSize:14,
        backgroundColor:'white',
    },

    proceed:{
        flex:1,
        paddingBottom:15,
        justifyContent:'flex-end', 
        alignItems:'flex-end',
        flexDirection:'row',
    },
});
