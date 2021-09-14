import { AVPlaybackStatusToSet } from "expo-av";

/* types */
// 以下のPlayインターフェースを実装したのがVideoクラス。ここでは、setOnPlaybackStatusUpdateなどの、Videoクラスにしかないメソッドも用いていることからVideoをPlaybackの型として用いる
// import { Playback } from "expo-av/build/AV";
import { Video as Playback } from "expo-av";
import { AudioContextType } from "../../context/AudioProvider";
import { AnchorAudioObj } from "../../types/audio";

/* 
typescriptに変えたことで考えられる影響
  try catch文の中で if(playbackObj !== null){}
  の確認を入れることで、playbackObjがnullだった場合はcatchでExceptionを表示するのではなく、
  なにも処理が起こらないとういう状態になっている

ladAsyncの第三引数はtrueでいいのか？？

lastPostionをうまく指定できていない気がする

https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-08-18/525f560b7a51f06d5c4465e46f60272a.m4a#t=30
途中から再生する場合は上記のように#t=開始時間のクエリパラメータを渡す
audioObjectがlastPositionプロパティを持たないので、途中からの再生は上のように対応するしかない？
*/

// play audio
export const play = async (
  playbackObj: Playback,
  uri: string,
  lastPosition?: number
) => {
  try {
    if (!lastPosition)
      return await playbackObj.loadAsync(
        { uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 },
        true
      );

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 },
      true
    );

    return await playbackObj.playFromPositionAsync(lastPosition);
  } catch (error: any) {
    console.log("error inside play helper method", error.message);
  }
};

// 早田オリジナル
// urlから再生時間を指定する方法は、アプリでは動かなかったので不採用（webアプリのみ動作）
export const playFromMiddle = async (
  playbackObj: Playback,
  uri: string,
  lastTime: number
) => {
  console.log(lastTime);
  const uriForMiddlePlay = uri + "#t=" + lastTime;
  console.log(uriForMiddlePlay);
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    // shouldPlayにtrueを指定すると、playbackObj.playAsync()を呼ば出さなくとも自動的に再生してくれる
    return await playbackObj.loadAsync(
      { uri: uriForMiddlePlay },
      { shouldPlay: true, progressUpdateIntervalMillis: 1000 },
      true
    );
  } catch (error: any) {
    console.log("error inside play helper method", error.message);
  }
};

// 早田オリジナル
export const playFromMiddleByPosition = async (
  context: AudioContextType,
  position: number
) => {
  try {
    if (context.playbackObj !== null) {
      const status = await context.playbackObj.setPositionAsync(position);

      context.updateState({
        soundObj: status,
        playbackPosition: position,
      });

      await resume(context.playbackObj);
    }
    // shouldPlayにtrueを指定すると、playbackObj.playAsync()を呼ば出さなくとも自動的に再生してくれる
  } catch (error: any) {
    console.log("error inside play helper method", error.message);
  }
};

// pause audio
export const pause = async (playbackObj: Playback) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error: any) {
    console.log("error inside pause helper method", error.message);
  }
};

// resume audio
export const resume = async (playbackObj: Playback) => {
  try {
    return await playbackObj.playAsync();
  } catch (error: any) {
    console.log("error inside resume helper method", error.message);
  }
};

// select another audio
export const playNext = async (playbackObj: Playback, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error: any) {
    console.log("error inside playNext helper method", error.message);
  }
};

