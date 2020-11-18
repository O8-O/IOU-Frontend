import React from "react";
import { View, Keyboard,Alert,Text, StyleSheet,TextInput,TouchableOpacity ,Image} from "react-native";
import CheckBox from './CheckBox';
import Network from'../../network/Network';

export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userEmail:"",
            userId:"",
            userPw:"",
            userPwCheck:"",

            acceptableEmail : false,
            acceptableId: false,
            acceptablePw:false,
            acceptablePwc:false,
            checkTerm : false,//약관동의박스
            
            /*아래 안내 문구들 */
            noteEmail:"",
            noteId:"",
            notePw:"",
            notePwCheck:"",

            colorEmail:"#419DFF",//blue
            colorId:"#419DFF",//red
            colorPw:"#419DFF",//blue
            colorPwc:"#419DFF",//red
        };
    }   

    LoginScreen() {
        this.props.navigation.navigate("Login")
    }
    TermScreen() {
        this.props.navigation.navigate("Term")
    }
    
    checkEmail(){
        if(this.state.userEmail.length > 30){
            this.setState({noteEmail:"Email이 너무 깁니다"})
            this.setState({colorEmail:"#F52D2D"})
        }
        else if( (!this.state.userEmail.includes("@"))||
        (!this.state.userEmail.includes(".")) ){
            this.setState({noteEmail:"올바른 Email을 입력해주세요"})
            this.setState({colorEmail:"#F52D2D"})
                    }
        else if(this.state.userEmail.length>0){
            this.setState({noteEmail:"사용가능한 Email입니다"})
            this.setState({colorEmail:"#419DFF"})
            this.setState({acceptableEmail:true})
        }

    }  
    checkId(){
        if(this.state.userId.length > 20){
            this.setState({noteId:"ID가 너무 깁니다"})
            this.setState({colorId:"#F52D2D"})
            this.setState({acceptableId:false})
        }
        else if(this.state.userId.length>0){
            this.setState({noteId:"사용가능한 ID입니다"})
            this.setState({colorId:"#419DFF"})
            this.setState({acceptableId:true})
        }
        else{
            this.setState({noteId:""})
            this.setState({acceptableId:false})
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
        return Network.requireRegister(this.state.userId, this.state.userPw,this.state.userEmail)
            .then(res => res.json())
            .then(res=>{
                if(res.result){
                    console.log('계정생성 성공')
                    this.LoginScreen();
                }
                else
                    console.log('계정생성 실패')
                    console.log(res.result)
            })
            .catch(err=>{
                console.log('계정생성 오류발생함')
                console.log(err)
            })
    }


    SignIn() {
        console.log(this.state.userPw + ' & '+this.state.userPwCheck)
        
        if (!(this.state.acceptableEmail && this.state.acceptableId && 
            this.state.acceptablePw && this.state.acceptablePwc)){
            console.log('올바른 정보를 입력해주세요');
        }
        else if(!this.state.checkTerm){
            alert('약관에 동의해주세요')
        }
        else{
            console.log('정보 입력 성공');
            this.sendUserInfo()
        }
    }
    render(){
    return (
            <View style ={styles.container}>             
                <Text style = {styles.title}>
                    계정 생성
                </Text>          
                
                <View style={{ flex:1, paddingHorizontal:40}}>
                    <Text style={styles.smalltitle}>Email</Text>
                        <View style={styles.textBox}>
                            <TextInput 
                                placeholder="Enter your Email"
                                style={styles.text}
                                onChangeText={(input) => 
                                    this.setState({ userEmail:input },
                                    ()=> this.checkEmail(input))}
                            />    
                        </View> 
                    <Text style={[styles.ckecking,{color:this.state.colorEmail}]}>
                        {this.state.noteEmail}
                    </Text>

                    <Text style={styles.smalltitle}>ID</Text>
                        <View style={styles.textBox}>
                            <TextInput 
                                placeholder="Enter your ID"
                                style={styles.text}
                                onChangeText={(input) => 
                                    this.setState({ userId:input },
                                    ()=> this.checkId(input))}   
                            />    
                        </View>
                    <Text style={[styles.ckecking,{color:this.state.colorId}]}>
                        {this.state.noteId}
                    </Text>

                    <Text style={styles.smalltitle}>Password</Text>
                        <View style={styles.textBox}>
                            <TextInput 
                                placeholder="Enter your Password"
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

                    <Text style={styles.smalltitle}>Retype Password</Text>
                    <View style={styles.textBox}>
                        <TextInput 
                            placeholder="Retype your Password"
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

                    <Text //약관
                        style={{marginTop:12, fontFamily:'NanumSqure_acL', fontSize:11}}>
                        저희는 사용자의 개인정보를 IOU 사용에 필요한 최소한의 개인정보만을 수집합니다.
                        자세한 <Text style={{color:'#FF7E76'}}>IOU</Text>
                        의 개인정보 수집에 관한 약관을 보고 싶으시다면 
                        <TouchableOpacity  
                            onPress={()=>this.TermScreen()}
                            activeOpacity={0.8}
                            style={{height:10,justifyContent:'center'}}
                        >
                            <Text style={{fontSize:11, color:'#419DFF'}}> 여기 </Text>
                        </TouchableOpacity>
                            를 클릭하세요.
                    </Text>
                
                    <CheckBox
                        isChecked={this.state.checkTerm}//props로 CkeckBox의 ischecked로 값 줌.
                        updateLoginChecked={(isChecked) => {/*CheckBox안에 ischecked 값을 checkTerm에도 적용시켜줌*/
                            this.setState({ checkTerm: isChecked })/*isChecked 를 다시 check에 넣어줌*/
                        }}  
                           
                    />
                    <TouchableOpacity  
                        style={styles.signIn}
                        activeOpacity={0.8}
                        onPress={()=>{this.SignIn()}}
                    >
                        <Text  style = {{ fontFamily:'Ubuntu-Medium',fontSize:18, color: "white"}}>SIGN IN</Text>
                    </TouchableOpacity>  
                </View> 
                
            </View>
    ); 
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
