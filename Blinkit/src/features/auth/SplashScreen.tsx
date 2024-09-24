import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
});

const SplashScreen: React.FC = () => {

    const { user, setUser } = useAuthStore();

    const tokenCheck

    React.useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                GeoLocation.requestAuthorization();
            } catch (error) {
                Alert.alert("Sorry we need your location service to give you better shopping experiences.");
            }
        }

        const timeOut = setTimeout(fetchUserLocation, 1000);
        return () => clearTimeout(timeOut);

    }, []);

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoImage} />
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain',
    },

});


export default SplashScreen;