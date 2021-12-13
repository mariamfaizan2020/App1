import { NavigationContainer } from '@react-navigation/native'
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
 import { bindActionCreators } from 'redux';
import {fetchUser} from "../../redux/actions/index"
import firebase from 'firebase'

const splash = ({currentUser,navigation}) => {
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        setTimeout(() => {

            setLoader(false)
            if(currentUser!=null){
                navigation.navigate('Main')
            }else{
                navigation.navigate('Login')
            }

        }, 5000);
       
    })
    console.log('hey')
    console.log("curreentUser::",currentUser)

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
        {loader ? 
        <View>
            
            <ActivityIndicator size={'large'}/>
            </View>
            :
            null

        }
            
       
            
        </View>
       
    )
}


const mapStateToProps=(store)=>{
  return {
       currentUser:store.userState.currentUser
}
}
const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(splash);