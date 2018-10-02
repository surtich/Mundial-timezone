import React, { Component } from "react";
import { Text, View } from "react-native";

import { SelectedZoneContext } from "./Context";

import { timezonedbKey } from "./secrets";
import Clock from "./Clock";
import Zones from "./Zones";

const zonesEndpoint = `https://api.timezonedb.com/v2.1/list-time-zone?key=${timezonedbKey}&format=json`;
const myZoneEndpoint = "https://ipapi.co/json/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      zones: [],
      selectedZone: null,
      myZone: null
    };
  }

  handleChangeZoneName = (zoneName, index) => {
    const { zones } = this.state;
    this.setState({
      selectedZone: zones[index]
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(zonesEndpoint).then(response => response.json()),
      fetch(myZoneEndpoint).then(response => response.json())
    ])
      .then(([{ zones }, { timezone }]) => {
        const sortedZones = zones.sort((zoneA, zoneB) =>
          zoneA.zoneName.localeCompare(zoneB.zoneName)
        );
        const myZone = sortedZones.find(zone => zone.zoneName === timezone);

        this.setState({
          zones: sortedZones,
          selectedZone: myZone || sortedZones[0] || null,
          myZone,
          loading: false
        });
      })
      .catch(err => console.log("Error", err));
  }

  render() {
    const { loading, myZone, selectedZone, zones } = this.state;
    if (loading) {
      return <Text>loading...</Text>;
    }
    return (
      <View>
        <SelectedZoneContext.Provider value={selectedZone}>
          <Zones zones={zones} handleChangeZone={this.handleChangeZoneName} />
          {selectedZone && <Clock gmtOffset={myZone.gmtOffset} />}
        </SelectedZoneContext.Provider>
      </View>
    );
  }
}

export default App;
