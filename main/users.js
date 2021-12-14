import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,Image,TouchableOpacity} from 'react-native'

import firebase from 'firebase'

require('firebase/firestore')




const Users = ({navigation}) => {
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
        <View style={{marginTop:20,flex:1
             }}>
            
           <FlatList 

           numColumns={1}
           horizontal={false}
           data={users}
           keyExtractor={(item)=>item.email}
           renderItem={({item})=>{
               console.log("image",item)
               return(
                   <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
                        <View style={{backgroundColor:'lightgrey',padding:10,margin:10,flexDirection:'row'}}>
                    <View >
                     {item.image ? <Image source={{ uri: item.image }} style={{width:50,height:50,borderRadius:360}} /> : <FontAwesome name="user" size={50} color= '#0798f2'/>}
                     </View>
                   <View style={{justifyContent:'center',alignItems:'center',paddingLeft:10}}>
                   {/* <Text> {item.name}</Text> */}
                   <Text>{item.email}</Text>
                   {/* <Text>{item.phoneNo}</Text> */}
                   </View>
                   </View>

                   </TouchableOpacity>

              
           
           
          
               )
           }}
        

           />
        </View>
    )
}



const styles = StyleSheet.create({})



export default Users


