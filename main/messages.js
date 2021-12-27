import React,{useState,useCallback,useLayoutEffect} from 'react'
import { StyleSheet, Text, View ,Platform,KeyboardAvoidingView} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'

require('firebase/firestore')





const messages = (props) => {

    const [messages,setMessages]=useState([]);
    const docId=props.route.params.docId
    const friendname=props.route.params.friendname
    const friendUid=props.route.params.friendUid
    // console.log('DOCID:',docId)
    // console.log('props',props)
    console.log("144444444",props.route.params)

   useLayoutEffect(()=>{
       fetchMessages()
   },[])

    const fetchMessages=()=>{
        firebase.firestore().collection('conversation')
        .doc(docId)
        .collection('messages')
        .orderBy('createdAt','desc')
        .onSnapshot((snapshot)=>{
      
                let arr=[]
            snapshot.docs.map((doc)=>{
                let obj={
                _id:doc.data()._id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text,
             
                user: {
                    _id: doc.data().sender,
                    
                  }
                }
                arr.push(obj)
              
            })
            setMessages(arr)
            
        }
        
        )
     
    }
        
    const onSend = useCallback(
        (messages=[]) => {
           
            const {text}=messages[0];
            firebase.firestore().collection('conversation')
            .doc(docId)
            .collection('messages')
            .add({
                createdAt:new Date(),
                text:text,
                sender:firebase.auth().currentUser.uid
            })
            .then((res)=>{
                firebase.firestore().collection('conversation')
                .doc(docId)
                .update({
                    LastMessage:text,
                    createdAt:new Date()
                })
            })
      

           
           
        },
        [],
    )
    return (
        <View style={{ flex: 1 }}>
   <GiftedChat 
   messages={messages}
   onSend={messages=>onSend(messages)}
   renderUsernameOnMessage={true}
   user={{
    _id:firebase.auth().currentUser?.uid,
    name:firebase.auth().currentUser?.name
    

   }} />
   
   {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>
    )
}

export default messages


