import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'




require ('firebase/firestore')

const chat = ({navigation,currentUser}) => {
 
    const [name,setName]=useState([])
    useEffect(() => {
        fetchConv()
        
    }, [])
    console.log('helo there')
    const fetchConv=()=>{
        if(firebase.auth().currentUser){
            firebase.firestore().collection('conversation')
            .where(`parties.${firebase.auth().currentUser?.uid}`,'==',true)
            
           .onSnapshot((snapshot)=>{
                console.log('chats',snapshot)
                if(!snapshot.empty){
                    let arr=[]
                    const conv=snapshot.docs.map((doc=>{
                       const data=doc.data()
             console.log('cid',data.cid)
                 
                  Object.values(data.partyInfo).map(object=>{
                        //   console.log('obj',object.name)
                          if(object.uid!==firebase.auth().currentUser.uid){
                            //   console.log(object.uid,'uid')
                              console.log(object,'obj')
                              let obj={
                                  name:object.name,
                                  uid:object.uid,
                                  cid:data.cid
                              }
                              arr.push(obj)
                          
                          }
                          setName(arr)
             
                   })
                         
                  
                 }))
           

                }
                   
            
               
            })
            }
       
    } 
    console.log("names",name)
    console.log('abcd')
  
   
        return (
           
            <View style={{marginTop:50,flex:1}}>
                
                {name.length>0 ? 
           
                   
               
                 <FlatList
                 // numColumns={1}
                 data={name}
                 keyExtractor={(item,index)=>index.toString()}
                 renderItem={({item})=>{
                     // console.log('convsss',item.partyInfo)
                    
                     return(
                        <TouchableOpacity onPress={()=>navigation.navigate('messages',{
                            docId:item.cid
                             })} style={{}}>
                         <View style={{margin:10,backgroundColor:'lightgrey',padding:10}}>
                   <Text style={{padding:10}}>{item.name}</Text>
                   
                   </View>
                   </TouchableOpacity> 
              
                      ) }}
                 />
                  
               
            : 
               <Text>NO CHATS TO SHOW</Text>
            }
                 </View>
               
           
         )
    

    
    }
   
    
       

export default chat

const styles = StyleSheet.create({})


