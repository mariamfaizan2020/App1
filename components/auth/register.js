
import React ,{useEffect, useState}from 'react'
import firebase from 'firebase'
import {Text,TextInput,KeyboardAvoidingView,StyleSheet, TouchableOpacity,Platform,Button} from 'react-native'

export default function Register({navigation}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phoneNo,setPhoneNo]=useState('')

  




    const onSignUp=()=>{

         firebase.auth().createUserWithEmailAndPassword(email,password)
         .then(results=>{
             console.log("doc:",firebase.auth().currentUser.uid)
             firebase.firestore().collection('users')
             .doc(firebase.auth().currentUser.uid)
             .set({
                 name,
                 email,
                 phoneNo,
                 uid:firebase.auth().currentUser.uid
               
                
             })
             .then(results=>{
                 console.log(results)
             }).catch((err)=>{
                 console.log("err",err)
             })
          })
            .catch((error)=>{
                console.log(error)
            })
        }
        
    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Text style={styles.Input}>Create A User Name</Text>
             <TextInput 
             value={name}
             onChangeText={(name)=>setName(name)}
             style={styles.InputText}
           placeholder="Name"
           />
            <Text style={styles.Input}>Create An Email</Text>
           <TextInput 
           value={email}
           onChangeText={(text)=>setEmail(text)}
           style={styles.InputText}
           placeholder="Email"
           />
            <Text style={styles.Input}>Enter A Password</Text>
           <TextInput
           value={password}
           onChangeText={(password)=>setPassword(password)}
           style={styles.InputText}
           placeholder="Password"
           secureTextEntry={true}/>
            <Text style={styles.Input}>Enter Ur Phone#</Text>
           <TextInput 
           value={phoneNo}
           onChangeText={(phoneNo)=>setPhoneNo(phoneNo)}
           style={styles.InputText}
           placeholder="Contact Number"
           />
           <Button
           title="Register"
           onPress={()=>{onSignUp();navigation.navigate('Login')}}/>
    </KeyboardAvoidingView>
    )}
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
    