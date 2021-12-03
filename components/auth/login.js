
import React,{useState}from 'react'
import firebase from 'firebase';

import {Text,TextInput,KeyboardAvoidingView,StyleSheet, TouchableOpacity} from 'react-native'

export default function login({navigation}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleSignIn=()=>{
     firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then((result)=>{
        console.log(result)
    })
    .catch((error)=>{
        console.log(error)
    })
}
        
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
           
            <Text style={styles.Input}>EMAIL</Text>
           <TextInput style={styles.InputText}
           placeholder="Email"
           value={email}
           onChangeText={(text)=>setEmail(text)}
           />
           <Text style={styles.Input}> PASSWORD</Text>
           <TextInput style={styles.InputText}
           placeholder="Password"
           value={password}
           onChangeText={(password)=>setPassword(password)}
           secureTextEntry={true}/>
           <TouchableOpacity  
           onPress={()=> navigation.navigate('Register')} >
             <Text style={{color:'blue',marginTop:10,padding:10}}>If you haven't Register yet then GO TO REGISTER</Text>
            </TouchableOpacity>
           

            </KeyboardAvoidingView>
            )

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        
     
    },
    Input:{
        fontSize:12,
        color:'blue',
        marginTop:5

    },
    InputText:{
        borderWidth:2,
        borderColor:'black',
        borderRadius:5,
        margin:5,
        padding:5,width:'80%'
     

    }


            })

