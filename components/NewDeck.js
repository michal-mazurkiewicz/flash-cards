import {
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { white } from "../utils/colors";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import { submitDeck } from "../utils/api";

class NewDeck extends Component {
  state = {
    title: "",
    questions: [],
  };

  onChange = (title) => {
    this.setState({ title: title });
  };

  hadnleSubmit = () => {
    const key = this.state.title;
    const deck = this.state;

    this.props.dispatch(
      addDeck({
        [key]: deck,
      })
    );
    this.setState({ title: "" });
    submitDeck({ deck, key });

    // redirect Home
  };

  render() {
    return (
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Add New Deck</Text>

          <TextInput
            style={styles.textInput}
            placeholder="New Deck Title"
            onChangeText={this.onChange}
            defaultValue={this.state.title}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={this.hadnleSubmit}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
          <Text>{this.state.title}</Text>
        </View>
    );
  }
}

export const styles = StyleSheet.create({
  saveBtn: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },
  saveBtnText: {
    color: white,
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    paddingTop: 20,
    justifyContent: 'center'
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    textAlign: "center",
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default connect()(NewDeck);