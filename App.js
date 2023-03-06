import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import {AsyncStorage} from 'react-native';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator()

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
})

function HomeScreen({navigation}) {

  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState(() => {
    const toDoList = async () => {
      try {
        const value = await AsyncStorage.getItem('toDoList');
        if (value !== null) {
          // We have data!!
          return value
        }
      } catch (error) {
        // Error retrieving data
        throw error
      }
    };

    return toDoList.length !== 0 ? JSON.parse(toDoList) : [];
  })

  const handleAddTodo = () => {
    setTodoList([...todoList, input])
    
  } 

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'toDoList:'+JSON.stringify(todoList)
      );
    } catch (error) {
      // Error saving data
      throw error
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Add todo'
          value={input}
          onChangeText={(newText) => setInput(newText)}
        />
        <Button title="Add" onPress={handleAddTodo}></Button>
        <Text>{input}</Text>
        {todoList.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View >
    </ScrollView>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

