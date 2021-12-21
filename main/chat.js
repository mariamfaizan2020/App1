import React,{useState,useCallback} from 'react'
import { StyleSheet, Text, View ,Platform} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
require('firebase/firestore')



const chat = () => {
    const [messages,setMessages]=useState([]);


    const onSend = useCallback(
        (messages=[]) => {
            setMessages(previousMessages=>GiftedChat.append(previousMessages,messages));
            firebase.firestore()
            .collection('conversation')
            .add({
                cid:'',
                createdAt:'',
                lastMessage:'',
                lastMessageTime:'',
                parties:{

                },
                partyIds:{

                },
                partyInfo:{

                },
                UserId:{

                }

            })
            .then((snapshot)=>{
                console.log("snapshoot",snapshot)
                let conversation =snapshot.docs.map(doc=>{
                    const data=doc.data();
                      console.log('data111',data.uid)
                        return data

            })
           .doc(data.uid)
           .collection('messages')
                   .add({
                    createdAt: new Date(),
                    sender:firebase.auth().currentUser?.uid,
                    text:'',
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
   user={{
    _id:firebase.auth().currentUser?.uid,
    name:firebase.auth().currentUser?.name,

   }} />
   
   {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>
    )
}

export default chat


