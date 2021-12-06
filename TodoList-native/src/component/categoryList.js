import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function CategoryList(props) {
    // console.log('props data',props.data);
    // console.log(props.data.item.task_categories);
    // console.log('try cari status',props.data)

    const navigation = useNavigation();
    function fetchDetails() {
        navigation.navigate("Tasks", props.data)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={props.data.status === 1 ? styles.category_container : styles.container_hidden} onPress={() => fetchDetails()}>
                <Ionicons style={styles.icon} name="list" size={24} color="black" />
                <View style={styles.text}>
                    <Text >{props.task}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        // backgroundColor: 'white',
    },
    container_hidden: {
        display: 'none',
    },
    category_container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    text: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    }
}

export default CategoryList;