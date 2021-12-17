import React,{useState,useCallback} from 'react'
import { StyleSheet, Text, View ,Platform} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'


const chat = () => {
    const [messages,setMessages]=useState([]);


    const onSend = useCallback(
        (messages=[]) => {
            setMessages(previousMessages=>GiftedChat.append(previousMessages,messages))
        },
        [],
    )
    return (
        <View style={{ flex: 1 }}>
   <GiftedChat 
   messages={messages}
   onSend={messages=>onSend(messages)}/>
   {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>
    )
}

export default chat

const styles = StyleSheet.create({})
