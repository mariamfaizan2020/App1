
import React,{useState}from 'react'
import firebase from 'firebase';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from "react-redux";
import {Button,Text,TextInput,KeyboardAvoidingView,
    StyleSheet, TouchableOpacity,Platform, Alert,View,ActivityIndicator} from 'react-native'
    import {fetchUser} from "../../redux/actions/index"

 function login({navigation}) {
     const dispatch=useDispatch()
    const [email,setEmail]=useState('test2@gmail.com')
    const [password,setPassword]=useState("123456")
    const [loader,setLoader]=useState(false)

    const onSignIn=()=>{
        
     firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then(userCredentials=>{
          const user=userCredentials.user
        console.log("Logged in with:",user.email)
        dispatch(fetchUser(navigation))
     
        setLoader(false)
        

    })
    .catch(error=>{
        setLoader(false)
        alert(error.message)
       
    })
}
    const validation=()=>{
        setLoader(true)
  if(!email){return alert('Please enter email')}
  if(!password){return alert('Please enter password')}


    onSignIn()
             
    }

    if(loader){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' />
        </View>
        )
      
    }else{

    
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
        {
            loader?
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' />
            </View>
            : 
            <Button 
            title="Login"
            onPress={()=>{validation();}
             }
            />
        }

     
       <TouchableOpacity  
       onPress={()=> navigation.navigate('Register')} >
         <Text style={{color:'blue',marginTop:10,padding:10}}>If you haven't Register yet then GO TO REGISTER</Text>
        </TouchableOpacity>
       

        </KeyboardAvoidingView>
        )
        
    }
}
   

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
     

    },
    

            })


     
              
            //   const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
              export default connect(null,{fetchUser})(login);
