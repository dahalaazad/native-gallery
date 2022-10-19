import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity} from 'react-native';
import {useRef, useState} from "react";
import {Carousel, Pagination} from "react-native-snap-carousel-v4";

const {width} = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

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
    const [indexSelected, setIndexSelected] = useState(0);
    const carouselRef = useRef();
    const flatListRef = useRef();

    const onSelect = (indexSelected) => {
        setIndexSelected(indexSelected);
        
        flatListRef?.current?.scrollToOffset({
            offset: indexSelected * THUMB_SIZE,
            animated:true
        })
    }

    const onTouchThumbnail = (touched) => {
      if (touched === indexSelected) return;
      carouselRef?.current?.snapToItem(touched);
    }
    return (
        <View style={styles.container}>
            <View style={styles.allImages}>
                <Text style={styles.titleText}>Custom Gallery</Text>
                <Carousel
                    layout='default'
                    ref={carouselRef}
                    onSnapToItem={index => onSelect(index)}
                    sliderWidth={width}
                    itemWidth={width}
                    // windowSize={1000}
                    data={images}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Image source={item.image}
                               style={styles.image}
                            // resizeMode='contain'
                        />
                    )}
                />
                <Pagination inactiveDotColor='gray'
                            dotColor={'orange'}
                            dotsLength={images.length}
                            inactiveDotScale={1}
                            animatedDuration={150}
                            activeDotIndex={indexSelected}
                />
            </View>
            <View>
                <Text style={{
                    color: '#fff',
                    fontSize: 22
                }}>
                    {indexSelected + 1}/{images.length}
                </Text>
            </View>
            <FlatList data={images}
                      horizontal={true}
                      ref={flatListRef}
                      style={styles.thumbnail}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => (
                          <TouchableOpacity
                              onPress={()=> onTouchThumbnail(index)}
                              activeOpacity={0.9}>
                              <Image source={item.image}
                                     style={{
                                         width: THUMB_SIZE,
                                         height: THUMB_SIZE,
                                         marginRight: SPACING,
                                         borderRadius: 16,
                                         borderWidth: index === indexSelected ? 4 : 0.75,
                                         borderColor: index === indexSelected ? 'orange' : '#fff'


                                     }}/>
                          </TouchableOpacity>
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
    allImages: {
        flex: 1 / 2,
        marginTop: 20,
        alignItems: 'center'
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
        // borderWidth: 2,
        // borderColor: '#d35647',
        // margin: 8
    },
    thumbnail: {
        position: 'absolute',
        bottom: 80
    }
});
