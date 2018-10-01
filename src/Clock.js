import React, { Component } from "react";
import { Text, View } from "react-native";

class Clock extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { timestamp } = this.props;
    return (
      <View>
        <Text>{new Date(timestamp).toLocaleTimeString()}</Text>
      </View>
    );
  }
}

export default Clock;
