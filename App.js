/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import * as RN from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import CameraView from "./Components/CameraView.js"
import ImageConfirmation from './Components/ImageConfirmation'
import {
  ImagePicker,
  Permissions
} from 'react-native-unimodules'

class HomeScreen extends React.Component {

  state = {
    image: null,
    status: false
  };

  _pickImage = async () => {
    try {
      console.log('SANITY')
      const status = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: "Images",
        base64: true
      });

      // console.log(result);

      if (!result.cancelled) {
        this.setState({
          image: result
        });
        this.props.navigation.navigate("ImageConfirmation", { image: this.state.image })
      }
    } catch (err) {
      console.log(err)
    }
  };



  render() {
    return (
      <RN.View style={styles.container}>
        <RN.Text>Colors of the World</RN.Text>
        <RN.Button onPress={() => this.props.navigation.navigate('CameraView')} title="Take a Photo"></RN.Button>
        <RN.Button onPress={this._pickImage} title="Pick Image from Camera Roll"></RN.Button>
      </RN.View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CameraView: CameraView,
    ImageConfirmation, ImageConfirmation
  }, {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

