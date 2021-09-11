import React, { Component, createContext } from "react";
import { DataProvider } from "recyclerlistview";
import fetchAudio from "../libs/audio/fetchAudio";
import { playNext } from "../libs/audio/audioController";
import { Audio } from "expo-av";
/* types */
import { AnchorAudioObj } from "../types/audio";
// import { Playback } from "expo-av/build/AV";
import { Video as Playback } from "expo-av";
import { AVPlaybackStatus } from "expo-av";

export type AudioContextType = {
  audioFiles: AnchorAudioObj[];
  dataProvider: any;
  playbackObj: Playback | null;
  soundObj: AVPlaybackStatus | null;
  currentAudio: AnchorAudioObj | null;
  isPlaying: boolean;
  currentAudioIndex: number;
  totalAudioCount: number;
  playbackPosition: any;
  playbackDuration: any;
  updateState: any;
  onPlaybackStatusUpdate: any;
};

type Props = {};

export const AudioContext = createContext<AudioContextType>({
  audioFiles: [],
  dataProvider: new DataProvider((r1, r2) => r1 !== r2),
  playbackObj: null,
  soundObj: null,
  currentAudio: null,
  isPlaying: false,
  currentAudioIndex: 0,
  totalAudioCount: 0,
  playbackPosition: undefined,
  playbackDuration: undefined,
  updateState: () => {},
  onPlaybackStatusUpdate: () => {},
});

type State = {
  audioFiles: any;
  playList: any;
  addToPlayList: null;
  permissionError: false;
  dataProvider: any;
  playbackObj: Playback | null;
  soundObj: null;
  currentAudio: {};
  isPlaying: false;
  currentAudioIndex: number;
  playbackPosition: null;
  playbackDuration: null;
};

export class AudioProvider extends Component<Props, State> {
  totalAudioCount: number;
  updateState: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      audioFiles: [],
      playList: [],
      addToPlayList: null,
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: 0,
      playbackPosition: null,
      playbackDuration: null,
    };
    this.totalAudioCount = 0;
    this.updateState = (prevState: any, newState: any) => {
      this.setState({ ...prevState, ...newState });
    };
  }

  getAudioFiles = async () => {
    const { dataProvider } = this.state;
    const media = await fetchAudio();
    this.totalAudioCount = media.length;

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([...media]),
      audioFiles: [...media],
    });
  };

  onPlaybackStatusUpdate = async (playbackStatus: AVPlaybackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.updateState(this, {
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,
      });
    }

    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
    }

    if (
      "didJustFinish" in playbackStatus &&
      playbackStatus.didJustFinish &&
      this.state.playbackObj !== null
    ) {
      const nextAudioIndex = this.state.currentAudioIndex + 1;
      // there is no next audio to play or the current audio is the last
      if (nextAudioIndex >= this.totalAudioCount) {
        this.state.playbackObj.unloadAsync();
        this.updateState(this, {
          soundObj: null,
          currentAudio: this.state.audioFiles[0],
          isPlaying: false,
          currentAudioIndex: 0,
          playbackPosition: null,
          playbackDuration: null,
        });
        return;
      }
      // otherwise we want to select the next audio
      const audio = this.state.audioFiles[nextAudioIndex];
      const status = await playNext(
        this.state.playbackObj,
        audio.enclosures[0].url
      );
      return this.updateState(this, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: nextAudioIndex,
      });
    }
  };

  componentDidMount() {
    this.getAudioFiles();
    if (this.state.playbackObj === null) {
      this.setState({ ...this.state, playbackObj: new Audio.Sound() });
    }
  }

  render() {
    const {
      audioFiles,
      dataProvider,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex,
      playbackPosition,
      playbackDuration,
    } = this.state;

    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          totalAudioCount: this.totalAudioCount,
          playbackPosition,
          playbackDuration,
          updateState: this.updateState,
          onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
