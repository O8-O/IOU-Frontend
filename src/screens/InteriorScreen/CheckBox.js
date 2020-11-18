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
            <View style={{marginTop:5,marginLeft:2,}}>
                <TouchableOpacity style={styles.check}
                    onPress = {()=>{
                        this.setState({ 
                            isChecked: !this.state.isChecked,
                        })
                    }}
                >
                <Image
                    style={{backgroundColor:'white', resizeMode:'contain',width:15,height:15}}
                    source= { getImage(this.state.isChecked) }
                />
                    <Text style = {{ fontFamily:'NanumSquare_acL',fontSize:12, paddingLeft:5, color: "black"}}>
                        조명색 적용하지 않기
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
