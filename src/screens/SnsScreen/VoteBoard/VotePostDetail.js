import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, Modal,TouchableWithoutFeedback } from "react-native";
import {Keyboard} from 'react-native'
import VoteCommentFeed from './VoteCommentFeed';


export default class VotePostDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title: '나는 제목이야',
            liked:false,
            commentNum:null,
            recommend:0,
            data : this.props.route.params.data,
            closeUp:false,
            closeUpImage:null,
        };
    }
    /*서버에서 받을 것
       user, userPIcture, title, picture, heartNumber, commentNumber*/
    pictureSpace(image){
        if((image == null)){
            console.log('detail 에서 그릴 data.contentImage 는 없다')
            return <View style={{height:20}}/>
        }
        else{
            console.log('detail 에서 그릴 data.contentImage 는')
            return(
                <View style={{alignItems:'center', marginTop:10, width:'100%',height:170,
                    marginBottom:15, backgroundColor:'white'}}>
                    <Image
                        style={{width:310, height:170 /*resizeMode:'contain'*/}}
                        source={{uri : image}}
                    />
                    <TouchableOpacity //사진 돋보기 기능
                        onPress={()=>this.setState({closeUp: true,closeUpImage:image})}
                        style={styles.closeUp}
                    >
                        <Image
                            style={{width:18,height:18, resizeMode:'contain'}}
                            source= {require("../../../../assets/img/closeUp.png")}
                            //source= {require("../../../"
                        />
                    </TouchableOpacity>
                </View>

                
            )
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
                            source= {{uri:this.state.closeUpImage}}
                        />
                    </View>  
                </TouchableOpacity>                   
            </Modal>
        )
    }

    render(){
        const heartColor = this.state.liked ?  require("../../../../assets/img/heartPink.png") : 
                                               require("../../../../assets/img/heartBlack.png");
        const data = this.props.route.params.data;
        const image = this.props.route.params.img;
        const voteComment = this.state.voted ? '현재 투표수 1위는 : ' :
                                               '투표를 하고 결과를 확인해보세요!' ;
        return(          
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.post}>
                        <Text style={{marginTop:11,marginBottom:0, fontFamily:'NanumSquare_acB',fontSize:18}}>
                            {data.title}
                        </Text>
                        <View  //사용자 사진/이름/하트/말풍선
                            style={{flexDirection: 'row',alignItems:'center',marginBottom:5,height:30,
                                borderWidth:2,borderColor:'white', borderBottomColor:'#E8E8E8',width:'100%'}}>
                            <Image 
                                style={{width:18, height:18,resizeMode:'contain'}}
                                source ={require("../../../../assets/img/circleUserIcon.png")}
                            />
                            <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:13}}>
                                {data.writer}
                            </Text>

                            <View //하트와 말풍선
                                style={{alignItems:'center',flexDirection: 'row', marginLeft:155, marginVertical:9}}>
                                <TouchableOpacity style={{alignItems:'center'}}
                                    onPress = {()=>{ this.setState({ liked: !this.state.liked})}}
                                >
                                    <Image
                                        style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                                        source={heartColor}
                                    />
                                </TouchableOpacity>
                                <Text style = {[styles.numberFont,{ paddingLeft:5}]}
                                > {this.state.recommend}</Text>
                                <Image
                                    style={{ width:18, height:18,resizeMode:'contain',marginLeft:13}}
                                    source={require("../../../../assets/img/talkBubble.png")}
                                />
                                <Text style={[styles.numberFont,{ marginLeft:6}]}>{this.state.commentNum}</Text>
                            </View>        
                        </View>
                        <Text //content 내용
                            style={{fontFamily:'Ubuntu-Regular',
                            fontSize:15, marginBottom : 5,marginTop:5}}
                            >
                            {data.contentText}
                        </Text>
                        <View style={styles.votingMessage}>
                            <Text>
                                {voteComment} 
                            </Text>
                            <TouchableOpacity 
                                onPress={()=>this.pressVote()}>
                                <Text>
                                    결정하기 
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {this.pictureSpace(image)}
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.commentScreen}>
                        <VoteCommentFeed
                            data={data}
                            getCommentNum={(num)=>{this.setState({commentNum:num})}}
                        />  
                    </View>
                    
                    
                </View>
                {this.showModal()}
                <View style ={styles.bottom}>
                    <View style = {styles.shadow}></View>
                   <View style ={styles.bottomBar}>
                       <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.MainScreen()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/homeBlack.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            onPress={()=>this.FreeBoard()}>
                           <Image 
                           style={{width:30, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/snsButtonPink.png") }/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.InteriorScreen()}>
                           <Image 
                           style={{width:45, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/interior.png") }/>
                        </TouchableOpacity >
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            onPress={()=>this.ProfileScreen()}>
                           <Image 
                           style={{width:40, height:32,resizeMode:'contain'}}
                           source= { require("../../../../assets/img/profile.png") }/>
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

    container:{
        flex: 1,
        backgroundColor:'#EBEBEB',
    },
    post:{
        //flex: 1,
        marginTop:5,
        marginHorizontal:6,
        paddingHorizontal:30,
        paddingTop:12,
        backgroundColor:'white',
    },
    closeUp:{ // 확대 버튼
        width:20,height:20,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:8, bottom:3
    },
    votingMessage:{
        paddingHorizontal:10,
        marginVertical:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:'black' ,  
        flexDirection:'row',
        alignItems:'center',
        height:40,
        width:'100%',
        justifyContent:"space-between",  
    },
    commentScreen:{
        flex: 1,
        marginHorizontal:5,
        paddingHorizontal:30,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        //borderTopColor:'#EBEAEA'
    },
    numberFont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:12, 
        color: '#191919',
        marginBottom:2,
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
        //elevation: 200,//이건 안드로이드 그림자
    },
});