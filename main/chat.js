import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'




require ('firebase/firestore')

const chat = ({navigation,currentUser}) => {
 
    const [name,setName]=useState([])
    useEffect(() => {
        fetchConv()
        
    }, [currentUser])
    // console.log('helo there')
    const fetchConv=()=>{
        if(firebase.auth().currentUser){
            firebase.firestore().collection('conversation')
            .where(`parties.${firebase.auth().currentUser?.uid}`,'==',true)
            
           .onSnapshot((snapshot)=>{
                // console.log('chats',snapshot)
                if(!snapshot.empty){
                    let arr=[]
                    snapshot.docs.map((doc=>{
                       const data=doc.data()
            //  console.log('cid',data.LastMessage)
                 
                //   var test=
                  Object.values(data.partyInfo).map(object=>{
                        //   console.log('obj',object)
                          if(object.uid!==firebase.auth().currentUser.uid){
                            //   console.log(object.uid,'uid')
                            //   console.log(object,'obj')
                              let obj={
                                  name:object.name,
                                  uid:object.uid,
                                  cid:data.cid,
                                  LastMessage:data.LastMessage,
                            
        
                              }
                              arr.push(obj)
                          
                          }
                        //   return arr
                        
             
                   })
                   setName(arr)
                //    console.log("test",test)
                //    setName(test[0])
                  
                 }))
           

                }
                   
            
               
            })
            }
       
    } 
    // console.log("names",name.length)
    // console.log("names",name)
    // console.log('abcd')
  
   
        return (
           
            <View style={{marginTop:50,flex:1}}>
                
                {name.length>0 ? 
           
                   
               
                 <FlatList
                 // numColumns={1}
                 data={name}
                 keyExtractor={(item,index)=>index.toString()}
                 renderItem={({item})=>{
                     console.log('convsss',item)
                    
                     return(
                        <TouchableOpacity onPress={()=>navigation.navigate('messages',{
                            docId:item.cid,
                            friendname:item.name,
                            friendUid:item.uid
                             })} style={{}}>
                         <View style={{margin:5,backgroundColor:'lightgrey',padding:10}}>
                   <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                   <Text style={{fontSize:12}}>{item?.LastMessage}</Text>
                   
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


