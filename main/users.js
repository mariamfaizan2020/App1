import React, {useState} from 'react'
import { StyleSheet, Text, View ,FlatList} from 'react-native'

import firebase from 'firebase'

require('firebase/firestore')




const Users = () => {
    // const [users,setUsers]=useState([])

    // const fetchUsers=()=>{
    //     firebase.firestore()
    //     .collection('users')
    //     .doc(uid)
    //     .get()
    //     .then((snapshot)=>{
    //         let users =snapshot.docs.map(doc=>{
    //             const data=doc.data();
    //             return data
    //         });
    //         console.log("users",data)
    //         setUsers(users)
    //     })
    // }

    
    return (
        <View>
            
           {/* <FlatList
           numColumns={1}
           horizontal={false}
           data={users}
        //    keyExtractor={()=>tem.toString}
           renderItem={({user})=>{
               <View>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phoneNo}</Text>
            </View>
           }}

           /> */}
        </View>
    )
}



const styles = StyleSheet.create({})



export default Users


