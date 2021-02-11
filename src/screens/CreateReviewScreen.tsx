import React, { useLayoutEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
/* components */
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
    });
  }, [navigation, shop]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>New Review Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});