import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

const Header = () => {
    return (
        <Text style={styles.encabezado} >Criptomonedas</Text>    
    )
}

export default Header

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        backgroundColor: '#5249e2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#fff',
        marginBottom: 30
    }
})
