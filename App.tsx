import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  useColorScheme,
  FlatList,
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const images = Array.from(
  {length: 50},
  (_, index) => `https://picsum.photos/200/300?random=${index}`,
);

function ImageCarousel() {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.carouselContainer}>
      {images.map((image, index) => (
        <View key={index} style={styles.carouselItem}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
}

const FetchDataComponent = () => {
  // get data from products api and load the image, title, description and price
  // var products = 'https://fakestoreapi.com/products';
  var API_URL = 'https://jsonplaceholder.typicode.com/posts';

  var [loading, setLoading] = useState(true);
  var [data, setdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(response => response.json())
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && loading && (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };

  return (
    <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Text style={styles.title}>React Native Challenges</Text>
        <Text style={styles.subtitle}>
          Challenge 1: Fetch Data from api and load items.
        </Text>
        <FetchDataComponent />

        <Text style={styles.subtitle}>Challenge 2: Dynamic Image Carousel</Text>
        <ImageCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  carouselContainer: {
    height: 300,
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  draggableContainer: {
    flex: 1,
    height: 500,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  box: {
    position: 'absolute',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
