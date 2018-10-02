import React, { Component } from "react";
import { Picker, View } from "react-native";

import { SelectedZoneContext } from "./Context";

class Zones extends Component {
  render() {
    const { zones, handleChangeZone } = this.props;
    return (
      <SelectedZoneContext.Consumer>
        {selectedZone => (
          <View>
            <Picker
              onValueChange={handleChangeZone}
              selectedValue={selectedZone && selectedZone.zoneName}
            >
              {zones.map(({ timestamp, zoneName }) => (
                <Picker.Item key={zoneName} label={zoneName} value={zoneName} />
              ))}
            </Picker>
          </View>
        )}
      </SelectedZoneContext.Consumer>
    );
  }
}

export default Zones;
