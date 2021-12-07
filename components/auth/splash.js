import { NavigationContainer } from '@react-navigation/native'
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'

const splash = ({navigation}) => {
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        setTimeout(() => {
            setLoader(false)
            
        }, 5000);
    })
    return (
        <View>
        {loader ? 
        <View>
            <ActivityIndicator size={'large'}/>
            </View>
            :null}
        </View>
    )
}

export default splash

const styles = StyleSheet.create({})
