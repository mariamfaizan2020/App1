
import React ,{useState}from 'react'
import firebase from 'firebase'
import {Text,TextInput,KeyboardAvoidingView,StyleSheet, TouchableOpacity} from 'react-native'

export default function Register({navigation}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSignUp=()=>{
        firebase.auth()
        .createemailAndPAssword(email,password)
        .then((result)=>{
            firebase.firestore().collection('users')
            .doc(firebase.auth.currentUser.uid)
            .set({
                name,
                email
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        
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
            <Text style={styles.Input}>Create A Password</Text>
           <TextInput
           value={password}
           onChangeText={(password)=>setPassword(password)}
           style={styles.InputText}
           placeholder="Password"
           secureTextEntry={true}/>
           <Button
           title="Register"
           onPress={()=>onSignUp()}/>

           <TouchableOpacity 
           onPress={()=>navigation.navigate('Login')}
           >
               <Text style={{color:'blue',fontSize:16,marginTop:5}}>NEXT</Text>


           </TouchableOpacity>
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
    