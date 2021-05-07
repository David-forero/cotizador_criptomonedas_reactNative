import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, setMoneda, criptomoneda, setCriptomoneda, setConsultarApi}) => {
    useEffect(() => {
        const consultarApi = async () =>{
            let url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data)
            // console.log(resultado.data.Data);
        }
        consultarApi();
    }, [])

   
    const [criptomonedas, setCriptomonedas] = useState([])

    const obtenerMoneda = moneda =>{
        setMoneda(moneda)
    }

    const obtenerCripto = cripto =>{
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        setConsultarApi(true)
  
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios', 
            [
                {text: 'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                onValueChange={moneda => obtenerMoneda(moneda)}
                selectedValue={moneda}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="Selecionar Moneda" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" /> 
                <Picker.Item label="Peso Mexicano" value="MXN" /> 
                <Picker.Item label="Euro" value="EUR" /> 
                <Picker.Item label="Libra Esterlina" value="GBP" /> 
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>

            <Picker
                onValueChange={cripto => obtenerCripto(cripto)}
                selectedValue={criptomoneda}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="Selecionar Moneda" value="" />
                {
                    criptomonedas.map( cripto => (
                        <Picker.Item 
                            key={cripto.CoinInfo.Id} 
                            label={cripto.CoinInfo.FullName} 
                            value={cripto.CoinInfo.Name} 
                        />
                    ))
                }
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Formulario

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
        marginVertical: 20,
        textTransform:"uppercase"
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
