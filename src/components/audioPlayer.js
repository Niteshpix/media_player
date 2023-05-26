import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({title, artist, imageUrl, audioUrl}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const soundObject = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Error occurred while loading audio:', error);
    }
  });

  useEffect(() => {
    return () => {
      soundObject.release(); // Release the sound object when the component is unmounted
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      soundObject.setCurrentTime(0); // Reset audio to the beginning
    }

    soundObject.play(success => {
      if (success) {
        setIsPlaying(false);
        setIsPaused(false);
      } else {
        console.error('Error occurred while playing audio');
      }
    });

    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (soundObject && isPlaying) {
      soundObject.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
      <View style={styles.buttonsContainer}>
        {isPlaying && !isPaused ? (
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePlay}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artist: {
    fontSize: 16,
  },
});

export default AudioPlayer;
