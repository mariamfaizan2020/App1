import React ,{useState,useEffect} from 'react'
import firebase from 'firebase'
require('firebase/firestore')
import {  Text,TextInput, View,Button, StyleSheet ,TouchableOpacity ,Image,Platform} from 'react-native'
import {connect} from 'react-redux'
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
          
           
               })
        .then(()=>{

            console.log('userUpdated')
        })
        // firebase.firestore()
        // .collection('users')
        // .doc(firebase.auth().currentUser.uid)
        // .add({
        //     creator:firebase.auth().currentUser.uid,
        //     image: setImage(result.uri)
        // })
        // .update({
        //     name,
        //     phoneNo ,
        //     image
          
           
        //        })
        // .then(()=>{

        //     console.log('userUpdated')
        // })
           
    }
    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
        };
   
    
    return (
       
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {/* <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            <Text>{currentUser.phoneNo}</Text> */}
          
    
      <TouchableOpacity style={styles.image}
        onPress={()=>{pickImage()}}>
            <View>
            {image ? <Image source={{ uri: image }} style={styles.image} />: <FontAwesome name="user" size={150} color= '#0798f2'
            />}
            
           
            </View>
   
        </TouchableOpacity>
      
   
 
       

    
         <TextInput style={styles.Input}
            placeholder={name}
            value={name}
            onChangeText={(name)=>setName(name)}
            placeholderTextColor='white'/>
            
             <TextInput editable={false} style={styles.Input}
             placeholder={currentUser.email}
             placeholderTextColor='#565b5e'/>
            
          
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

export default connect(mapStateToProps,null)(profile)

