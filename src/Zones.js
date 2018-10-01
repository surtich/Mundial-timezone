import React, { Component } from "react";
import { Picker, View } from "react-native";

class Zones extends Component {
  render() {
    const { zones, handleChangeZone } = this.props;
    return (
      <View>
        <Picker onValueChange={handleChangeZone}>
          {zones.map(({ timestamp, zoneName }) => (
            <Picker.Item key={zoneName} label={zoneName} value={zoneName} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default Zones;
