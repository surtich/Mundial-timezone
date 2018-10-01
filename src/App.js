import React, { Component } from "react";
import { Picker, Text, View } from "react-native";

import { key } from "./secrets";

const endpoint = `https://api.timezonedb.com/v2.1/list-time-zone?key=${key}&format=json`;

const countriesToPicker = ({ zones }) => (
  <Picker>
    {zones.map(({ countryCode, countryName, timestamp, zoneName }) => (
      <Picker.Item label={zoneName} value={countryCode} />
    ))}
  </Picker>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      countries: { zones: [] }
    };
  }
  componentDidMount() {
    console.log("componentDidMount");

    fetch(endpoint)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          countries: responseJson,
          loading: false
        });
        return console.log(responseJson);
      })
      .catch(err => console.log("Error", err));
  }
  render() {
    const { countries, loading } = this.state;
    return (
      <View>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <View>{countriesToPicker(countries)}</View>
        )}
      </View>
    );
  }
}

export default App;
