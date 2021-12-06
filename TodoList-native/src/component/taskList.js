import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../types';

// const API_URL = 'http://51ff-180-74-65-214.ngrok.io';

function TaskList(props) {
    // console.log('props in task component',props)
    const token = useSelector((state) => state.login.token);
    const task_id = props.data.id;
    console.log('props data status',props.data.status);
    const [status, setStatus] = useState(props.data.status);

    useEffect(() => {
        console.log(status);
        props.retrieveTask();
    }, [status])

    function completed() {
        console.log('task id...',task_id)
        if (status === 1) {
            axios.put(`${API_URL}/api/completedtask/${task_id}`, {
                token: token
            })
                .then(function (response) {
                    console.log('response of completed',response);
                    setStatus(2);

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (status === 2) {
            axios.put(`${API_URL}/api/incompletetask/${task_id}`, {
                token: token
            })
                .then(function (response) {
                    console.log(response);
                    setStatus(1);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // useEffect(()=> {

    // }, [task_id,status])

    return (
        <View style={props.data.status === 0 ? styles.task_hidden : styles.task_holder}>
            <TouchableOpacity style={status === 1 ? styles.incomplete : styles.completed} onPress={() => completed()}></TouchableOpacity>
            <View style={status === 1 ? styles.text : styles.textComplete}>
                <Text>{props.task}</Text>
            </View>
        </View>
    );
}

const styles = {
    task_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    task_hidden: {
        display: 'none',
        // backgroundColor: 'yellow',
    },
    incomplete: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    completed: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#FFCC1D',
    },
    text: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    textComplete: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        paddingHorizontal: 10,
        justifyContent: 'center',
    }
}

export default TaskList;