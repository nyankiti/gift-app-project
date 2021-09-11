import React, { Component } from "react";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { width } from "../../libs/utils/Dimension";
/*components */
import AudioBaseScreen from "./AudioBaseScreen";
import AudioListItem from "../../components/Audio/AudioListItem";
/* context */
import { AudioContext } from "../../context/AudioProvider";
/* types */
import { AnchorAudioObj } from "../../types/audio";
import { selectAudio } from "../../libs/audio/audioController";
import { AudioTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

type AudioListScreenNavigationProps = StackScreenProps<
  AudioTabParamList,
  "AudioListScreen"
>;
type State = {
  optionModalVisible: boolean;
};

export class AudioListScreen extends Component<
  AudioListScreenNavigationProps,
  State
> {
  static contextType = AudioContext;

  currentItem: AnchorAudioObj | {};
  constructor(props: AudioListScreenNavigationProps) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async (audio: any) => {
    await selectAudio(audio, this.context);
  };

  rowRenderer = (
    type: string | number,
    item: any,
    index: number,
    extendedState: any
    // extendedState: object | undefined
  ) => {
    return (
      <AudioListItem
        title={item.title}
        isPlaying={extendedState?.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.itunes.duration}
        onAudioPress={() => this.handleAudioPress(item)}
      />
    );
  };

  navigateToPlaylist = () => {
    this.context.updateState(this.context, {
      addToPlayList: this.currentItem,
    });
    this.props.navigation.navigate("PlayerScreen");
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          if (!dataProvider._data.length) return null;
          return (
            <AudioBaseScreen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
            </AudioBaseScreen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

export default AudioListScreen;
