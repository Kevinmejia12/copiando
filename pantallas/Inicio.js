import 'react-native-gesture-handler';
import React,{useState, useEffect}from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  Image,
  FlatList,
  View,
} from 'react-native';
import {List} from "react-native-paper"
import axios from 'axios';
import globalStyles from '../styles/globalStyles';
const Inicio = ({navigation}) => {
    const [clientes,setClientes] = useState([])
    const [recargar,setRecargar] = useState(true)
    useEffect(()=>{
        const traerDatos = async () => {
            try {
                //creamos una variable para meter el resultado de la peticion al servidor 
                const resultado = await axios.get("http://10.0.2.2:3000/clientes")
                setClientes(resultado.data) //metemos el resultado. data a los clientes
                setRecargar(false)//madandamos el state a false para luego mandarlo a true
            } catch (error) {
                console.log(error)
            }
        }

        if(setRecargar){
            traerDatos()
        }

    },[recargar])
  return(
    <SafeAreaView style={globalStyles.contenedor}>
        {clientes.length > 0 ? <Text style={globalStyles.titulo}>Clientes Registrados</Text> : <Text style={globalStyles.titulo}>Aun No hay clientes</Text>}
        <FlatList
        data={clientes} // esto indica de donde se toman los valores 
        keyExtractor={cliente => (cliente.id).toString()} //renderizamos en base a su id y  luego lo mandamos a string 
        renderItem={({item})=>(
            <View style={styles.containerInfo} >
                <Pressable onPress={()=> navigation.navigate("DetallesCliente", {item, setRecargar}, {navigation} )}>
                    <View style={styles.containerX}>
                        <Text style={styles.txtInfo} >{item.empresa}</Text>
                        <Image style={styles.img2} source={require("../assets/img/comprobado.png")}/>
                    </View>
                    <Text style={styles.txtInfo2} >{item.nombre}</Text>
                </Pressable>
            </View>
        )}
        />
        <Pressable style={styles.btnMAs} onPress={()=> navigation.navigate("NuevoCliente", {setRecargar} )}>
            <Image style={styles.img}source={require("../assets/img/mas12.png")} />
        </Pressable>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    btnMAs:{
        position:"absolute",
        right:10,
        bottom:30
    },
    img:{
    width:70,
    height:70
    },
    containerInfo:{
        marginTop:20
    },
    txtInfo:{
        fontSize:30,
        color:"#000",
        width:300
    },
    txtInfo2:{
        fontSize:18,
        marginTop:-10,
        width:320,
    },
    containerX:{
        flexDirection:"row", 
        justifyContent:"space-between"
    },
    img2:{
        height:40,
        width:40,
        marginTop:15
    }
});

export default Inicio;