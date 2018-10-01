import React, { Component } from "react";
import { Text, View } from "react-native";

import { key } from "./secrets";

const endPoint = `http://api.timezonedb.com/v2.1/list-time-zone?key=${key}&format=json`;

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount", endPoint);
  }
  render() {
    console.log("render");
    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}

export default App;
