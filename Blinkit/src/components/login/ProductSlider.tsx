import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { imageData } from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenWidth } from '@utils/Scaling';


const ProductSlider = () => {

    const rows = React.useMemo(() => {

        const result = [];
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4));
        };

        return result;
    }, []);

    return (
        <View pointerEvents='none'>
            <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
                <View style={styles.gridContainer}>
                    {rows?.map((row: any, rowIndex: number) => (

                        <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />

                    ))}
                </View>
            </AutoScroll>
        </View>
    )
};


const Row: React.FC<{ row: typeof imageData, rowIndex: number }> = ({ row, rowIndex }) => {
    return (
        <View style={styles.row}>
            {row.map((image, imageIndex) => {

                const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;

                return (
                    <View style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]} key={imageIndex}>
                        <Image source={image} style={styles.image} />
                    </View>
                )
            })}
        </View>
    );
};

const MemoizedRow = React.memo(Row);


const styles = StyleSheet.create({

    autoScroll: {
        position: 'absolute',
        zIndex: -2,
    },
    itemContainer: {
        marginBottom: 12,
        marginHorizontal: 10,
        width: screenWidth * 0.26,
        height: screenWidth * 0.26,
        borderRadius: 25,
        backgroundColor: '#e9f7f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    gridContainer: {
        justifyContent: 'center',
        overflow: "visible",
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    }


});

export default ProductSlider;