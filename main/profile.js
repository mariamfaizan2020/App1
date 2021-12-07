import React from 'react'
import firebase from 'firebase'
require('firebase/firestore')
import {  Text, View,Button } from 'react-native'
import {connect} from 'react-redux'


const profile = ({currentUser,navigation}) => {
    console.log('currentUser',currentUser)
    return (
        <View style={{flex:1,marginTop:30}}>
            <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            <Text>{currentUser.phoneNo}</Text>
            <Button title='logout' onPress={()=>{
                firebase.auth().signOut()
                navigation.navigate('Login')
                }}/>
        </View>
    )
}
const mapStateToProps=(store)=>{
    console.log("store",store)
    return {
        currentUser:store.userState.currentUser
}
}

export default connect(mapStateToProps,null)(profile)

