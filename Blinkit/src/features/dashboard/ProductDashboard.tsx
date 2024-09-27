import { View, Text, Animated as RNAnimated, SafeAreaView } from 'react-native';
import React from 'react';
import NoticeAnimation from './NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
    // Initialize animated value for notice position
    const noticePosition = React.useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HEIGHT,  // Moves the notice up (out of view)
            duration: 1200,
            useNativeDriver: false,  // Set to true for smoother performance
        }).start();
    };

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,  // Moves the notice down (into view)
            duration: 1200,
            useNativeDriver: false,  // Set to true for smoother performance
        }).start();
    };

    React.useEffect(() => {
        slideDown();  // Slide the notice down when the component mounts
        const timeOutId = setTimeout(() => {
            slideUp();  // Slide the notice up after 3 seconds
        }, 3500);
        return () => clearTimeout(timeOutId);  // Cleanup timeout on unmount
    }, []);

    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <SafeAreaView />
                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: 'red' }}>Product Dashboard</Text>
                </View>
            </>
        </NoticeAnimation>
    );
};

export default ProductDashboard;
