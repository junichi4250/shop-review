import React from "react";
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from "react-native";

type Props = {
    onPress: (event: GestureResponderEvent) => void;
    text: string;
};

export const Button: React.FC<Props> = ({
    onPress,
    text
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        fontSize: 18,
        color: "#fff",
    },
});