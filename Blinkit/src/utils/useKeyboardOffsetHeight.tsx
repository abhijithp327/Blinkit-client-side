import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardOffsetHeight = () => {

    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

    useEffect(() => {
        // Android listeners
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardOffsetHeight(0);
            }
        );

        // iOS listeners (if needed)
        const keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            () => {
                setKeyboardOffsetHeight(0);
            }
        );

        // Cleanup
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    return keyboardOffsetHeight;
};

export default useKeyboardOffsetHeight;
