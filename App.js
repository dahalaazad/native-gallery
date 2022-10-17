import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, FlatList, Image, Dimensions} from 'react-native';
import {useState} from "react";
import {Carousel} from "react-native-snap-carousel-v4";

const {width} = Dimensions.get('window')

const IMAGES = {
    image1: require('./assets/images/1.jpeg'),
    image2: require('./assets/images/2.jpeg'),
    image3: require('./assets/images/3.jpeg'),
    image4: require('./assets/images/4.jpeg'),
    image5: require('./assets/images/5.jpeg'),
    image6: require('./assets/images/6.jpeg'),
    image7: require('./assets/images/7.jpeg')
};


export default function App() {
    const [images, setImages] = useState([
        {id: '1', image: IMAGES.image1},
        {id: '2', image: IMAGES.image2},
        {id: '3', image: IMAGES.image3},
        {id: '4', image: IMAGES.image4},
        {id: '5', image: IMAGES.image5},
        {id: '6', image: IMAGES.image6},
        {id: '7', image: IMAGES.image7}
    ]);
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Custom Gallery</Text>
            <Carousel
                layout='default'
                sliderWidth={width}
                itemWidth={width}
                // windowSize={1000}
                data={images}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Image source={item.image}
                           style={styles.image}
                           resizeMode='contain'
                    />
                )}
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    titleText: {
        color: '#fff',
        fontSize: 32,
        marginTop: 50,
        marginBottom: 25
    },
    item: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#d35647',
        // resizeMode: 'contain',
        // margin: 8
    }
});
