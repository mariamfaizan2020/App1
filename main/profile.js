import React ,{useState,useEffect} from 'react'
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')
import {  Text,TextInput, View,Button, StyleSheet ,TouchableOpacity ,Image,Platform} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetchUser} from "../redux/actions/index"

import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 






const profile = ({currentUser,navigation}) => {
    const [name,setName]=useState(currentUser?.name)
    const [phoneNo,setPhoneNo]=useState(currentUser?.phoneNo)
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    console.log('currentUser',currentUser)

    const onEdit=()=>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        
        .update({
            name,
            phoneNo ,
            image
          
           
               })
        .then(()=>{

            console.log('userUpdated')
        })
       
    }
    
    const pickAndUploadImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log("uriiiiii",result);
        // console.log('props',props)
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
        const response=await fetch(result.uri);
        // // console.log("uirOfImage",uri);
        const blob= await response.blob();

        const task=await firebase
        .storage()
        .ref()
        .child(`users/${firebase.auth().currentUser.uid}/${Math.random.toString(36)}`)
        .put(result.uri).then(async(res)=>{

            console.log("fb img",res.ref.getDownloadURL())
            let d=await res.ref.getDownloadURL()
            console.log("d",d)
            return d
        })
        console.log("task",task)
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .set({image:task},{merge:true})
        
    //    const taskProgress =snapshot =>{
    //       console.log(`trasfered:${snapshot.bytesTransferred}`)

    //   }
    //   const taskCompleted = () =>{
    //       snapshot.ref.getDownloadURL()
    //       .then((snapshot)=>{
    //           console.log(snapshot)

    //       })
    //   }
    //   const taskError =snapshot=>{
    //       console.log(snapshot)

    //   }
    //      task.on("state-chnaged",taskProgress,taskError,taskCompleted) 
         

    //   }

        };
    //     const uploadImage=async()=>{
    // //    const uri=
         
         
        

       
   
    
    return (
       
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {/* <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            <Text>{currentUser.phoneNo}</Text> */}
          
    
      <TouchableOpacity style={styles.image}
        onPress={()=>{pickAndUploadImage()}}>
            <View>
            {image ? <Image source={{ uri: image }} style={styles.image}/> : <FontAwesome name="user" size={150} color= '#0798f2'
            />}
            
            
            </View>
   
        </TouchableOpacity>
      
   
 
       

    
         <TextInput style={styles.Input}
            placeholder={name}
            value={name}
            onChangeText={(name)=>setName(name)}
            placeholderTextColor='white'/>
            
             <TextInput editable={false}
              style={styles.Input}
             placeholder={'Email'}
            value={currentUser?.email}
             placeholderTextColor='#565b5e'
             />
            
          
             <TextInput style={styles.Input}
             placeholder={phoneNo}
            value={phoneNo}
            onChangeText={(phoneNo)=>setPhoneNo(phoneNo)}
            placeholderTextColor='white'/>

            <TouchableOpacity style={styles.Button}
            onPress={()=>onEdit()}>
                <Text style={{color:'#0798f2', fontSize:14}}>EDIT</Text>
                </TouchableOpacity>

          
            <Button title='logout' onPress={()=>{
                firebase.auth().signOut()
                navigation.navigate('Login')
                }}/>
         
           
            
        </View>
    )
}
const styles=StyleSheet.create({
    Button:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    Input:{
        margin:10,
        borderWidth:3,
        borderRadius:5,
        width:'50%',
        height:'10%',
        textAlign:'center',
        backgroundColor:'#0798f2',
        borderColor:'#0798f2',
        color:'white'
   
    
    },
    image:{
        height:200,
        width:200,
        borderWidth:5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0798f2',
         borderRadius:360

    }
})
const mapStateToProps=(store)=>{
    console.log("store",store)
    return {
        currentUser:store.userState.currentUser
}
}
const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(profile);

// export default connect(mapStateToProps,null)(profile)

