import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';
import TaskList from '../../component/taskList';
import {API_URL} from '../../types';
import {useIsFocused} from '@react-navigation/native'

// const API_URL = 'http://51ff-180-74-65-214.ngrok.io';

function Tasks(props) {
    // console.log('this is props tasks',props);

    const token = useSelector((state) => state.login.token);
    // console.log(token)

    const params = props.route.params;
    const category_id = props.route.params.id;
    const category_name = props.route.params.task_category;
    const user_id = props.route.params.user_id;
    const category_status = props.route.params.status;

    // console.log('params', params)

    const [task, getTask] = useState("");
    // console.log('task item', task);

    const [addtask, newTask] = useState("");

    function retrieveTask() {
        axios.get(`${API_URL}/api/gettask/${category_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(function (response) {
                console.log('abc');
                getTask(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function addNewTask() {
        axios.post(`${API_URL}/api/newTask/${category_id}`, {
            todo_tasks: addtask,
            token: token
        })
            .then(function (response) {
                newTask(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function onDelete(task_id) {
        axios.put(`${API_URL}/api/deletetask/${task_id}`, {
            token: token
        })
            .then(function (response) {
                console.log(response);
                retrieveTask();
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }

    useEffect(() => {
        if (params !== {}) {
            retrieveTask()
        }
    }, [addtask]); //addtask category_status

    // useEffect(() => {
    //         console.log('try apa apa tengok jadi')
    //         // retrieveTask()
        
    // }, [category_status]);

    // const x = useIsFocused();
    // x && setTimeout(() => retrieveTask(),5000);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{category_name}</Text>
            <View style={styles.addtask_holder}>
                <TextInput
                    style={styles.task_input}
                    placeholder='New Task'
                    keyboardType='default'
                    onChangeText={(ele) => newTask(ele)}
                />
                <TouchableOpacity style={styles.task_btn} onPress={() => addNewTask()}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <SwipeListView
                        data={task.data}
                        renderItem={(data, rowMap) => (
                            <TaskList
                            
                                style={styles.rowFront}
                                data={data.item}
                                task={data.item.todo_tasks}
                                retrieveTask={retrieveTask}
                            />
                        )}
                        // refreshControl={
                        //     <RefreshControl 
                        //     refreshing={refresh} 
                        //     onRefresh={() => onRefresh()} 
                        //     tintColor="red"
                        //     title='Sabar jap'
                        //     titleColor="red"
                        //     />
                        // }
                        renderHiddenItem={(data, rowMap) => {
                            // console.log('data task hidden',data);
                            return (
                                <View style={data.item.status === 0 ? styles.hiddenRowBack : styles.rowBack }>
                                    {/* <Text>Left</Text> */}
                                    <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(data.item.id)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        // leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingHorizontal: 40
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    addtask_holder: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    task_input: {
        marginVertical: 10,
        marginRight: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1, 
        width: '70%',
    },
    task_btn: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'burlywood',
        justifyContent: 'center',
    },
    deleteBtn: {
        width: 75,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: 'white',
        backgroundColor: '#CD1818',
        justifyContent: 'center',
        height: 100,
    },
    // rowFront: {
    //     alignItems: 'center',
    //     backgroundColor: '#CCC',
    //     justifyContent: 'center',
    //     height: 50,
    //     borderBottomColor: 'black',
    //     borderBottomWidth: 1
    // },
    hiddenRowBack: {
        display: 'none',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1
    }
}

export default Tasks;