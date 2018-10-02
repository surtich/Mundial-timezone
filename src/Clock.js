import React, { Component } from "react";
import { Text, View } from "react-native";

import { SelectedZoneContext } from "./Context";

const getRealTimestamp = ({ timestamp, gmtOffset, milliSeconds }) =>
  (timestamp - gmtOffset) * 1000 + milliSeconds;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: Date.now(),
      milliSeconds: 0,
      interval: null
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const { startTime } = this.state;
      this.setState({
        milliSeconds: Date.now() - startTime
      });
    }, 1000);
    this.setState({
      interval
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { loadCounter } = this.props;
    if (loadCounter !== prevProps.loadCounter) {
      this.setState({
        startTime: Date.now(),
        milliSeconds: 0
      });
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    interval && clearInterval(interval);
  }

  render() {
    const { gmtOffset, timestamp } = this.props;
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

export default props => (
  <SelectedZoneContext.Consumer>
    {({ timestamp }) => <Clock {...props} timestamp={timestamp} />}
  </SelectedZoneContext.Consumer>
);
