import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import SongList from './src/components/listsongs';
const setupTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'Track 1',
      artist: 'Artist 1',
      artwork: 'http://example.com/track1.png',
    },
    {
      id: '2',
      url: 'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3',
      title: 'Track 2',
      artist: 'Artist 2',
      artwork: 'http://example.com/track2.png',
    },
    {
      id: '3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'Track 3',
      artist: 'Artist 3',
      artwork: 'http://example.com/track3.png',
    },
  ]);
};
const STATE_PLAYING = 3;
const STATE_PAUSED = 2;
const STATE_STOPPED = 0;
const STATE_NEXT = 2;
const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setupTrackPlayer();
  }, []);
  const playbackState = usePlaybackState();
  useEffect(() => {
    if (playbackState === STATE_PLAYING) {
      setIsPlaying(true);
    } else if (
      playbackState === STATE_PAUSED ||
      playbackState === STATE_STOPPED ||
      playbackState === STATE_NEXT
    ) {
      setIsPlaying(false);
    }
  }, [playbackState]);
  const playTrack = async () => {
    await TrackPlayer.play();
  };
  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };
  const nextTrack = async () => {
    await TrackPlayer.skipToNext();
  };
  const prevTrack = async () => {
    await TrackPlayer.skipToPrevious();
  };
  return (
    <View>
      <Text>Music Player App</Text>
      <TouchableOpacity onPress={pauseTrack}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={playTrack}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={nextTrack}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={prevTrack}>
        <Text>Prev..</Text>
      </TouchableOpacity>

      <SongList />
    </View>
  );
};
export default App;
