import React from "react";
import { View, Keyboard,Alert,Text, StyleSheet,TextInput,TouchableWithoutFeedback,TouchableOpacity} from "react-native";
import Network from'../../network/Network';

export default class ChangePw extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userEmail:"",
            userPw:"",
            userPwCheck:"",

            //acceptableEmail : false,
            acceptablePw:false,
            acceptablePwc:false,
            /*아래 안내 문구들 */
           // noteEmail:"",
            notePw:"",
            notePwCheck:"",

            //colorEmail:"#419DFF",//blue
            colorPw:"#419DFF",//blue
            colorPwc:"#419DFF",
        };
    }   

    
    checkEmail(){
        if(this.state.userEmail.length > 30){
            this.setState({noteEmail:"Email이 너무 깁니다"})
            this.setState({colorEmail:"#F52D2D"})
        }
        else if(this.state.userEmail.length>0){
            this.setState({noteEmail:"사용가능한 Email입니다"})
            this.setState({colorEmail:"#419DFF"})
            this.setState({acceptableEmail:true})

        }
    }  
    checkPw(){
        if(this.state.userPw.length > 20){
            this.setState({notePw:"비밀번호가 너무 깁니다"})
            this.setState({colorPw:"#F52D2D"})
            this.setState({acceptablePw:false})
        }
        else if(this.state.userPw.length>=0){
            this.setState({notePw:"사용가능한 비밀번호입니다"})
            this.setState({colorPw:"#419DFF"})
            this.setState({acceptablePw:true})
            this.checkPwC(this.state.userPwCheck)
        }
        else{
            this.setState({notePw:""})
            this.setState({acceptablePw:false})
        }
    }
    checkPwC(){
        if(this.state.userPwCheck != this.state.userPw){
            this.setState({notePwCheck:"비밀번호가 다르게 입력되었습니다"})
            this.setState({colorPwc:"#F52D2D"})
        }
        else if(this.state.userPwCheck == this.state.userPw){
            this.setState({notePwCheck:"비밀번호가 일치합니다"})
            this.setState({colorPwc:"#419DFF"})
            this.setState({acceptablePwc:true})
        }
    }
    sendUserInfo(){
        return Network.requirePwChange(this.state.userEmail,this.state.userPw)
            .then(res => res.json())
            .then(res=>{
                if(res.result){
                    console.log('비번 변경 성공');
                    this.ProfileScreen();
                }
                else{
                    Alert.alert("",'입력한 이메일이 다릅니다', );
                    console.log('비번 변경 실패');
                    console.log(res.result);
                }
                
            })
            .catch(err=>{
                console.log('비번 변경 오류발생함')
                console.log(err)
            })
    }


    ChangeButton() {
        console.log(this.state.userPw + ' & '+this.state.userPwCheck)
        
        if (!(this.state.acceptablePw && this.state.acceptablePwc)){
            console.log('올바른 정보를 입력해주세요');
        }
        else{
            console.log('정보 입력 성공');
            this.sendUserInfo()
        }
    }
    render(){
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style ={styles.container}>             
                <Text style = {styles.title}>
                    비밀번호 변경
                </Text>          
                
                <View style={{ flex:1, paddingHorizontal:40}}>
                    <Text style={styles.smalltitle}>Email</Text>
                        <View style={styles.textBox}>
                            <TextInput 
                                placeholder="회원가입 시 입력했던 Email을 입력해주세요"
                                style={styles.text}
                                onChangeText={(input) => 
                                    this.setState({ userEmail:input },
                                    ()=> this.checkEmail(input))}
                            />    
                        </View> 
                    <View style={{marginBottom:30}}>
                    </View>

                    <Text style={styles.smalltitle}>New Password</Text>
                        <View style={styles.textBox}>
                            <TextInput 
                                placeholder="변경할 비밀번호를 입력해주세요"
                                style={styles.text}
                                secureTextEntry={true}
                                onChangeText={(input) => 
                                    this.setState({ userPw:input },
                                    ()=> this.checkPw(input))}
                            />    
                        </View>
                    <Text style={[styles.ckecking,{color:this.state.colorPw}]}>
                        {this.state.notePw}
                    </Text>

                    <Text style={styles.smalltitle}>Retype New Password</Text>
                    <View style={styles.textBox}>
                        <TextInput 
                            placeholder="변경할 비밀번호를 입력해주세요"
                            style={styles.text}
                            secureTextEntry={true}
                            onChangeText={(input) => 
                                this.setState({ userPwCheck:input },
                                ()=> this.checkPwC(input))}
                        />    
                    </View>
                    <Text style={[styles.ckecking,{color:this.state.colorPwc}]}>
                        {this.state.notePwCheck}
                    </Text>
                
                    <TouchableOpacity  
                        style={styles.signIn}
                        activeOpacity={0.8}
                        onPress={()=>{this.ChangeButton()}}
                    >
                        <Text  style = {{ fontFamily:'Ubuntu-Medium',fontSize:18, color: "white"}}>
                            Change Password
                        </Text>
                    </TouchableOpacity>  
                </View> 
                
            </View>
        </TouchableWithoutFeedback>
    ); 
    }
    ProfileScreen() {
        this.props.navigation.navigate("Profile")
    }
}



const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'white'
    },
    /* -Top--------------------------- */
    title:{//제목 위치 위아래 조절
        marginTop:60,
        marginBottom:50,
        fontSize:37,
        color: "black",
        alignSelf:'center',
        fontFamily:'NanumSquare_acB',
    },

    /* -mid--------------------------- */
    smalltitle:{
        color:'#6B6565',
        fontSize:20,
        fontFamily:'Ubuntu_Light',
    },
    textBox:{
        flexDirection: "row",
        marginTop:3,
        //width:280,
        borderColor: 'white',
        borderWidth: 1, 
        borderBottomColor:'#A9A9A9',
        fontSize:16,
    },
    text:{
        flex:1,
        backgroundColor:'white',
        paddingVertical: 0,//default로 textbox에 padding있는것 없애기.
        fontFamily:'Ubuntu_Regular',
        fontSize:16,
    },
    ckecking:{
        //paddingVertical: 0,//default로 textbox에 padding있는것 없애기.
        fontFamily:'NanumSquare_acL',
        fontSize:14,
        height:15,
        marginTop:5,
        marginBottom:10,
    },
    blue:{
        marginVertical:3,
        color:'#419DFF',
        fontSize:11,
        fontFamily:'NanumSquare_acL',
    },
    red:{
        marginVertical:3,
        color:'#F52D2D',
        fontSize:11,
        fontFamily:'NanumSquare_acL',
    },
    rememberMe:{
        flex:1,
        flexDirection: 'row',//옆으로 붙이는거
        paddingLeft:60,
    },
    
/* -bot--------------------------- */
    signIn: {
        width:276,
        height:40,
        borderRadius: 5,
        marginTop:25,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7E76',
        elevation: 5,//이건 안드로이드 그림자
    },

    proceed:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:10,
        marginBottom:5, 
    },
});
