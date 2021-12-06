import React from 'react'
import firebase from 'firebase'
require('firebase/firestore')
import {  Text, View } from 'react-native'
import {connect} from 'react-redux'

const profile = ({currentUser}) => {
    console.log('currentUser',currentUser)
    return (
        <View style={{flex:1,marginTop:30}}>
            <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            <Text>{currentUser.phoneNo}</Text>
        </View>
    )
}
const mapStateToProps=(store)=>({
    currentUser:store.userState.currentUser
})

export default connect(mapStateToProps,null)(profile)

