import React, { Component } from "react";
import { Text, View } from "react-native";

const getRealTimestamp = (timestamp, gmtOffset, seconds) =>
  (timestamp + seconds) * 1000;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: getRealTimestamp(props.timestamp, props.gmtOffset, 0),
      interval: null,
      seconds: 0
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const { seconds, timestamp } = this.state;
      this.setState({
        timestamp: timestamp + 1000,
        seconds: seconds + 1
      });
    }, 1000);
    this.setState({
      interval
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { timestamp, gmtOffset } = this.props;
    if (
      timestamp !== prevProps.timestamp ||
      gmtOffset !== prevProps.gmtOffset
    ) {
      this.setState({
        timestamp: getRealTimestamp(timestamp, gmtOffset, this.state.seconds)
      });
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    interval && clearInterval(interval);
  }

  render() {
    const { timestamp } = this.state;
    return (
      <View>
        <Text>{new Date(timestamp).toLocaleTimeString()}</Text>
      </View>
    );
  }
}

export default Clock;
