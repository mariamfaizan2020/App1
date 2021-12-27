import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 


const usersProfile = (props) => {
   const data=props.route.params.data
       
    
    console.log('abcdef',data.image)

   
    
    return (
        <View style={styles.container}>
    
        {data.image ?<Image source={{uri: data.image}} style={styles.image1}/> : <FontAwesome name="user" size={250} color= '#0798f2' style={styles.image1} />}
            <View style={{marginTop:30,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.text}>{data.name}</Text>
            <Text style={styles.text}>{data.email}</Text>
            <Text style={styles.text}>{data.phoneNo}</Text> 
            </View>
        
        </View>
    )
    }
    




const styles = StyleSheet.create({
    image1:{
        marginTop:20,
        height:200,
        width:200,
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:360
    },
    container:{
        flex:1,
  },
  text:{
      fontSize:18,
      fontWeight:'bold',
      color:'blue',
      marginTop:10,
      
  }
})

export default usersProfile
