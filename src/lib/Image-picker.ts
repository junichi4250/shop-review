import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermisson = async () => {
    if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("画像を選択するためにはカメラロールの許可が必要です");
        }
    }
};

export const pickImage = async () => {
    await getCameraRollPermisson();
    // ImagePicker起動
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEdting: false
    });
    if (!result.cancelled) {
        return result.uri;
    }
};