
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UsersScreen from '../main/users'
import ProfileScreen from '../main/profile'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser} from "../redux/actions/index"
const Tab = createMaterialBottomTabNavigator();


export class Main extends Component {
  componentDidMount(){
    // this.props.fetchUser()
    // this.props.fetchUsersData()

  }
  render() {
    return (
      
    
      <Tab.Navigator>
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen}

       
      />
    </Tab.Navigator>

  )
    }
}

  
      
    
const mapStateToProps=(store)=>({
  currentUser:store.userState.currentUser,
  // users:store.usersState.users


})

const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Main);


