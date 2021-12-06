import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import CategoryList from '../../component/categoryList';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../action';
import { API_URL } from '../../types';
import { useIsFocused } from '@react-navigation/native'

// const API_URL = 'http://51ff-180-74-65-214.ngrok.io';

function dashboard(props) {

    const user = useSelector((state) => state.login)
    const id = useSelector((state) => state.login.id)
    const token = useSelector((state) => state.login.token)
    const data = useSelector((state) => state.login.data)

    const dispatch = useDispatch();
    const [item, getItem] = useState("");
    const [category, newCategory] = useState("");

    // const [refresh,setRefresh] = useState(false);

    // function onRefresh() {
    //     console.log('App is loading');
    //     setRefresh(true);
    //     setTimeout(() => {
    //         setRefresh(false);
    //     },2000)
    // };

    // const authAxios = axios.create({
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // })

    function submit() {
        // dispatch(fetchList(id));
        // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.get(`${API_URL}/api/getlist/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                getItem(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function addCategory() {
        axios.post(`${API_URL}/api/createlist/${id}`, {
            task_category: category,
            token: token
        })
            .then(function (response) {
                newCategory(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    function onDelete(data) {
        let category_id = data.id;
        let category_status = data.status;
        console.log('cat id ...',category_id)
        console.log('cat status ...',category_status)
        axios.put(`${API_URL}/api/deletelist/${category_id}`, {
            token: token
        })
            .then(function (response) {
                console.log('response from delete action',response);
                submit();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTask, setCompletedTask] = useState();

    function onCount() {
        axios.get(`${API_URL}/api/retrieve/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                // return response;
                // console.log(response);
                setPendingTasks(filterPendingTask(response));
                setCompletedTask(filterCompletedTask(response));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // let x = setPendingTasks(filterPendingTask(onCount()));
    // let y = setCompletedTask(filterCompletedTask(onCount()));

    function filterPendingTask(data) {
        return (data.data.filter((obj) => {
            if (obj.status === 1) {
                // console.log('pending task',obj);
                return obj;
            }
        }))
    };

    function filterCompletedTask(data) {
        return (data.data.filter((obj) => {
            if (obj.status === 2) {
                // console.log('completed object',obj);
                return obj;
            }
        }))
    };

    // console.log('total pending tasks', pendingTasks);
    // console.log('total completed tasks', completedTask);

    // console.log('test item dot data',item.data);
    // console.log('itemsssss', item);

    useEffect(() => {
        if (token == '') {
            props.navigation.navigate("login")
        } else {
            submit();
        }
    }, [token, category]);

    useEffect(() => {
        if (pendingTasks !== '' && completedTask !== '') {
            onCount()
        }
    }, [item])

    // let submitRetrieve = useIsFocused();
    // submitRetrieve && setTimeout(() => submit(), 1000);

    // submitRetrieve = false;

    // let countNum = useIsFocused();
    // countNum && setTimeout(() => onCount(),1000);

    // countNum = false;

    React.useEffect(() => {
        const renderOnce = props.navigation.addListener('focus', () => {
            onCount()
        });

        return renderOnce;
    }, [props.navigation]);



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.rightSide}>
                <TouchableOpacity style={styles.logout} onPress={() => dispatch(logout(user))}>
                    <Text style={styles.textColor}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.task_container}>
                <View style={styles.task_holder}>
                    <Text style={styles.pendingtaskHeader}>Pending Tasks</Text>
                    <Text style={styles.pendingtaskCount}>{pendingTasks && pendingTasks.length}</Text>
                </View>
                <View style={styles.task_holder}>
                    <Text style={styles.completedtaskHeader}>Completed Tasks</Text>
                    <Text style={styles.completedtaskCount}>{completedTask && completedTask.length}</Text>
                </View>
            </View>
            <View style={styles.list_header}>
                <Text style={styles.font_mylist}>My List</Text>
            </View>
            <View style={styles.input_item}>
                <TextInput
                    // value={category}
                    style={styles.input}
                    placeholder="Add category"
                    keyboardType="default"
                    onChangeText={(e) => newCategory(e)}
                />
                <TouchableOpacity style={styles.btn} onPress={() => addCategory()}>
                    <Text style={styles.textColor}>Add List</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.list_header}>
                <View>
                    <Text>My List</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.listbtn}>
                        <Text>Add List</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            {/* <TouchableOpacity >
                <Text>Submit</Text>
            </TouchableOpacity> */}
            <ScrollView>
                <View style={styles.list_container}>
                    <SwipeListView
                        data={item.data}
                        renderItem={(data, rowMap) => (
                            <CategoryList
                                style={styles.rowFront}
                                data={data.item}
                                task={data.item.task_category}
                            />
                        )}
                        // refreshControl={
                        //     <RefreshControl 
                        //     refreshing={refresh} 
                        //     onRefresh={() => onRefresh()} 
                        //     tintColor="blue"
                        //     title='Sabar jap'
                        //     titleColor="blue"
                        //     />
                        // }
                        renderHiddenItem={(data, rowMap) => {
                            // console.log('data hidden in dashboard',data);
                            return (
                                <View style={data.item.status !== 1 ? styles.rowBackHidden : styles.rowBack}>
                                    {/* <Text>Left</Text> */}
                                    <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(data.item)}>
                                        <Text style={styles.textColor}>Delete</Text>
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
        // justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 40,
        paddingBottom: 20
    },
    rightSide: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    logout: {
        justifyContent: 'center',
        backgroundColor: 'burlywood',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10,
    },
    pendingtaskCount: {
        textAlign: 'right',
        // color: '#009DAE',
        fontWeight: 'bold',
        fontSize: 20
    },
    completedtaskCount: {
        textAlign: 'right',
        // color: '#009DAE',
        fontWeight: 'bold',
        fontSize: 20
    },
    task_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    task_holder: {
        width: '45%',
        borderWidth: 1,
        // marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    pendingtaskHeader: {
        fontSize: 20,
        color: '#CD1818',
    },
    completedtaskHeader: {
        fontSize: 20,
        color: 'green',
    },
    input_item: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    input: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '70%',
    },
    textColor: {
        // color: '#ECECEC',
        color: 'black',
    },
    btn: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'burlywood',
        justifyContent: 'center',
        // width: '25%',
    },
    list_header: {
        marginVertical: 10,
    },
    font_mylist: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    list_container: {
        justifyContent: 'center',
        // width: '100%',
    },
    deleteBtn: {
        width: 75,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: 'white',
        backgroundColor: '#CD1818',
        justifyContent: 'center',
        height: 150,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: '#CD1818',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1
    },
    rowBackHidden: {
        display: 'none',
    }
}

export default dashboard;