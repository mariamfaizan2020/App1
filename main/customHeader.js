import React from 'react'
import { StyleSheet, Text, View ,Title} from 'react-native'

const customHeader = ({name}) => {
    return (
        <View>
           <Title>{name}</Title>
        </View>
    )
}

export default customHeader

const styles = StyleSheet.create({})
