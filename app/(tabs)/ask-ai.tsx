import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import * as Types from '../../interface/interface';
import * as Database from '../../database/database';

export default function AskAI() {
  const [medAndDescDataFromDB, setMedAndDescDataFromDB] = useState<Types.MedicineWithDescription[]>([]);
  const [overdueMedicineDataFromDB, setOverdueMedicineDataFromDB] = useState<Types.OverdueMedicine[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // Add this state
  useEffect(() => {
      // Fetch products when the component mounts
      Database.fetchAllMedAndDesc().then((data) => {
        setMedAndDescDataFromDB(data ?? []);  // Set the fetched data into the state, fallback to an empty array if null
        //console.log('Fetched medicine and description:', data);
      }).catch((error) => {
        console.error('Error fetching medicine and description:', error);
      });
      Database.getOverdueMedicines().then((data) => {
        setOverdueMedicineDataFromDB(data ?? []);  // Set the fetched data into the state, fallback to an empty array if null
        //console.log('Fetched medicine and description:', data);
      }).catch((error) => {
        console.error('Error fetching medicine and description:', error);
      });
    }, []); 

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    // Placeholder response logic
    if (input.trim() === '') {
      setResponse('Please enter a question.');
    } else {
      setResponse(`You asked: "${input}"\nThis is a placeholder response from AI.`);
    }
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.text, styles.headerText]}>Ask AI Anything</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={input}
        onChangeText={setInput}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAsk}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {response !== '' && (
        <View style={styles.responseBox}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  responseBox: {
    width: '100%',
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});
