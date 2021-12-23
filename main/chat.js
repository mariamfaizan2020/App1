import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,Image,FlatList} from 'react-native'
import firebase from 'firebase'

require ('firebase/firestore')

const chat = () => {
    const [conv,setConv]=useState([])
    useEffect(() => {
        fetchConv()
        
    }, [])
    console.log('helo there')
    const fetchConv=()=>{
        if(firebase.auth().currentUser){
            firebase.firestore().collection('conversation')
            .where(`parties.${firebase.auth().currentUser?.uid}`,'==',true)
            .get()
            .then((snapshot)=>{
                console.log('chats',snapshot)
                if(!snapshot.empty){
                    const conv=snapshot.docs.map((doc=>{
                       const data=doc.data()
                    //    let partyInfo=object.values(data.partyInfo)
                       console.log('data',data.partyInfo)
                            return data
                    }))
                    setConv(conv)
                    console.log("image",conv)

                }
                   
            
               
            })
        }
       
    } 
    if(conv.length !== 0){
        console.log('conv',conv)
   
        return (
           
            <View>
                
                <FlatList
                // numColumns={1}
                data={conv}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item})=>{
                    // console.log('convsss',item.partyInfo)
                   
                    return(
                   
                   <View>
                      <Text>name:</Text>
                   </View>
                        
                    )
     
                }}
                
     
                />
            </View>
         )
    }
return (
    <Text>NO CHATS TO SHOW</Text>
)
    
    }
   
    
       

export default chat

const styles = StyleSheet.create({})


