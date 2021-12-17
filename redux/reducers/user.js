import { USER_STATE_CHANGE,USER_LOGOUT } from '../constants/index'

const initialState ={
    currentUser:null
}

export const user =(state =initialState ,action)=>{
    switch(action.type){
        case USER_STATE_CHANGE:
        return {
        
            ...state,
            currentUser:action.currentUser
            
        }
        case USER_LOGOUT:
            return initialState
            
        default:
            return initialState;
    }
    
}