import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Video from 'react-native-video';
import {Dimensions} from 'react-native';
import Sound from 'react-native-sound';

export interface State {
  id: number;
  sound: Sound[];
  soundBackground: Sound;
}

const windowHeight = Dimensions.get('window').height;

export default class Halloween extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: 0,
      sound: [
        new Sound('sound0.wav'),
        new Sound('sound1.m4a'),
        new Sound('sound2.m4a'),
        new Sound('sound3.m4a'),
        new Sound('sound4.wav'),
      ],
      soundBackground: new Sound('sound_background.m4a'),
    };
  }
  public render() {
    var images = [
      require('./assets/images/pumpkin0.png'),
      require('./assets/images/pumpkin1.png'),
      require('./assets/images/pumpkin2.png'),
      require('./assets/images/pumpkin3.png'),
      require('./assets/images/pumpkin4.png'),
    ];

    this.state.soundBackground.setNumberOfLoops(-1);
    this.state.soundBackground.setVolume(0.2);
    this.state.soundBackground.play();

    return (
      <View style={{flex: 1}}>
        <Video
          source={require('./assets/videos/background.mp4')}
          style={styles.background}
          repeat={true}
          resizeMode={'cover'}
          rate={0.5}
        />
        <TouchableWithoutFeedback onPress={this.onPressPumpkin}>
          <Image source={images[this.state.id]} style={styles.pumpkin} />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  private onPressPumpkin = () => {
    var randomNumber = Math.floor(Math.random() * 5) + 0;
    this.setState({
      id: randomNumber,
    });

    this.state.sound[randomNumber].play();
  };
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
  pumpkin: {
    height: 197,
    width: 200,
    alignSelf: 'center',
    marginTop: windowHeight - 250,
  },
});
