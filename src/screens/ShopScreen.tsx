import React from "react";
import { SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from '@react-navigation/native';


type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Shop">
    route: RouteProp<RootStackParamList, "Shop">
}

export const ShopScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    const { shop } = route.params;

    return (
        <SafeAreaView>
            <Text>Shop</Text>
        </SafeAreaView>
    );
}