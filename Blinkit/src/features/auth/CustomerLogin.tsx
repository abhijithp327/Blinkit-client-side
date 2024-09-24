import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { View, StyleSheet, Animated, Image } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';

const CustomerLogin: React.FC = () => {

    const [gestureSequence, setGestureSequence] = React.useState<string[]>([]);

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
                        >
                            <View style={styles.content}>
                                <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>
                </CustomSafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
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

});

export default CustomerLogin;