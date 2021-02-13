import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Image, Alert } from "react-native";
import { UserContext } from "../contexts/userContext";
import firebase from "firebase";
import { pickImage } from "../lib/Image-picker";
import { getExtention } from "../utils/file";
/* components */
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { createReviewRef, uploadImage } from "../lib/firebase";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません")
      return;
    }
    setLoading(true);
    const reviewDocRef = await createReviewRef(shop.id);

    // storageのPathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`

    const downloadUrl = await uploadImage(imageUri, storagePath);

    const review = {
      user: {
        name: user.id,
        id: user.id
      },
      shop: {
        name: shop.name,
        id: shop.id
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    }; as Review
    await reviewDocRef.set(review);
    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea value={text} onChangeText={(value) => setText(value)} label="レビュー" placeholder="レビューを書いてください" />
      <IconButton name="camera" onPress={onPickImage} color="#ccc" />
      {!!imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Button text="レビューを投稿する" onPress={onSubmit} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
  }
});