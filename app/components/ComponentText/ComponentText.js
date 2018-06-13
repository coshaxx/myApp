import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, Switch} from 'react-native';

export default class ComponentText extends Component{
    constructor(){
        super();
        this.state = {
            textValue: 'Hello',
            switchValue: false
        }
    }
    changeText(value) {
        console.log("VALUE:", value);
        this.setState({
            textValue: value
        })
    }

    onSubmit(){
        console.log('Input Submited')
    }
    onChangeValue(value){
        this.setState({
            switchValue: value
        })
    }
    render(){
        return (
            <View>
                <Text> ComponentText</Text>
                <TextInput
                    placeholder="Enter Text"
                    value ={this.state.textValue}
                    onChangeText ={ (value) => this.changeText(value)}
                    onSubmitEditing={this.onSubmit}
                />
                <Text> {this.state.textValue}</Text>
                <Switch
                    value={this.state.switchValue}
                    onValueChange ={ (value)=> this.onChangeValue(value)}
                />
            </View>
        )
    }
}

AppRegistry.registerComponent('ComponentText', () => ComponentText);
