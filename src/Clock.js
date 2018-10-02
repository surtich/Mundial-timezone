import React, { Component } from "react";
import { Text, View } from "react-native";

import { SelectedZoneContext } from "./Context";

const getRealTimestamp = ({ timestamp, gmtOffset, milliSeconds }) =>
  (timestamp - gmtOffset) * 1000 + milliSeconds;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.startTime = Date.now();
    this.state = {
      milliSeconds: 0,
      interval: null
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const { startTime } = this;
      this.setState({
        milliSeconds: Date.now() - startTime
      });
    }, 1000);
    this.setState({
      interval
    });
  }

  componentWillUnmount() {
    const { interval } = this.state;
    interval && clearInterval(interval);
  }

  render() {
    const { gmtOffset } = this.props;
    const { milliSeconds } = this.state;
    return (
      <SelectedZoneContext.Consumer>
        {({ timestamp }) => {
          const realTimestamp = getRealTimestamp({
            timestamp,
            gmtOffset,
            milliSeconds
          });
          return (
            <View>
              <Text>{new Date(realTimestamp).toLocaleTimeString()}</Text>
            </View>
          );
        }}
      </SelectedZoneContext.Consumer>
    );
  }
}

export default Clock;
