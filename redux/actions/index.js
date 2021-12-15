import firebase from 'firebase'
import { USER_STATE_CHANGE} from '../constants/index'
import { USER_LOGOUT } from '../constants/index'


export function fetchUser(navigation){
    console.log("uid fetch user callewd",firebase.auth().currentUser.uid)
    return((dispatch)=>{
       firebase.firestore().collection("users")
       .doc(firebase.auth().currentUser.uid)
       .onSnapshot((snapshot)=>{
    //    .get()
       
    //    .then((snapshot)=>{

           console.log("success getting dataa")
           if(snapshot.exists){
               
            console.log("snaps",snapshot.data())
               dispatch({type:USER_STATE_CHANGE, currentUser:snapshot.data() })
               console.log('snapshot',snapshot.data())
               console.log('id',snapshot.id)
               navigation.navigate('Main')
            
           }else{
               console.log('does not exist')
           }
       })   })
}

export function LogOut(navigation){
    return((dispatch)=>{
        
              dispatch({type:USER_LOGOUT})
              navigation.navigate('Login')
            
        
    })
}