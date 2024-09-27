import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/Storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { jwtDecode } from 'jwt-decode';
import { refetchUser, refresh_token } from '@service/authService';


GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
});

interface DecodedToken {
    exp: number;
    // iat: number;
    // iss: string;
    // sub: string;
};

const SplashScreen: React.FC = () => {

    const { user, setUser } = useAuthStore();

    console.log('CHECKING USER', user);

    const tokenCheck = async () => {

        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

            const currentTime = Date.now() / 1000;

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate("CustomerLogin");
                Alert.alert("Your session has expired. Please login again.");
                return false;
            }

            if (decodedAccessToken?.exp < currentTime) {
                try {

                    refresh_token();
                    await refetchUser(setUser);

                } catch (error) {
                    console.log("Refresh token error", error);
                    Alert.alert("there was an error refreshing your session. Please login again.");
                    return false;
                }
            }

            if (user?.role === 'Customer') {
                resetAndNavigate("ProductDashboard");
            } else {
                resetAndNavigate("DeliveryDashboard");
            }


            return true
        };

        resetAndNavigate("CustomerLogin");
        return false;
    };

    React.useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                GeoLocation.requestAuthorization();
                tokenCheck();
            } catch (error) {
                Alert.alert("Sorry we need your location service to give you better shopping experiences.");
            }
        }

        const timeOut = setTimeout(fetchUserLocation, 2000);
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