import React from "react";
import {View,StyleSheet,Text,Image,TouchableOpacity, Modal,TouchableWithoutFeedback } from "react-native";
import {Keyboard} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import Network from "../../../network/Network";

import CommentFeed from './CommentFeed';


export default class PostDetail extends React.Component{
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
            id:null,
        };
    }


    pictureSpace(image){
        if((image == null)){
            console.log('detail 에서 그릴 data.contentImage 는 없다')
            return <View style={{height:20}}/>
        }
        else{
            console.log('detail 에서 그릴 data.contentImage 는')
            console.log(image)
            return(
                image.map(img=>(
                    <View style={styles.pictureBoarder}
                        key={img.uri} >
                        <Image
                            style={{width:312, height:170 /*resizeMode:'contain'*/}}
                            source={img}
                        />
                        <TouchableOpacity //사진 돋보기 기능
                            onPress={()=>this.setState({closeUp: true,closeUpImage:img})}
                            style={styles.closeUp}
                        >
                            <Image
                                style={{width:18,height:18, resizeMode:'contain'}}
                                source= {require("../../../../assets/img/closeUp.png")}
                            />
                        </TouchableOpacity>
                    </View>     
                ))          
            )
        }
    }

    callDelete(){
        console.log('callDelete 의 지우는 권한')
        console.log(this.state.id + this.state.data.writer)
        return Network.deleteFreeBoard(this.state.id,this.state.data.postNum)
        .then(res=>res.json())
        .then((resp)=>{
            console.log('deleteFreeBoard 응답 성공은 : ')
            console.log(resp.result)
            if(resp.result){
                //this.props.callGetComment()
            }
        
        })
        .catch((err)=>{
            console.log("deleteFreeBoard 에러!!");
            console.log(err);
        })
    }
    deleteButton(){
        console.log('지우는 권한')
        console.log(this.state.id + this.state.data.writer)
        if(this.state.id == this.state.data.writer){
            return(
                <TouchableOpacity
                    style={{width:20,alignItems:'center',alignSelf:'flex-end',backgroundColor:'white'}}
                    onPress={()=>this.callDelete()}>
                    <Text style={{color:'#FF7E76'}}>
                        X
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    showModal(){
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
                            source= {this.state.closeUpImage}
                        />
                    </View>  
                </TouchableOpacity>                   
            </Modal>
        )
    }

    pressLikeButton(){
        console.log('버튼 누르기 전 like의 상태는 '+ this.state.liked)
        this.setState({ liked: !this.state.liked},
            ()=>{this.likeChangeToServer()})   
    }
    likeChangeToServer(){
        if(this.state.liked){
            return Network.increaseFreeLike(this.state.data.postNum)
            .then((response) => response.json())
            .then((resp)=>{
                console.log('press free LikeButton 실행 성공결과는 : ')
                console.log(resp.result)
            })
            .catch((err)=>{
                console.log("press FreeLike 에러!!");
                console.log(err);
            })
        }
        else{
            return Network.decreaseFreeLike(this.state.data.postNum)
            .then((response) => response.json())
            .then((resp)=>{
                console.log('decreaseFreeLike 실행 성공결과는 : ')
                console.log(resp.result)
            })
            .catch((err)=>{
                console.log("decreaseFreeLike 에러!!");
                console.log(err);
            })
        }
    }
    checkLiked(){
        return Network.checkFreeLiked(this.state.data.postNum)
        .then((response) => response.json())
        .then((res)=>{
            console.log("checkVoteLiked 성공")
            console.log(res.result)
            this.setState({liked: res.result});
        })
        .catch(err=>{
            console.log("checkVoteLiked 에러났엉")
            console.log(err)
        })
    }
    componentDidMount(){
        this.checkLiked();
        this.setState({id: Network.getNetworkId()})
    }
    render(){
        const heartColor = this.state.liked ?  require("../../../../assets/img/heartPink.png") : 
                                               require("../../../../assets/img/heartBlack.png");
        const data = this.props.route.params.data;
        const image = this.props.route.params.img;
        
        return(          
            <View style={styles.container}>
                <View style={{flex:1}}>
                    
                    <View style={styles.post}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{marginTop:11,marginBottom:0, fontFamily:'NanumSquare_acB',fontSize:18}}>
                                {data.title}
                            </Text>
                            {this.deleteButton()}
                        </View>
                        
                        <View
                            style={styles.infoContainer}>
                            <View //사용자 사진/이름
                            style={{flexDirection: 'row',alignItems:'center',}}
                            >
                                <Image 
                                    style={{width:18, height:18,resizeMode:'contain'}}
                                    source ={require("../../../../assets/img/circleUserIcon.png")}
                                />
                                <Text style={{paddingLeft:5,fontFamily:'Ubuntu-Light',fontSize:13}}>
                                    {data.writer}
                                </Text>
                            </View>
                            
                            <View //하트와 말풍선
                                style={{alignItems:'center',flexDirection: 'row'}}>
                                <TouchableOpacity style={{alignItems:'center'}}
                                    onPress = {()=>{ this.pressLikeButton()}}
                                >
                                    <Image
                                        style={{ width:18, height:18,resizeMode:'contain',marginBottom:1}}
                                        source={heartColor}
                                    />
                                </TouchableOpacity>
                                <Text style = {[styles.numberFont,{ paddingLeft:5}]}
                                > {this.state.data.recommend}</Text>
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
                        </View>
                        </TouchableWithoutFeedback>
                        <ScrollView horizontal={true}>
                            <View style={{flexDirection:'row'}}>
                                {this.pictureSpace(image)}
                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={styles.commentScreen}>
                        <CommentFeed
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
    infoContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:30,
        borderWidth:2,borderColor:'white', 
        borderBottomColor:'#E8E8E8',width:'100%'
    },
    post:{
        //flex: 1,
        marginTop:5,
        marginHorizontal:6,
        paddingHorizontal:30,
        paddingTop:12,
        backgroundColor:'white',
    },
    pictureBoarder:{
        alignItems:'center',
        marginTop:10,
        width:314,
        height:170,
        marginBottom:15, 
        marginHorizontal:2,
        //backgroundColor:'white'
    },
    closeUp:{ // 확대 버튼
        width:20,height:20,
        position: 'absolute', alignItems:'center',
        justifyContent:'center', 
        backgroundColor: 'white', 
        right:8, bottom:3
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