


const initialState ={
    users:[]
}

export const users =(state =initialState ,action)=>{
   
            return {
                ...state,
                users:[...state.users,action.user]
            }
          
        
        }
   