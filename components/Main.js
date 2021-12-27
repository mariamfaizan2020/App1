
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UsersScreen from '../main/users'
import ProfileScreen from '../main/profile'
import chatScreen from '../main/chat'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


// import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {fetchUser} from "../redux/actions/index"
const Tab = createMaterialBottomTabNavigator();


export class Main extends Component {
  componentDidMount(){
    // this.props.fetchUser()
    // this.props.fetchUsersData()

  }
  render() {
    return (
      
    
      <Tab.Navigator>
      <Tab.Screen name='users' component={UsersScreen} 
      options={{
        tabBarLabel:() => {return null},
        tabBarIcon:({color,size })=>(
          <Entypo name="users" size={24} color="white" />

        )
          
        
      }}
    />
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarLabel:() => {return null},
        tabBarIcon:({color,size })=>(
          <AntDesign name="profile" size={24} color="white" />

        )
          
        
      }}
      />
      <Tab.Screen name="Chat" component={chatScreen}
      options={{
        tabBarLabel:() => {return null},
        tabBarIcon:({color,size })=>(
          <Entypo name="chat" size={24} color="white" />

        )
          
        
      }}
      />
    </Tab.Navigator>

  )
    }
}

export default Main
      
    
// const mapStateToProps=(store)=>({
//   // currentUser:store.userState.currentUser,
  // users:store.usersState.users


// })

// const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
// export default connect(mapStateToProps,mapDispatchProps)(Main);



