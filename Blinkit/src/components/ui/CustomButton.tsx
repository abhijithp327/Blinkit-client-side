import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';


interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    disabled?: boolean;
    loading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, disabled, loading }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.btn, {
                backgroundColor: disabled ? Colors.disabled : Colors.secondary,
            }]}
        >
            {
                loading ?
                    <ActivityIndicator color={'white'} size={'small'} /> :
                    <CustomText variant='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
                        {title}
                    </CustomText>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
    },
    text: {
        color: "#fff"
    }

});

export default CustomButton;