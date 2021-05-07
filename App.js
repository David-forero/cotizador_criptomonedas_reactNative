import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

export default function App() {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   async function init() {
    if (consultarApi) {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      setLoading(true)

      setTimeout(() => {
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
        setConsultarApi(false);
        setLoading(false);
      }, 3000);

    }
   }
   init()
  }, [consultarApi])

   // mostrar el spinner o el resultado
   const componente = loading ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion  resultado={resultado} />
  return (
    <ScrollView>
      <Header/>

      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />

      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarApi={setConsultarApi}
        />
      </View>

      <View style={{ marginTop: 40 }}>
          {componente}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 imagen:{
   width: '100%',
   height: 150,
   marginHorizontal: '2.5%'
 },

 contenido:{
  marginHorizontal: '2.5%'
 }
});
