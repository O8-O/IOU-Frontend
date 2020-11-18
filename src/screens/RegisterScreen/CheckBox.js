import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const getImage = function(isChecked){
    return isChecked ? 
        require("../../../assets/img/checked_box.png") : 
        require("../../../assets/img/unchecked_box.png")
}

export default class CheckBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isChecked: this.props.isChecked
        }  
    }

    componentDidUpdate(prevProp){
        if (prevProp.isChecked != this.props.isChecked){
            this.setState({ isChecked: this.props.isChecked})  
        }
    }

    render(){
        return(
            <View style={{marginTop:15}}>
                <TouchableOpacity style={styles.check}
                    onPress = {()=>{
                        this.setState({ 
                            isChecked: !this.state.isChecked},
                            ()=>this.props.updateLoginChecked(this.state.isChecked)
                        )
                    }}
                >
                <Image
                    style={{backgroundColor:'white', resizeMode:'contain',width:16,height:16}}
                    source= { getImage(this.state.isChecked) }
                />
                    <Text style = {{ fontFamily:'NanumSquare_acR',fontSize:12, paddingLeft:5, color: "black"}}>
                        저는 약관을 확인했고, 약관에 동의합니다.
                    </Text>
                </TouchableOpacity>
            </View>  
        );
    }

}

const styles = StyleSheet.create({
    check:{
        flexDirection: 'row',
        alignItems:'center',
    },

});
