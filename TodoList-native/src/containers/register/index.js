import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {API_URL} from '../../types';

function register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signup() {
        console.log(name, email, password);
        // const API_URL = 'http://51ff-180-74-65-214.ngrok.io';
        axios.post(`${API_URL}/api/register`, {
            name: name,
            email: email,
            password: password,
        })
            .then(function (response) {
                console.log(response);
                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.input_holder}>
                <Text>Name</Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="name"
                    keyboardType="default"
                    onChangeText={(e) => setName(e)}
                />
                <Text >Email</Text>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="email"
                    keyboardType="default"
                    onChangeText={(e) => setEmail(e)}
                />
                <Text >Password</Text>
                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder="password"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}
                />
            </View>
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => signup()} >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.existingUser}>
                    <Text>Already have account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("login")}>
                        <Text style={styles.login}> Login</Text>
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
    },
    input_holder: {
        width: '70%'
      },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10
    },
    button: {
        backgroundColor: 'burlywood',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 50,
        width: '50%',
        // margin: '10px auto',
        // justifyContent: 'center'
    },
    existingUser: {
        flexDirection: 'row'
    },
    login: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#009DAE',
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default register;