import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Constants from "expo-constants";
/* types */
import { Shop } from "../types/shop";
import { Review } from "../types/shop";
import { initialUser, User } from "../types/user";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShops = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("shops")
      .orderBy("score", "desc")
      .get();
    const shops = snapshot.docs.map((doc) => {...doc.data(), id: document.id} as Shop);
  return shops;
} catch (err) {
  console.log(err);
  return [];
}
};

export const signin = async () => {
  const userCredintial = await firebase.auth().signInAnonymously();
  const { uid } = userCredintial.user;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
};

export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("review")
    .doc();
};


// storageに画像をuploadしてstorage上のurlを返す
export const uploadImage = async (uri: string, path: string) => {
  const localUri = await fetch(uri);
  const blob = await localUri.blob();

  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";

  try {
    await ref.put(blob);
    downloadUri = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }

  return downloadUrl;
}