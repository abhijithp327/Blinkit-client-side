import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { View, StyleSheet, Animated, Image, SafeAreaView, Keyboard, Alert } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '../../utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse();

const CustomerLogin: React.FC = () => {

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [gestureSequence, setGestureSequence] = React.useState<string[]>([]);


    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {

        if (keyboardOffsetHeight === 0) {

            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();

        } else {

            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 1000,
                useNativeDriver: true
            }).start();

        }

    }, [keyboardOffsetHeight]);


    const handleAuth = async () => {
        Keyboard.dismiss();
        setLoading(true);
        try {

            await customerLogin(phoneNumber);
            resetAndNavigate('ProductDashboard');

        } catch (error) {
            Alert.alert("Login Failed")
        } finally {
            setLoading(false);
        }
    };

    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = '';
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left';
            } else {
                direction = translationY > 0 ? 'down' : 'up';
            }

            // console.log(translationX, translationY, direction);

            const newSequence = [...gestureSequence, direction].slice(-5)
            setGestureSequence(newSequence);
            // console.log(newSequence);

            if (newSequence.join(' ') === 'up up down left right') {
                setGestureSequence([]);
                resetAndNavigate('DeliveryLogin')
            }
        }

    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />
                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView
                            bounces={false}
                            keyboardDismissMode={'on-drag'}
                            keyboardShouldPersistTaps={'handled'}
                            contentContainerStyle={styles.subContainer} // Applying styles to inner scrollable content
                            style={{ transform: [{ translateY: animatedValue }] }}
                        >

                            <LinearGradient colors={bottomColors} style={styles.gradient} />

                            <View style={styles.content}>
                                <Image source={require('@assets/images/logo.png')} style={styles.logo} />

                                <CustomText variant='h2' fontFamily={Fonts.Bold}>India's last minute app</CustomText>
                                <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>Log in or sign up</CustomText>

                                <CustomInput
                                    onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)); }}
                                    onClear={() => { setPhoneNumber(''); }}
                                    value={phoneNumber}
                                    left={
                                        <CustomText style={styles.phoneText} variant='h6' fontFamily={Fonts.SemiBold}>
                                            +91
                                        </CustomText>
                                    }
                                    placeholder="Enter mobile number"
                                    inputMode='numeric'
                                />

                                <CustomButton
                                    disabled={phoneNumber.length < 10}
                                    onPress={() => handleAuth()}
                                    loading={loading}
                                    title='Continue'
                                />

                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>
                </CustomSafeAreaView>

                {/* Footer */}
                <View style={styles.footer}>
                    <SafeAreaView>
                        <CustomText fontSize={RFValue(6)}>
                            By Continuing, you agree to our Terms of Service and Privacy Policy
                        </CustomText>
                    </SafeAreaView>
                </View>

            </View>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    phoneText: {
        marginLeft: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
    footer: {
        width: '100%',
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
    },
    gradient: {
        paddingTop: 60,
        width: '100%',
    }


});

export default CustomerLogin;