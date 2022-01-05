import React,{useState,useCallback,useLayoutEffect} from 'react'
import { View ,Platform,KeyboardAvoidingView,Image} from 'react-native'
import { GiftedChat ,Bubble,Actions} from 'react-native-gifted-chat'
import {Ionicons} from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'

require('firebase/firestore')










const messages = (props) => {
    const [image,setImage]=useState(null)
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
                // console.log('doc',doc.data())
                let obj={
                _id:Math.random(),
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text? doc.data().text:"",
                image:doc.data().image ?doc.data().image :"",
                user: {
                    _id: doc.data().sender,
                    name:doc.data().name
                    
                  }
                }
                arr.push(obj)
              
            })
            setMessages(arr)
            
        }
        
        )
     
    }
    
     
    const renderActions=(props)=>(

    <Actions
        {...props} 
        containerStyle={{
        position:'absolute',
        right:50,
        bottom:2,
        zIndex:9999
        }}
      onPressActionButton={HandlePhotoPicker}
        icon={()=>{
            return(
                <Ionicons name='camera' size={25} color='black'/>    
            )
         
        }}/>
       
        )
       
        
        const  HandlePhotoPicker=async ()=>{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });
          
              console.log("uriiiiii",result.uri);

              if(!result.cancelled){
                const path=`${docId}/${Math.random.toString(36)}`
                const response=await fetch(result.uri)
                const blob=await response.blob()
                const task= await firebase
                .storage()
                .ref('messages/')
                .child(path)
                .put(blob)
                .then(async(res)=>{
               
                  console.log('res',res)
        
                  console.log("fb img",res.ref.getDownloadURL())
                  let imageURL=await res.ref.getDownloadURL()
                  console.log('image',imageURL)
                  return imageURL
                
                })
              
                setImage(task)
                console.log('URL:',task)
                
              } 
            
            console.log('iamge:::',image)
            }
              
             
      
       
   
       
           
          
          
                
        

               
      


 const onSend= 

 
 useCallback(
    (messages=[],img) => {
        console.log("ons send")
         const {text}=messages[0];
         console.log("msg",messages[0])
         firebase.firestore().collection('conversation')
         .doc(docId)
         .collection('messages')
         .add({
             createdAt:new Date(),
             text:text,
             sender:firebase.auth().currentUser.uid,
             image:image
          
            
         })
         .then((res)=>{
             firebase.firestore().collection('conversation')
             .doc(docId)
             .update({
                 LastMessage:text,
                 createdAt:new Date()
             })
         })
        }
        ,
    
        [],
    
        )
   
   
    
    return (
        <View style={{ flex: 1 }}>
       
   <GiftedChat 
   alwaysShowSend

   renderUsernameOnMessage
    renderActions={renderActions}
   messages={messages}
//    onSend= {messages=>{image? onImageSend(image):onSend(messages)}}
onSend={messages=>onSend(messages,image)}
   
   renderBubble={(props)=>(
   <Bubble
   {...props}
   textStyle={{right:{color:'white'}}}
   wrapperStyle={{right:{backgroundColor:'#42f5c5'}}}/>)}
   
   user={{
    _id:firebase.auth().currentUser?.uid,


   }} />
   
   {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>
    )
}

export default messages