export const selectAudio = async (
  audio: AnchorAudioObj,
  context: AudioContextType,
  playListInfo = {}
) => {
  const {
    soundObj,
    playbackObj,
    currentAudio,
    updateState,
    audioFiles,
    onPlaybackStatusUpdate,
  } = context;
  try {
    // playing audio for the first time.
    if (soundObj === null && playbackObj !== null) {
      const status = await play(playbackObj, audio.enclosures[0].url);
      const index = audioFiles.findIndex(({ id }) => id === audio.id);
      updateState(context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        isPlayListRunning: false,
        activePlayList: [],
        ...playListInfo,
      });
      return playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    // pause audio
    if (
      soundObj?.isLoaded &&
      soundObj?.isPlaying &&
      currentAudio?.id === audio.id &&
      playbackObj !== null
    ) {
      const status = await pause(playbackObj);
      if (status !== undefined && "positionMillis" in status) {
        return updateState(context, {
          soundObj: status,
          isPlaying: false,
          playbackPosition: status?.positionMillis,
        });
      }
    }

    // resume audio
    if (
      soundObj?.isLoaded &&
      !soundObj?.isPlaying &&
      currentAudio?.id === audio.id &&
      playbackObj !== null
    ) {
      const status = await resume(playbackObj);
      return updateState(context, { soundObj: status, isPlaying: true });
    }

    // select another audio
    if (
      soundObj?.isLoaded &&
      currentAudio?.id !== audio.id &&
      playbackObj !== null
    ) {
      const status = await playNext(playbackObj, audio.enclosures[0].url);
      const index = audioFiles.findIndex(({ id }) => id === audio.id);
      updateState(context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        isPlayListRunning: false,
        activePlayList: [],
        ...playListInfo,
      });
    }
  } catch (error: any) {
    console.log("error inside select audio method.", error.message);
  }
};

export const changeAudio = async (
  context: AudioContextType,
  select: string
) => {
  const {
    playbackObj,
    currentAudioIndex,
    totalAudioCount,
    audioFiles,
    updateState,
    onPlaybackStatusUpdate,
  } = context;

  try {
    const tempStatus = await playbackObj?.getStatusAsync();
    const isLoaded = tempStatus?.isLoaded;
    const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
    const isFirstAudio = currentAudioIndex <= 0;
    let audio;
    let index;
    let status;

    // for next
    if (playbackObj !== null) {
      if (select === "next") {
        audio = audioFiles[currentAudioIndex + 1];
        if (!isLoaded && !isLastAudio) {
          index = currentAudioIndex + 1;
          status = await play(playbackObj, audio.enclosures[0].url);
          playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }

        if (isLoaded && !isLastAudio) {
          index = currentAudioIndex + 1;
          status = await playNext(playbackObj, audio.enclosures[0].url);
        }

        if (isLastAudio) {
          index = 0;
          audio = audioFiles[index];
          if (isLoaded) {
            status = await playNext(playbackObj, audio.enclosures[0].url);
          } else {
            status = await play(playbackObj, audio.enclosures[0].url);
          }
        }
      }

      // for previous
      if (select === "previous") {
        audio = audioFiles[currentAudioIndex - 1];
        if (!isLoaded && !isFirstAudio && play) {
          index = currentAudioIndex - 1;
          status = await play(playbackObj, audio.enclosures[0].url);
          playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }

        if (isLoaded && !isFirstAudio) {
          index = currentAudioIndex - 1;
          status = await playNext(playbackObj, audio.enclosures[0].url);
        }

        if (isFirstAudio) {
          index = totalAudioCount - 1;
          audio = audioFiles[index];
          if (isLoaded) {
            status = await playNext(playbackObj, audio.enclosures[0].url);
          } else {
            status = await play(playbackObj, audio.enclosures[0].url);
          }
        }
      }
    }

    return updateState(context, {
      currentAudio: audio,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });
  } catch (error: any) {
    console.log("error inside cahnge audio method.", error.message);
  }
};

export const moveAudio = async (context: AudioContextType, value: number) => {
  console.log(value);

  const { soundObj, isPlaying, playbackObj, updateState } = context;
  console.log(soundObj);
  if (soundObj === null || !isPlaying) return;

  console.log("start");
  try {
    if (playbackObj !== null && "durationMillis" in soundObj) {
      const status = await playbackObj.setPositionAsync(
        // null合体演算子 ?? によってsoundObj.durationMillisがundefined null のときは0を返す
        Math.floor(soundObj.durationMillis ?? 0 * value)
      );
      console.log(status);
      if ("positionMillis" in status) {
        updateState(context, {
          soundObj: status,
          playbackPosition: status.positionMillis,
        });
      }

      await resume(playbackObj);
    }
  } catch (error) {
    console.log("error inside onSlidingComplete callback", error);
  }
};
