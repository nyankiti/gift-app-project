  
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
  // パーミッションの取得
  await getCameraRollPermission();
  // ImagePicker起動
  let result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled) {
    console.log(result);
    return result.uri;
  }
};