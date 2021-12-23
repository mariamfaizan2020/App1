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
    console.log('DOCID:',docId)
    console.log('props',props)

   useLayoutEffect(()=>{
       fetchMessages()
   },[])

    const fetchMessages=()=>{
        firebase.firestore().collection('conversation')
        .doc(docId)
        .collection('messages')
        .orderBy('createdAt','desc')
        .onSnapshot((snapshot)=>{
            // setMessages(
                let arr=[]
            snapshot.docs.map((doc)=>{
                let obj={
                _id:doc.data()._id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text,
                // user:doc.data().user
                user: {
                    _id: doc.data().sender,
                    // name: friendname,
                    // avatar: 'https://placeimg.com/140/140/any',
                  }
                }
                arr.push(obj)
              
            })
            setMessages(arr)
            
        }
        
        )
        // return fetchMessages;
        // .get()
        // .then((snapshot)=>{
           
        //     if(!snapshot.empty){
        //         console.log('snapss1:',snapshot)
        //         const messages=snapshot.docs.map(doc=>{
        //            const data=doc.data()
        //            console.log("data:",doc.data())
        //            return data
        //         })
        //     }
           
        // })
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
                console.log('messageID',res)
            })
      

           
           
        },
        [],
    )
    return (
        <View style={{ flex: 1 }}>
   <GiftedChat 
   messages={messages}
   onSend={messages=>onSend(messages)}
   user={{
    _id:firebase.auth().currentUser?.uid,
    // name:firebase.auth().currentUser?.name,
    

   }} />
   
   {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>
    )
}

export default messages


