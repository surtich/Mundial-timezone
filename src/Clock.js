import React, { Component } from "react";
import { Text, View } from "react-native";

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
    const { timestamp, gmtOffset } = this.props;
    const { milliSeconds } = this.state;

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
  }
}

export default Clock;
