import React, { Component } from "react";
import { Text, View } from "react-native";

import { key } from "./secrets";
import Clock from "./Clock";
import Zones from "./Zones";

const endpoint = `https://api.timezonedb.com/v2.1/list-time-zone?key=${key}&format=json`;

const getRealTmestamp = zone => (zone.timestamp - zone.gmtOffset) * 1000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      zones: [],
      selectedZone: null
    };
  }

  handleChangeZoneName = (zoneName, index) => {
    const { zones } = this.state;
    this.setState({
      selectedZone: zones[index]
    });
  };

  componentDidMount() {
    fetch(endpoint)
      .then(response => response.json())
      .then(({ zones }) => {
        const sortedZones = zones.sort((zoneA, zoneB) =>
          zoneA.zoneName.localeCompare(zoneB.zoneName)
        );
        this.setState({
          zones: sortedZones,
          selectedZone: sortedZones[0] || null,
          loading: false
        });
      })
      .catch(err => console.log("Error", err));
  }

  render() {
    const { loading, selectedZone, zones } = this.state;
    if (loading) {
      return <Text>loading...</Text>;
    }
    return (
      <View>
        <Zones zones={zones} handleChangeZone={this.handleChangeZoneName} />
        {selectedZone && <Clock timestamp={getRealTmestamp(selectedZone)} />}
      </View>
    );
  }
}

export default App;
