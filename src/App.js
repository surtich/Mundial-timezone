import React, { Component } from "react";
import { Picker, Text, View } from "react-native";

import { key } from "./secrets";

const endpoint = `https://api.timezonedb.com/v2.1/list-time-zone?key=${key}&format=json`;

const Zones = ({ zones }) => (
  <Picker>
    {zones.map(({ timestamp, zoneName }) => (
      <Picker.Item key={zoneName} label={zoneName} value={zoneName} />
    ))}
  </Picker>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      zones: []
    };
  }

  componentDidMount() {
    fetch(endpoint)
      .then(response => response.json())
      .then(({ zones }) => {
        this.setState({
          zones: zones.sort((zoneA, zoneB) =>
            zoneA.zoneName.localeCompare(zoneB.zoneName)
          ),
          loading: false
        });
      })
      .catch(err => console.log("Error", err));
  }

  render() {
    const { zones, loading } = this.state;
    return (
      <View>{loading ? <Text>loading...</Text> : <Zones zones={zones} />}</View>
    );
  }
}

export default App;
