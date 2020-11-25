import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

/*로그인 및 계정관리 */
import Login from '../screens/LoginScreen/Login';
import Register from '../screens/RegisterScreen/Register';
import Term from '../screens/RegisterScreen/Term';

/*프로필*/
import Profile from '../screens/ProfileScreen/Profile';
import Preference from '../screens/ProfileScreen/Preference';
import SelectedPic from '../screens/ProfileScreen/SelectedPic';
import ChangePw from '../screens/ProfileScreen/ChangePw';


/*메인게시판 */
import MainBoard from '../screens/MainScreen/MainBoard';
import MainPostDetail from '../screens/MainScreen/MainPostDetail';

/*자유게시판*/
import FreeBoard from '../screens/SnsScreen/FreeBoard/FreeBoard';
import PostDetail from '../screens/SnsScreen/FreeBoard/PostDetail';
//import Posting from '../screens/SnsScreen/FreeBoard/Posting';
//import PostFeed from '../screens/SnsScreen/FreeBoard/PostFeed';
import Write from '../screens/SnsScreen/FreeBoard/Write';

/*투표 게시판*/
import VoteBoard from '../screens/SnsScreen/VoteBoard/VoteBoard';
import VotePostDetail from '../screens/SnsScreen/VoteBoard/VotePostDetail';
import VoteWrite from '../screens/SnsScreen/VoteBoard/VoteWrite';

/*사진 편집 */
import UploadPic from '../screens/InteriorScreen/UploadPic';
import SelectStyle from '../screens/InteriorScreen/SelectStyle';
import RecommendPic from '../screens/FixingPicScreen/RecommendPic';
import AdjustPic from '../screens/FixingPicScreen/AdjustPic';





  const Stack = createStackNavigator();
  
  export default class AppStack extends React.Component{
    render(){
        return (
                <Stack.Navigator initialRouteName="Login">    
                                  
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                    <Stack.Screen name="Term" component={Term} options={{headerShown: false}}/>

                    <Stack.Screen name="MainBoard" component={MainBoard} options={{headerShown: false}}/>
                    <Stack.Screen name="MainPostDetail" component={MainPostDetail} options={{headerShown: false}}/>

                    <Stack.Screen name="UploadPic" component={UploadPic} options={{headerShown: false}}/>
                    <Stack.Screen name="SelectStyle" component={SelectStyle} options={{headerShown: false}}/>
                    <Stack.Screen name="RecommendPic" component={RecommendPic} options={{headerShown: false}}/>
                    <Stack.Screen name="AdjustPic" component={AdjustPic} options={{headerShown: false}}/>
                    
                    <Stack.Screen name="FreeBoard" component={FreeBoard} options={{headerShown: false}}/>
                    <Stack.Screen name="PostDetail" component={PostDetail} options={{headerShown: false}}/>
                    <Stack.Screen name="Write" component={Write} options={{headerShown: false}}/>

                    <Stack.Screen name="VoteBoard" component={VoteBoard} options={{ headerShown: false}}/>
                    <Stack.Screen name="VotePostDetail" component={VotePostDetail} options={{headerShown: false}}/>
                    <Stack.Screen name="VoteWrite" component={VoteWrite} options={{headerShown: false}}/>
                    
                    <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
                    <Stack.Screen name="Preference" component={Preference} options={{headerShown: false}}/>
                    <Stack.Screen name="ChangePw" component={ChangePw} options={{headerShown: false}}/>
                    <Stack.Screen name="SelectedPic" component={SelectedPic} options={{headerShown: false}}/>
                    
                </Stack.Navigator>
          );
    } 
  }