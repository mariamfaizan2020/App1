import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Main = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Users" component={UsersScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})
