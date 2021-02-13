import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { updateUser } from "../lib/firebase";
import firebase from ""
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

import { UserContext } from "../conTexts/userContext";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string>(user.name);
  const [loading, setloading] = useState<boolean>(false);

  const onSubmit = async () => {
    setloading(true);
    const updatedAt = firebase.firestore.Timestamp.now();
    // name = name: nameの省略記法
    await updateUser(user.id, { name });
    setUser({ ...user, name, updatedAt });
    setloading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Form value={name} onChangeText={(text) => { setName(text) }} label="名前" />
      <Button onPress={() => { }} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});