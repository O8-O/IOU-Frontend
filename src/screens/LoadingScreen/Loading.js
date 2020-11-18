import React from 'react'
import { View,  Text, StyleSheet} from 'react-native';

export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          timePassed: false
        };
      }
    
    render(){
        setTimeout(function(){()=>  {this.props.navigation.navigate("Login") }  }, 1000);
        if (!this.state.timePassed){
            return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style = {{fontFamily:'Ubuntu-Medium',fontSize:40}}>
                    Interior <Text style = {{color:'#FF7E76'}}> O</Text>n You
                </Text>
                
            </View>
            );
        }
        else{
            return (()=>{this.props.navigation.navigate("Login")});
        }
    }
}