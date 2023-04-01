import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
export default function App() {
  // State variables
  const [goals, setGoals] = useState("");
  const [listOfGoals, setListOfGoals] = useState([]);
  const [done, setDone] = useState(new Map());
  // Function to mark a goal as done
  function handleDone(goal) {
    const newDone = new Map(done);
    newDone.set(goal, true);
    setDone(newDone);
  }
  // Function to handle the "Add Goal" button press
  function handleClick() {
    setListOfGoals([...listOfGoals, goals]);
    setGoals("");
  }
  // Function to handle a goal press (toggling it as done/undone)
  function handleGoalPress(goal){
    const newDone=new Map(done);
    newDone.set(goal,!newDone.get(goal));
    setDone(newDone);
  }
  return (
    <View style={styles.appContainer}>
      {/* Input section */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          value={goals} 
          placeholder='Enter your goal' 
          onChangeText={(text) => { setGoals(text) }} 
        />
        <Button title='Add Goal' onPress={handleClick} />
      </View>

      {/* Goals list */}
      <View style={styles.goalsContainer}>
        <FlatList 
          data={listOfGoals} 
          alwaysBounceVertical={false} 
          renderItem={(itemData)=>{
            return(
              <View style={styles.listContainer} key={itemData.item}>
                <View style={styles.textContainer}>
                  <Pressable onPress={()=>{ handleGoalPress(itemData.item) }}>
                    <Text style={done.get(itemData.item) ? styles.strikethroughText : null}>{itemData.item}</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  appContainer: {
    padding: 70,
    flex: 1
  },
  inputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    marginBottom: 24,
    flex: 1
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 5,
    padding: 5
  },
  goalsContainer: {
    flex: 4
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  strikethroughText: {
    textDecorationLine: 'line-through'
  }
});
