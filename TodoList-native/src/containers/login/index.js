import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../action';

function login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login)

  // console.log(props);
  // console.log(loginData);

  function signin() {
    let item = { email, password }
    console.log(item);
    dispatch(loginAction(item));

  }
  useEffect(()=> {
    if(loginData.data.code == 200){
      props.navigation.navigate("dashboard")
    }
  },[loginData.data.code])

  return (
    <View style={styles.container}>
      <View style={styles.input_holder}>
        <Text>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="email"
          keyboardType="default"
          onChangeText={(e) => setEmail(e)}
        />
        <Text>Password</Text>
        <TextInput
          value={password}
          style={styles.input}
          placeholder="password"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View style={styles.textRight}>
        <TouchableOpacity>
          {/* <Text >forgot password?</Text> */}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => signin()} >
          <Text>Login</Text>
        </TouchableOpacity>
        <View style={styles.newUser}>
          <Text>New user?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("register")}>
            <Text style={styles.register}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // paddingVertical: 20
  },
  input_holder: {
    width: '70%'
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    // width: '100%',
  },
  button: {
    backgroundColor: 'burlywood',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  newUser: {
    flexDirection: 'row'
  },
  register: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#009DAE',
  },
  textRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '50%',
    // paddingHorizontal: 100,
  },
}

export default login;