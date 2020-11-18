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

    componentDidUpdate(prevProp){//컴포넌트가 리렌더링을 마친 후 실행된다.
        if (prevProp.isChecked != this.props.isChecked){
            this.setState({ isChecked: this.props.isChecked})
        }
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={styles.check}
                    onPress = {()=>{
                        this.setState({ 
                            isChecked: !this.state.isChecked,
                        })
                    }}
                >
                <Image
                    style={{backgroundColor:'white', resizeMode:'contain',marginLeft:10,width:16,height:16}}
                    source= { getImage(this.state.isChecked) }
                />
                    <Text style = {{ fontFamily:'Ubuntu-Light',fontSize:14, paddingLeft:5, color: "#A9A9A9"}}>Remember me</Text>
                </TouchableOpacity>
            </View>  
        );
    }

}

const styles = StyleSheet.create({
    check:{
        marginLeft:30,
        flexDirection: 'row',
        color:'white',
    },

});
