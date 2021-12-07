import React ,{useState} from 'react'
import firebase from 'firebase'
require('firebase/firestore')
import {  Text,TextInput, View,Button, StyleSheet ,TouchableOpacity ,Image} from 'react-native'
import {connect} from 'react-redux'


const profile = ({currentUser,navigation}) => {
    const [name,setName]=useState(currentUser?.name)
    const [phoneNo,setPhoneNo]=useState(currentUser?.phoneNo)
    console.log('currentUser',currentUser)

    const onEdit=()=>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            name,
            phoneNo
        })
        .then(()=>{

            console.log('userUpdated')
        })
           
    }
    
    return (
       
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {/* <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            <Text>{currentUser.phoneNo}</Text> */}
            <Image
            style={styles.image}
            source={{uri:"https://www.pngwing.com/en/free-png-bbtjg"}}>
            


            </Image>
           
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
                <Text style={{color:'blue', fontSize:14}}>EDIT</Text>
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
        height:'40%',
        width:"80%"
    }
})
const mapStateToProps=(store)=>{
    console.log("store",store)
    return {
        currentUser:store.userState.currentUser
}
}

export default connect(mapStateToProps,null)(profile)

