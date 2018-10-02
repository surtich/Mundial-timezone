import React, { Component } from "react";
import { Picker, View } from "react-native";

import { SelectedZoneContext } from "./Context";

class Zones extends Component {
  render() {
    const { zones, selectedZone, handleChangeZone, disabled } = this.props;
    return (
      <View>
        <Picker
          disabled={disabled}
          onValueChange={handleChangeZone}
          selectedValue={selectedZone && selectedZone.zoneName}
        >
          {zones.map(({ timestamp, zoneName }) => (
            <Picker.Item key={zoneName} label={zoneName} value={zoneName} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default props => (
  <SelectedZoneContext.Consumer>
    {selectedZone => <Zones {...props} selectedZone={selectedZone} />}
  </SelectedZoneContext.Consumer>
);
