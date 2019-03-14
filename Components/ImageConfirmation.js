import React from "react";
import { Text, View, Button, Image } from "react-native";
import axios from "axios";
  import {
    getAllSwatches
  } from 'react-native-palette';
export default class ImageConfirmation extends React.Component {
  state = {
    image: ""
  };

  getPalette = async () => {
    try {
      let image =
        this.props.navigation.getParam("photo") ||
        this.props.navigation.getParam("image");

      getAllSwatches(image.uri, (error, swatches) => {
         if (error) {
           console.log(error);
         } else {
          //  swatches.sort((a, b) => {
          //    return b.population - a.population;
          //  });
           swatches.forEach((swatch) => {
             console.log(swatch.swatchInfo);
           });
         }
      })


    } catch (err) {
      console.log(err);
    }
  };

  pickerCallback = message => {
      if (message && message.nativeEvent && message.nativeEvent.data) {
        console.log(message.nativeEvent.data); // response from ImageColorPicker
      }}

  render() {
    let photo =
      this.props.navigation.getParam("photo") ||
      this.props.navigation.getParam("image");
    // console.log(photo)
    return (
      <View>
        <Image
          source={{
            uri: photo.uri
          }}
          style={{
            height: 200,
            width: 200
          }}
        />



        <Button onPress={this.getPalette}>
          <Text> Get Palette </Text>
        </Button>
      </View>
    );
  }
}
