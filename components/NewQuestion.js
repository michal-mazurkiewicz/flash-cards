import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { white } from "../utils/colors";
import { addDeck, addQuestion } from "../actions";
import { connect } from "react-redux";
import { submitDeck, addQuestionToStorage } from "../utils/api";
import { styles } from "./NewDeck";

class NewQuestion extends Component {
  state = {
    question: "",
    answer: "",
  };

  onChangeQuestion = (question) => {
    this.setState({ question: question });
  };
  onChangeAnswer = (answer) => {
    this.setState({ answer: answer });
  };

  hadnleSubmit = () => {
    const question = this.state.question;
    const answer = this.state.answer;
    const { navigation } = this.props;
    const { deck, key, nQuestions } = this.props.route.params;
    const title = key;
    this.props.dispatch(
      addQuestion(key, {
        question: question,
        answer: answer,
      })
    );
    addQuestionToStorage(title, {question, answer});
    this.setState({ question: "", answer: "" });
    navigation.navigate("Deck", { deck, id: title, nQuestions: nQuestions + 1});
  };

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Add New Question</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Question"
          onChangeText={this.onChangeQuestion}
          defaultValue={this.state.title}
          onBlur={Keyboard.dismiss}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Answer"
          onChangeText={this.onChangeAnswer}
          defaultValue={this.state.title}
          onBlur={Keyboard.dismiss}
        />
        <TouchableOpacity
          disabled={question === "" || answer === ""}
          style={styles.saveBtn}
          onPress={this.hadnleSubmit}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(NewQuestion);
