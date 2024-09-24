import { MMKVLoader } from 'react-native-mmkv-storage';

// Create an MMKV instance for token storage
export const tokenStorage = new MMKVLoader()
    .withInstanceID('token-storage') // Instance ID for token storage
    .withEncryption()                 // Enable encryption
    .initialize();

// Create another MMKV instance for app storage
export const storage = new MMKVLoader()
    .withInstanceID('my-app-storage') // Instance ID for app storage
    .withEncryption()                  // Enable encryption
    .initialize();

    export const mmkvStorage = {
        setItem: async (key: string, value: string) => {
            await storage.setStringAsync(key, value); // Use setStringAsync for async storage
        },
        getItem: async (key: string) => {
            const value = await storage.getStringAsync(key); // Use getStringAsync to retrieve value
            return value ?? null; // Return value or null if not found
        },
        removeItem: async (key: string) => {
            await storage.removeItem(key); // Use removeItem instead of delete
        }
    };
