import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, ScrollView, ImageStore } from "react-native";
import VoteCommentFeed from './VoteCommentFeed';

export default class VoteDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            voted:false,
            selectedPic:0 // 투표로 선택된 사진 번호
        };
    }

    pressVote(){
        if(selectedPic !=0 ){
            this.setState({voted:true})
            //서버로 번호 결과 전송
        }
        
    }
    /*서버에서 받을 것
       user, userPIcture, title, picture, heartNumber, commentNumber*/
    render(){
        const heartColor = this.state.liked ?  require("../../../../assets/img/heartPink.png") : 
                                               require("../../../../assets/img/heartBlack.png");
        const data = this.props.route.params.data;
        const voteComment = this.state.voted ? '현재 투표수 1위는 : ' :
                                               '투표를 하고 결과를 확인해보세요!' ;
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={styles.post}>
                        <Text style={{marginTop:11,marginBottom:5, fontFamily:'NanumSquare_acB',fontSize:18}}>
                            {data.title}
                        </Text>
                        <View  //사용자 사진/이름/하트/말풍선
                            style={{flexDirection: 'row',alignItems:'center',marginBottom:5}}>
                            <Image 
                                style={{width:18, height:18,resizeMode:'contain'}}
                                source ={require("../../../../assets/img/circleUserIcon.png")}
                            />
                            <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:13}}>
                                {data.user}
                            </Text>

                            <View //하트와 말풍선
                                style={{alignItems:'center',flexDirection: 'row', marginLeft:135, marginVertical:9}}>
                                <TouchableOpacity style={{alignItems:'center'}}
                                    onPress = {()=>{ this.setState({ liked: !this.state.liked})}}
                                >
                                    <Image
                                        style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                                        source={heartColor}
                                    />
                                </TouchableOpacity>
                                <Text style = {[styles.numberFont,{ paddingLeft:5}]}
                                > {data.likeNum}</Text>
                                <Image
                                    style={{ width:18, height:18,resizeMode:'contain',marginLeft:13}}
                                    source={require("../../../../assets/img/talkBubble.png")}
                                />
                                <Text style={[styles.numberFont,{ marginLeft:6}]}>
                                    {data.commentNum}
                                </Text>
                            </View>        
                        </View>
                        <Text //content 내용
                            style={{fontFamily:'Ubuntu-Regular',
                            fontSize:15, marginBottom : 5}}
                            >
                            {data.content}
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
                        <View style={{alignItems:'center', marginTop:10, 
                            marginBottom:15, backgroundColor:'white'}}>
                            <Image
                                    style={{width:290, height:150, resizeMode:'contain'}}
                                    source={require("../../../../assets/img/exInterior.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.commentScreen}>
                        <Text style={styles.comment}>
                            Comment
                        </Text>
                        <VoteCommentFeed/>
                    </View>
                    
                </View>

                <View style ={styles.bottom}>
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
        this.props.navigation.navigate("Main")
    }
    FreeBoard() {
        this.props.navigation.navigate("Free")
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
        //borderWidth: 1, 
        //borderColor: 'white',
        //borderBottomColor:'#EBEAEA',

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
    comment:{
        //marginVertical:10,
        //marginHorizontal:30,
        fontFamily:'Ubuntu-Regular',
        fontSize:15,
        borderWidth:1,
        borderColor:'white',
        borderTopColor:'#EBEAEA',
        paddingVertical:5,
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
        //alignSelf:'center',
        //justifyContent:'center'
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