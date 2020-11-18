import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const getImage = function(isChecked){
    return isChecked ? 
        require("../../../../assets/img/handBlue.png") : 
        require("../../../../assets/img/hand.png")
}

export default class HandCheckBox extends React.Component{
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
            <View style={{marginTop:5,marginRight:10}}>
                <TouchableOpacity style={styles.check}
                    onPress = {()=>{
                        this.setState({ 
                            isChecked: !this.state.isChecked,
                        })
                    }}
                >
                <Image
                    style={{backgroundColor:'white', resizeMode:'contain',width:30,height:30}}
                    source= { getImage(this.state.isChecked) }
                />
                </TouchableOpacity>
            </View>  
        );
    }

}

const styles = StyleSheet.create({
    check:{
        flexDirection: 'row',
        alignItems:'center',
        width:25,
        height:25
    },

});
