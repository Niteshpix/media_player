import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const songList = [
  {
    id: '1',
    title: 'Song 1',
    artist: 'Artist 1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '2',
    title: 'Song 2',
    artist: 'Artist 2',
    url: 'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3',
  },
  // Add more songs to the list
];

export default function SongList() {
  const [isPlaying, setIsPlaying] = useState(null);

  const handleSongPress = async song => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: song.id,
      url: song.url,
      title: song.title,
      artist: song.artist,
    });
    await TrackPlayer.play();
    setIsPlaying(song.id);
  };

  const handlePause = async songId => {
    if (songId === isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(null);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.songItem}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
        {item.id === isPlaying ? (
          <Button title="Pause" onPress={() => handlePause(item.id)} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={songList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = {
  songItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
};
