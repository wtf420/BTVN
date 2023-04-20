import * as React from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();

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

  function HomeScreen({ navigation }) {
    function renderItem({ item }) {
      return (
        <TouchableOpacity style={styles.item}  onPress={() =>
          navigation.navigate('Details', {item: item})
        }>
          <Image source={{ uri: item.image }} style={styles.item_image}></Image>
          <View style={styles.item_detail}>
            <Text style={styles.item_text}>{item.name}</Text>
            <Text style={styles.item_text}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={PRODUCTS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
      </View>
    );
  }
  
  function DetailsScreen({ route, navigation }) {
    let selectedItem = [route.params.item];
  
    function renderItem({ item }) {
      return (
        <View>
          <TouchableOpacity style={styles.item}  onPress={() =>
          navigation.navigate('Details', {item: item})
        }>
          <Image source={{ uri: item.image }} style={styles.item_image}></Image>
          <View style={styles.item_detail}>
            <Text style={styles.item_text}>{item.name}</Text>
            <Text style={styles.item_text}>{item.price}</Text>
          </View>
        </TouchableOpacity>
          <Text style={styles.item_text}>description</Text>
            <Text style={styles.item_text}>{route.params.item.description}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={selectedItem}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
      </View>
    );
  }

return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Product list" component={HomeScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
    </Stack.Navigator>
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
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

  item2: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
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

  item_image: {
    width: 100,
    height: 100,
  },
});
