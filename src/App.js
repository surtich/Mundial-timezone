import React, { Component } from "react";
import { Button, Text, View } from "react-native";

import { SelectedZoneContext } from "./Context";

import { timezonedbKey } from "./secrets";
import Clock from "./Clock";
import Zones from "./Zones";

const zonesEndpoint = `https://api.timezonedb.com/v2.1/list-time-zone?key=${timezonedbKey}&format=json`;
const myZoneEndpoint = "https://ipapi.co/json/";

const sortZones = zones =>
  [...zones].sort((zoneA, zoneB) =>
    zoneA.zoneName.localeCompare(zoneB.zoneName)
  );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      loadCounter: 0,
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

  reload = async () => {
    try {
      const [{ zones }, { timezone }] = await Promise.all([
        fetch(zonesEndpoint).then(response => response.json()),
        fetch(myZoneEndpoint).then(response => response.json())
      ]);
      const sortedZones = sortZones(zones);
      const myZone = sortedZones.find(zone => zone.zoneName === timezone);

      this.setState({
        zones: sortedZones,
        selectedZone: myZone || sortedZones[0] || null,
        myZone,
        loading: false,
        refreshing: false,
        loadCounter: this.state.loadCounter + 1
      });
    } catch (err) {
      console.log("Error in reload", err);
    }
  };

  refresh = () => {
    this.setState(
      {
        refreshing: true
      },
      this.reload
    );
  };

  componentDidMount() {
    this.setState(
      {
        loading: true
      },
      this.reload
    );
  }

  render() {
    const {
      loading,
      refreshing,
      loadCounter,
      myZone,
      selectedZone,
      zones
    } = this.state;
    if (loading) {
      return <Text>loading...</Text>;
    }
    return (
      <View>
        <Button disabled={refreshing} title="refresh" onPress={this.refresh} />
        <SelectedZoneContext.Provider value={selectedZone}>
          <Zones
            disabled={refreshing}
            zones={zones}
            handleChangeZone={this.handleChangeZoneName}
          />
          {selectedZone && (
            <Clock loadCounter={loadCounter} gmtOffset={myZone.gmtOffset} />
          )}
        </SelectedZoneContext.Provider>
        {refreshing && <Text>refreshing...</Text>}
      </View>
    );
  }
}

export default App;
