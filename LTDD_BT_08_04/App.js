import React, {useState, useEffect} from 'react';
import { Text, ViewComponent, StyleSheet, View, FlatList, Image, Pressable, Button, Alert, Appearance, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from "expo-sqlite";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const db = SQLite.openDatabase('example.db');

export default function App() {
  const Stack = createNativeStackNavigator();
  const [db, setDb] = useState(SQLite.openDatabase('example.db'));
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CLASSES = [
    {
      id: 1,
      id_string: 'Class001',
      name: 'Class001',
      students: '50',
    },
    {
      id: 2,
      id_string: 'Class002',
      name: 'Class002',
      students: '50',
    },
    {
      id: 3,
      id_string: 'Class003',
      name: 'Class003',
      students: '50',
    },
  ];

  const CLASSES_STUDENTS = [
    {
      id: 1,
      id_string: 'Student001',
      image: 'https://via.placeholder.com/150/0000FF/808080',
      name: 'Le Van A',
      dob:'01/01/2002',
    },
    {
      id: 2,
      id_string: 'Student002',
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF',
      name: 'Nguyen Van B',
      dob:'01/01/2002',
    },
    {
      id: 3,
      id_string: 'Student003',
      image: 'https://via.placeholder.com/150/FFFF00/000000',
      name: 'Phan Thi C',
      dob:'01/01/2002',
    },
  ];

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS constants;'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS constants (id INTEGER PRIMARY KEY AUTOINCREMENT, id_string TEXT, name TEXT, students INTEGER);'
      );
      tx.executeSql('INSERT INTO constants (id_string, name, students) VALUES (?, ?, ?)', ['Class001', 'Class001', 50]);
      tx.executeSql('INSERT INTO constants (id_string, name, students) VALUES (?, ?, ?)', ['Class002', 'Class002', 50]);
      tx.executeSql('INSERT INTO constants (id_string, name, students) VALUES (?, ?, ?)', ['Class003', 'Class003', 50]);
      tx.executeSql('SELECT * FROM constants', [], (_, { rows }) =>
        setClasses(rows._array)
      );

      tx.executeSql(
        'DROP TABLE IF EXISTS students;'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, id_string TEXT, image_url TEXT, name TEXT, dob TEXT, class_id TEXT);'
      );
      tx.executeSql('INSERT INTO students (id_string, image_url, name, dob, class_id) VALUES (?, ?, ?, ?, ?)', 
        ['Student001', 'https://via.placeholder.com/150/0000FF/808080', 'Le Van A', '01/01/2002', 'Class002']);
      tx.executeSql('INSERT INTO students (id_string, image_url, name, dob, class_id) VALUES (?, ?, ?, ?, ?)',
        ['Student002', 'https://via.placeholder.com/150/FF0000/FFFFFF', 'Nguyen Van B', '01/01/2002', 'Class001']);      
      tx.executeSql('INSERT INTO students (id_string, image_url, name, dob, class_id) VALUES (?, ?, ?, ?, ?)',
        ['Student003', 'https://via.placeholder.com/150/0000FF/000000', 'Phan Thi C', '01/01/2002', 'Class003']);        
      tx.executeSql('SELECT * FROM students', [], (_, { rows }) =>
        setStudents(rows._array)
      );
      setIsLoading(false);
    });
  }, []);

  function Login({ navigation }) {
    const [username, onChangeText] = React.useState('');
    const [password, onChangeNumber] = React.useState('');

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.screenTitle}>Login</Text>
        <Text>UserName</Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeText}
          value={username}
          placeholder=""
          keyboardType="default"/>
        <Text>Password</Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeNumber}
          value={password}
          placeholder=""
          keyboardType="default"/>
        <Button
          title="Login"
          onPress={() => {
          if ((username == 'user' || username == 'User') && password == '123456')
          {
            navigation.navigate('Classes')
          }
        }}/>
      </View>
    );
  }

  function ClassesScreen({ navigation }) {
    function renderItem({ item }) {
      return (
        <TouchableOpacity style={styles.item}  onPress={() =>
          navigation.navigate('Classes Details', {item: item})
        }>
          <View style={styles.item_detail}>
            <Text style={styles.item_text}>ID: {item.id_string}</Text>
            <Text style={styles.item_text}>NAME: {item.name}</Text>
            <Text style={styles.item_text}>STUDENTS: {item.students}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
            <FlatList
              data={classes}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        )
        }
      </View>
    );
  }
  
  function DetailsScreen({ route, navigation }) {
    let selectedItem = route.params.item;
    let array = []
    for (let i = 0; i < students.length; i++)
    {
      if (students[i].class_id == selectedItem.id_string)
        array.push(students[i]);
    }

    function renderItem2({ item }) {
      return (
        <View style={styles.item}>
          <Image source={{ uri: item.image_url }} style={styles.item_image}></Image>
          <View style={styles.item_id}>
            <Text style={styles.item_text}>{item.id_string}</Text>
            <Text style={styles.item_text}>{item.name}</Text>
            <Text style={styles.item_text}>{item.dob}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>
        <View style={styles.item}>
          <View style={styles.item_detail}>
            <Text style={styles.item_text}>ID: {selectedItem.id_string}</Text>
            <Text style={styles.item_text}>NAME: {selectedItem.name}</Text>
            <Text style={styles.item_text}>STUDENTS: {selectedItem.students}</Text>
          </View>
        </View>
        <FlatList
          data={array}
          renderItem={renderItem2}
          keyExtractor={item => item.id}
          />
      </View>
    );
  }

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: '', headerTitleAlign: 'center', unmountOnBlur: true }}/>
      <Stack.Screen name="Classes" component={ClassesScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
      <Stack.Screen name="Classes Details" component={DetailsScreen} options={{ headerTitleAlign: 'center', unmountOnBlur: true }}/>
    </Stack.Navigator>
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: 300,
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    color: 'black',
  },

  item_detail: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: 200,
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
    marginRight: 10,
    width: 100,
    height: 100,
  },
});
