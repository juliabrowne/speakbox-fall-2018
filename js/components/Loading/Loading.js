import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Animated, Dimensions, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import globalStyles from "../../config/styles";
const { height, width } = Dimensions.get("window");

export default class Loading extends Component {
  constructor() {
    super();
    this.state = {
      rotation: new Animated.Value(0)
    };
  }
  startAnimation() {
    Animated.sequence([
      Animated.timing(this.state.rotation, {
        toValue: 1,
        duration: 1000
      })
    ]).start(() => {
      this.setState({
        rotation: new Animated.Value(0)
      });
      this.startAnimation();
    });
  }
  componentDidMount() {
    this.startAnimation();
  }
  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.8 }}
          colors={[
            globalStyles.screenGradientColor.start.color,
            globalStyles.screenGradientColor.end.color
          ]}
          style={[StyleSheet.absoluteFill, { height, width }]}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: height / 3.75,
            left: width / 4.6,
            transform: [{ rotate: spin }]
          }}
        >
          <Image source={require("../../assets/Spinner/loadingCircle.png")} />
        </Animated.View>
        <Image
          style={styles.logo}
          source={require("../../assets/Icons/SpeakboxLogo.png")}
        />
      </View>
    );
  }
}
