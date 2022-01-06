import React,{useState,useCallback,useLayoutEffect} from 'react'
import { View ,Platform,KeyboardAvoidingView,Image,TouchableOpacity} from 'react-native'
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
            // appendMessages(messages)
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
        
                
              } 
            
            console.log('iamge:::',image)
            }
              
   
       
   
       
           
const  appendMessages = useCallback(
    (messages)=>{
        setMessages((previousMessages)=>
        GiftedChat.append(previousMessages,messages))

    },[]
)      

 const onSend= useCallback(
     (messages=[])=>{

  
    console.log("mesg",messages)
    console.log("props",props)

   const  {text,image}=messages[0]

    firebase.firestore().collection('conversation')
     .doc(docId)
     .collection('messages')
     .add({
         createdAt:new Date(),
         text:text,
         sender:firebase.auth().currentUser.uid,
         image:image? image:null
      
         
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
   
     ,[]
 )
    
       
    
   
   
    
    return (
        <View style={{ flex: 1 }}>
       
   <GiftedChat 
   alwaysShowSend
   renderActions={renderActions}
   messages={messages}
   onSend={messages => onSend(messages)}
// onSend=
//    {props=>{
//        console.log("props12",props)
//     // const {text,messageIdGenerator,user}= props
//     const  {text,image,messageIdGenerator,user}=props[0]
//        onSend({
//                         createdAt:new Date(),
//                             text:text,
//                         sender:firebase.auth().currentUser.uid,
//                         image:image
//                        })
//    }}
   renderSend={(props)=>{
       const {text,messageIdGenerator,user,onSend}= props
       return(
           <TouchableOpacity 
           style={{
               height:40,
               width:40,
               borderRadius:40,
               backgroundColor:'#0798f2',
               alignItems:'center',
               justifyContent:'center',
               marginBottom:5}}
               onPress={()=>{
                onSend({
                    createdAt:new Date(),
                    text:text?text:"",
                    sender:firebase.auth().currentUser.uid,
                    image:image?image:""
                   })
                //    if(text && onSend){
                      
                //     }
                    
                      
               }}
               >
               <Ionicons name="send" size={20} color='white'/>
           </TouchableOpacity>
       )
   }}
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


