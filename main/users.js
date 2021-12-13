import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'

import firebase from 'firebase'

require('firebase/firestore')




const Users = () => {
    const [users,setUsers]=useState([])
useEffect(()=>{
    fetchUsers()
},[])

    const fetchUsers=()=>{
        firebase.firestore()
        .collection('users')
        .onSnapshot((snapshot)=>{
        // .get()
        // .then((snapshot)=>{
            console.log("snapsht",snapshot)
            let users =snapshot.docs.map(doc=>{
                const data=doc.data();
                return data
            });
            // console.log("users",data)
            setUsers(users)
        })
    }
console.log("users",users)
    
    return (
        <View style={{marginTop:20}}>
            
           <FlatList
           numColumns={1}
           horizontal={false}
           data={users}
           keyExtractor={(item)=>item.email}
           renderItem={({item})=>{
               return(
               <View style={{backgroundColor:'lightgrey',padding:10,margin:10}}>
            <Text>Name: {item.name}</Text>
            <Text>Email:{item.email}</Text>
            <Text>Phone :{item.phoneNo}</Text>
            {/* <View style={{position:'absolute'}}>
            <Image>{item.image}</Image>
            </View> */}
            </View>
               )
           }}
        

           />
        </View>
    )
}



const styles = StyleSheet.create({})



export default Users


