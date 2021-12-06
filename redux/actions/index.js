import firebase from 'firebase'
import {USERS_DATA_STATE_CHANGE, USER_STATE_CHANGE} from '../constants/index'
import { users } from '../reducers/users'

export function fetchUser(){
    return((dispatch)=>{
       firebase.firestore().collection("users")
       .doc(firebase.auth().currentUser.uid)
       .get()
       
       .then((snapshot)=>{
           if(snapshot.exists){
               
     
               dispatch({type:USER_STATE_CHANGE, currentUser:snapshot.data() })
               console.log('snapshot',snapshot.data())
               console.log('id',snapshot.id)
            
           }else{
               console.log('does not exist')
           }
       })
    })
}

export function fetchUsersData(uid){
    return((dispatch,getState)=>{
        const found=getState().usersState.users.some(el=>el.uid===uid);
        console.log('user',users)
        if (!found){
            firebase.firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((snapshot)=>{
                    if(snapshot.exists){
                        let user=snapshot.data();
                        user.uid =snapshot.id
                        dispatch({type:USERS_DATA_STATE_CHANGE,user})
                        console.log('uid',user.uid)
                        console.log('snapshot',snapshot.data())

                    }
                })
            
        }
       
    })
}