import React, {useState, useEffect} from 'react';
import { Text, ViewComponent, StyleSheet, View, FlatList, Image, Pressable, Button, Alert, Appearance, useColorScheme } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Checkbox from 'expo-checkbox';

export default function App() {

  const colorScheme = useColorScheme();
  const [refresh, setRefresh] = useState(false);
  const [isLightTheme, setLightTheme] = useState(true);
  const [FAVOURITES, setFAVOURITES] = useState([]);

const IsFavourited = (id) => {
  return FAVOURITES.includes(id);
}

const SetFvourites = (id) => {
  if (FAVOURITES.includes(id))
  {
    let array = FAVOURITES.filter(item => item != id);
    setFAVOURITES(array);
  } else
  {
    let array = FAVOURITES;
    array.push(id);
    setFAVOURITES(array);
  }
  setRefresh(!refresh);
  /*
  let string = '';
  for (let i = 0; i < FAVOURITES.length; i++) {
    string += FAVOURITES[i];
  }
  Alert.alert('Alert Title', string, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
  */
}

const GetFavourites = () => {
  let FavouriteItems = [];
  FavouriteItems = PRODUCTS.filter(item => FAVOURITES.includes(item.id));
  return FavouriteItems;
};

const PRODUCTS = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150/0000FF/808080',
    description: 'AaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa',
    name: 'Item 1',
    price: '10,000',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF',
    description: 'AaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa',
    name: 'Item 2',
    price: '20,000',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150/FFFF00/000000',
    description: 'AaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa',
    name: 'Item 3',
    price: '30,000',
  },
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.item_image}></Image>
      <View style={styles.item_detail}>
        <Text style={styles.item_text}>{item.name}</Text>
        <Text style={styles.item_text}>{item.price}</Text>
      </View>
      <Pressable 
        style={IsFavourited(item.id) ? styles.diamond : styles.diamond2} 
        title=""
        onPress={() => (SetFvourites(item.id))}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isLightTheme ? '#d0d0c0' :'#242c40' }}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
    </View>
  );
}

function FavouritesScreen() {
  let data = GetFavourites();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isLightTheme ? '#d0d0c0' :'#242c40' }}>
      <FlatList
        data={data}
        extraData={refresh}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1,
      flexDirection: 'row',
      backgroundColor: isLightTheme ? '#d0d0c0' :'#242c40'}}>
      <Text style={styles.item_text}>Theme: </Text>
      <Text style={styles.item_text}>Light: </Text>
      <Pressable 
        style={isLightTheme ? styles.diamond : styles.diamond2} 
        title=""
        onPress={() => (setLightTheme(true))}
      />
      <Text style={styles.item_text}>Dark: </Text>
      <Pressable 
        style={!isLightTheme ? styles.diamond : styles.diamond2} 
        title=""
        onPress={() => (setLightTheme(false))}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Product list" component={HomeScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
    </Tab.Navigator>
  );
}

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  item_detail: {
    marginHorizontal: 10,
    width: 100,
  },
  
  headerStyle: {
    backgroundColor: '#0000FF',
  },

  item_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 100,
    marginVertical: 10,
    borderWidth: 2,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },

  diamond: {
    marginVertical: 7,
    width: 20,
    height: 20,
    backgroundColor: "orange",
    transform: [{ rotate: "45deg" }],
  },

  diamond2: {
    marginVertical: 7,
    width: 20,
    height: 20,
    backgroundColor: "yellow",
    transform: [{ rotate: "45deg" }],
  },


  item_image: {
    width: 100,
    height: 100,
  },
});
  