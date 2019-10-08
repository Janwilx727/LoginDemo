import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput, 
  Button, 
  ScrollView 
} from 'react-native';

import { 
  FIRST_NAME,
  LAST_NAME,
  CELL,
  EMAIL,
  PASSWORD,
  PASSWORD_CONFIRM 
} from './src/constants/register';

import 
  emailValidation
from './src/utilities/validation';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      title: 'Login Demo',
      firstName: '',
      lastName: '',
      cell: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      validEmail: true,
      validForm: true
    }
  }

  render(){

    const {
      title,
      firstName,
      lastName,
      cell,
      email,
      password,
      passwordConfirmation,
      validEmail,
      validForm
    } = this.state;

    onTextChange = (payload) => {
      switch(payload.field)
      {
        case FIRST_NAME:
          this.setState({firstName: payload.text, validForm: true});
          break;
        case LAST_NAME:
          this.setState({lastName: payload.text, validForm: true});
          break;
        case EMAIL:
          if (payload.text === undefined || payload.text === '') {
            this.setState({validEmail: true, email:payload.text, validForm: true});
            return
          }
          const valid = emailValidation({text: payload.text, field: EMAIL});
          this.setState({validEmail: valid, email: payload.text, validForm: true});
          break;
        case CELL:
          this.setState({cell: payload.text, validForm: true});
          break;
        case PASSWORD:
          this.setState({password: payload.text, validForm: true});
          break;
        case PASSWORD_CONFIRM:
            this.setState({passwordConfirmation: payload.text, validForm: true});
          break;
      }
    }

    ValidateForm = () => {
      console.log('onButtonPress');
      if(password !== passwordConfirmation || !validEmail || password === '' || passwordConfirmation === '')
      {
        console.log('inside if-statement');
        this.setState({validForm: false}); 
        return;
      }
    }

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.flex}>

            <Text style={[styles.text, { marginBottom: 10 }]}>
              {title}
            </Text>

            <TextInput  label={'Name'}
                        placeholder="Name"
                        style={styles.inputText}
                        value={firstName}
                        onChangeText={text => onTextChange({ text, field: FIRST_NAME })} />
                        
            <TextInput  label={'Surname'}
                        placeholder="Surname"
                        style={styles.inputText}
                        onChangeText={text => onTextChange({ text, field: LAST_NAME })} />

            <TextInput  label={'Cellphone number'}
                        placeholder="Cellphone number"
                        style={styles.inputText}
                        onChangeText={text => onTextChange({ text, field: CELL })} />

            {!validEmail && (
              <Text style={[styles.text, {color: '#ff0000'}]} >There is an error with the email</Text>
              )}

            <TextInput  label={'Email Address'}
                        placeholder="Email Address"
                        keyboardType={'email-address'}
                        style={styles.inputText}
                        onChangeText={text => onTextChange({ text, field: EMAIL })} />

            <TextInput  label={'Password'}
                        placeholder="Enter Password"
                        style={styles.inputText}
                        onChangeText={text => onTextChange({ text, field: PASSWORD })} />

            <TextInput  label={'Confirm Password'}
                        placeholder="Confirm Password"
                        style={styles.inputText}
                        onChangeText={text => onTextChange({ text, field: PASSWORD_CONFIRM })} />

            {!validForm && (
              <Text style={{color: '#ff0000', fontSize: 15}}>Invalid form data</Text>
            )}

            <Text style={[styles.text, { fontSize: 10, marginTop: 10 }]}>
                KEEP ME SIGNED IN
            </Text>

            <Button title="ALREADY A MEMBER? SIGN IN"
                    onPress={() => ValidateForm()}
                    fontSize={10} />
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35
  },
  logo: {
    width: 300,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5
  },
  text: {
    fontWeight: 'bold',
  },
  errorWrapper: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center'
  },
  inputText: {
    height: 40,
    margin: 15,
    borderColor: '#000000',
    borderWidth: 1,
    width: '80%',
    padding: 10
  }
});
