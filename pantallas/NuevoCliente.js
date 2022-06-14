import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert
} from 'react-native';
import globalStyles from '../styles/globalStyles';
import axios from 'axios';
const NuevoCliente = ({navigation, route}) => {

  const {setRecargar} = route.params
  const [nombre,setNombre] = useState("")
  const [correo,setCorreo] = useState("")
  const [empresa,setEmpresa] = useState("")
  const [telefono,setTelefono] = useState("")

  useEffect(()=>{
    if(route.params.cliente){
      const {nombre,telefono,correo,empresa} = route.params.cliente;
      setNombre(nombre);
      setCorreo(correo);
      setEmpresa(empresa);
      setTelefono(telefono);
    }
    
  },[])
  const navegar = () => {
    navigation.navigate("Inicio")
  }

    const guardarCliente = async () => {

        if([nombre,correo,empresa].includes("")){
            Alert.alert(
                "Error",
                "Complete los campos requeridos",
            )
            return
        }

        //generar cliente con los campos llenados
        const cliente = {nombre,empresa,correo,telefono}

        //detectar si estamos editando o creando cliente en el api
        if(route.params.cliente){
          const {id} = route.params.cliente //sacamos la variable id del cliente
          cliente.id = id; //se la asignamos a cliente.id
          const url = `http://10.0.2.2:3000/clientes/${id}`; //la ubicamos con la url
          
          try {
            await axios.put(url, cliente);//finalmente editamos
          } catch (error) {
            console.log(error)
          }
        }else{ //aqui es que es nuevo 
          try { //enviamos el cliente registrado al servidor
            await axios.post("http://10.0.2.2:3000/clientes", cliente)
          } catch (error) {
              console.log(error)
          }
        }
        //redirigir
        navigation.navigate("Inicio")

        //limpiar el form
        setCorreo("");
        setNombre("");
        setEmpresa("");
        setTelefono("");
        //mandar a recargar el servidor
        setRecargar(true)
    }
  return(
    <SafeAreaView style={globalStyles.contenedor}>
        <Pressable onPress={()=> navegar()}>
            <Image style={styles.img}source={require("../assets/img/volver.png")} />
        </Pressable>
        {route.params.cliente ? <Text style={globalStyles.titulo}>Editar Cliente</Text>: <Text style={globalStyles.titulo}>Registrar Cliente</Text>}
        <TextInput
        placeholder='Nombre*'
        style={styles.inputs}
        value={nombre}
        onChangeText={setNombre}
        maxLength={32}
        />
        <TextInput
        placeholder='Correo*'
        style={styles.inputs}
        keyboardType={"email-address"}
        value={correo}
        onChangeText={setCorreo}
        maxLength={22}
        />
        <TextInput
        placeholder='Empresa*'
        style={styles.inputs}
        value={empresa}
        onChangeText={setEmpresa}
        maxLength={18}
        />
        <TextInput
        placeholder='Telefono'
        style={styles.inputs}
        keyboardType={"number-pad"}
        maxLength={10}
        value={telefono}
        onChangeText={setTelefono}
        />
        <View style={{alignItems:"center"}}>
            <Pressable style={styles.btnGuardar} onPress={()=> guardarCliente()}>
              {route.params.cliente ? <Text style={styles.txtGuardar}>Editar Cliente</Text>: <Text style={styles.txtGuardar}>Registrar Cliente</Text>}
            </Pressable>
            <Image style={styles.img2}source={require("../assets/img/undraw_Interview_re_e5jn-removebg-preview.png")} />
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  inputs:{
    marginBottom:20,
    borderColor:"silver",
    borderWidth:1,
    borderRadius:10,
    paddingHorizontal:10
  },
  btnGuardar:{
    backgroundColor:"#2681FF",
    paddingHorizontal:100,
    paddingVertical:10,
    borderRadius:5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  txtGuardar:{
    color:"#FFF",
    fontWeight:"600",
    fontSize:18
  },
  img:{
    width:20,
    height:20
  },
  img2:{
    marginTop:50,
   width:200,
   height:200 
  }

});

export default NuevoCliente;