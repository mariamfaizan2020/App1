import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,Image,TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import { Entypo } from '@expo/vector-icons'; 


import firebase from 'firebase'


require('firebase/firestore')
require('firebase/firebase-storage')




const Users = ({navigation,currentUser},props) => {
    const [users,setUsers]=useState([])
useEffect(()=>{
    fetchUsers()
},[])

    const fetchUsers=()=>{
        console.log("uis",firebase.auth().currentUser)
//
        if(firebase.auth().currentUser){
            console.log("uid",firebase.auth().currentUser)
            firebase.firestore()
            .collection('users')
            .where("uid","!=",firebase.auth().currentUser.uid)
    
            // .onSnapshot((snapshot)=>{
            .get()
            
            .then((snapshot)=>{
                console.log("snapsht",snapshot)
                let users =snapshot.docs.map(doc=>{
                    
                        const data=doc.data();
                    // if(data.uid!==firebase.auth().currentUser.uid){
                        console.log('data',data.uid)
                        return data
                    // }
                  
                });
                // console.log("users",data)
                setUsers(users)
            })
           
        }
       
    }
    const createConv=(item)=>{
        
            firebase.firestore().collection('conversation')
            .where(`parties.${item.uid}`,'==',true)
            .where(`parties.${currentUser.uid}`,'==',true)
            .limit(1)
            .get()
            .then((snapshot)=>{
                if(!snapshot.empty){
                    console.log('snap:',snapshot)
                    navigation.navigate('messages',{
                        docId:snapshot.docs[0].id,
                        friendname:item.name,
                        friendUid:item.uid,
                  
                    })
                    // console.log('DOCID:',friendname)
                }else{
                    firebase.firestore()
                    .collection('conversation')
                    .add({
                    
                        createdAt: new Date(),
                     
                        parties:{
                           [`${item.uid}`]:true,
                           [`${currentUser.uid}`]:true, 
                        },
                        partyIds:[
                            `${item.uid}`,
                            `${currentUser.uid}`
            
                        ],
                        partyInfo:{
                            [`${item.uid}`]:{
                                name:item.name,
                                uid:item.uid
                            },
                            [`${currentUser.uid}`]:{
                                name:currentUser.name,
                                uid:currentUser.uid
                            }
                        },
                        // UserId:
            
                        
            
                    })
                .then((res)=>{
                    console.log('res:',res)
                    firebase.firestore().collection('conversation')
                    .doc(res.id)
                    .update({
                        cid:res.id
                    })
                })
                

                }
              
           
        })
            
           
        }

        
       
console.log("userppps",users)
console.log("prps",props)
console.log("currentUser",currentUser)

    
    return (
        <View style={{marginTop:20,flex:1
             }}>
            
           <FlatList 

           numColumns={1}
           horizontal={false}
           data={users}
           keyExtractor={(item,index)=>index.toString()}
           renderItem={({item})=>{
               console.log("image",item)
               return(
                   <TouchableOpacity onPress= {()=>navigation.navigate('usersProfile',{
                      data:item
                    } )}>
                          <View style={{backgroundColor:'lightgrey',padding:10,margin:10,flexDirection:'row'}}>
                    <View >
                     {item.image ? <Image source={{ uri: item.image }} style={{width:50,height:50,borderRadius:360}} /> : <FontAwesome name="user" size={50} color= '#0798f2'/>}
                     </View>
                   <View style={{ flex:1,justifyContent:'center',alignItems:'flex-start',paddingLeft:10}}>
                   {/* <Text> {item.name}</Text> */}
                   <Text style={{marginTop:15}}>{item.email}</Text>
                   <TouchableOpacity onPress={()=>{createConv(item)}} style={{alignSelf:'flex-end'}}>
                   <Entypo name="chat" size={24} color="black" />
                       </TouchableOpacity>
                 
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



const mapStateToProps=(store)=>{
    console.log("store",store)
    return {
        currentUser:store.userState.currentUser
    }}
        
export default connect(mapStateToProps,null)(Users);





