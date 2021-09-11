import { AVPlaybackStatusToSet } from "expo-av";
import { Asset } from "expo-asset";

/* expo-av のソースからからコピペしてきたもの*/
// AVPlaybackStatusの型制約を記述するため、ここで改めてAVPlaybackObjectの型を定義する

export type AVPlaybackStatusError = {
  isLoaded: false;
  androidImplementation?: string;
  error?: string;
};

export type AVPlaybackStatusSuccess = {
  isLoaded: true;
  androidImplementation?: string;
  uri: string;
  progressUpdateIntervalMillis: number;
  durationMillis?: number;
  positionMillis: number;
  playableDurationMillis?: number;
  seekMillisToleranceBefore?: number;
  seekMillisToleranceAfter?: number;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  didJustFinish: boolean;
};

export declare type AVPlaybackStatus =
  | AVPlaybackStatusError
  | AVPlaybackStatusSuccess;

// type AVPlaybackSource =
//   | number
//   | {
//       uri: string;
//       overrideFileExtensionAndroid?: string | undefined;
//       headers?:
//         | {
//             [fieldName: string]: string;
//           }
//         | undefined;
//     }
//   | Asset;

// export interface AV {
//   setStatusAsync(status: AVPlaybackStatusToSet): Promise<AVPlaybackStatus>;
//   getStatusAsync(): Promise<AVPlaybackStatus>;
// }

// export declare enum PitchCorrectionQuality {
//   Low,
//   Medium,
//   High,
// }

// export interface Playback extends AV {
//   playAsync(): Promise<AVPlaybackStatus>;
//   loadAsync(
//     source: AVPlaybackSource,
//     initialStatus: AVPlaybackStatusToSet,
//     downloadAsync: boolean
//   ): Promise<AVPlaybackStatus>;
//   unloadAsync(): Promise<AVPlaybackStatus>;
//   playFromPositionAsync(
//     positionMillis: number,
//     tolerances?: {
//       toleranceMillisBefore?: number;
//       toleranceMillisAfter?: number;
//     }
//   ): Promise<AVPlaybackStatus>;
//   pauseAsync(): Promise<AVPlaybackStatus>;
//   stopAsync(): Promise<AVPlaybackStatus>;
//   replayAsync(status: AVPlaybackStatusToSet): Promise<AVPlaybackStatus>;
//   setPositionAsync(
//     positionMillis: number,
//     tolerances?: {
//       toleranceMillisBefore?: number;
//       toleranceMillisAfter?: number;
//     }
//   ): Promise<AVPlaybackStatus>;
//   setRateAsync(
//     rate: number,
//     shouldCorrectPitch: boolean,
//     pitchCorrectionQuality?: PitchCorrectionQuality
//   ): Promise<AVPlaybackStatus>;
//   setVolumeAsync(volume: number): Promise<AVPlaybackStatus>;
//   setIsMutedAsync(isMuted: boolean): Promise<AVPlaybackStatus>;
//   setIsLoopingAsync(isLooping: boolean): Promise<AVPlaybackStatus>;
//   setProgressUpdateIntervalAsync(
//     progressUpdateIntervalMillis: number
//   ): Promise<AVPlaybackStatus>;
// }

/* anchorのrssから取得したオブジェクト */
export type AnchorAudioObj = {
  authors: [
    {
      name: string;
    }
  ];
  categories: [];
  content: undefined;
  description: string;
  enclosures: [
    {
      length: string;
      mimeType: "audio/x-m4a";
      url: string;
    }
  ];
  id: string;
  itunes: {
    authors: [];
    block: undefined;
    duration: string;
    explicit: string;
    image: string;
    isClosedCaptioned: undefined;
    order: undefined;
    subtitle: undefined;
    summary: string;
  };
  links: [
    {
      rel: string;
      url: string;
    }
  ];
  published: string;
  title: string;
};
