import axios from 'axios'
import React from 'react'
import { Text, View, StyleSheet, Pressable, Image, Alert} from 'react-native'
import globalStyles from '../styles/globalStyles'
const DetallesCliente = ({navigation,route}) => {
    const {nombre,correo,telefono,empresa,id} = route.params.item
    const {setRecargar} = route.params

    const navegar = () => {
        navigation.navigate("Inicio")
    }
    
    const verificar = () => {
        Alert.alert(
            "Eliminando",
            "Los cambios no se podran recuperar, estas seguro de que quieres eliminar un cliente?",
            [{text:"CANCELAR", style:"cancel"},{text:"Si, Eliminar cliente", onPress:(()=> eliminarCliente())}]        
        )
    }

    const eliminarCliente = async () => {
        //creamos la url personalizada de cada cliente
        const url= `http://10.0.2.2:3000/clientes/${id}`
        try {
            //eliminamos si es que se puede si no cae en cath
            await axios.delete(url);
        } catch (error) {
            console.log(error)
        }

        //mandamos a true para recargar el effect 
        setRecargar(true)
        //mandamos al inicio de la app 
        setTimeout(()=>{
            navigation.navigate("Inicio")
        },500)
    }

    return(
        <View style={globalStyles.contenedor}>
            <Pressable onPress={()=> navegar()}>
                <Image style={styles.img}source={require("../assets/img/volver.png")} />
            </Pressable>
            <Text style={globalStyles.titulo}>Informacion personal del cliente</Text>
            <View style={styles.containerInfo}>
                <Text style={styles.info}>Empresa: {" "}
                    <Text style={styles.info2}>{empresa}</Text>
                </Text>
                <Text style={styles.info}>Nombre: {" "}
                    <Text style={styles.info2}>{nombre}</Text>
                </Text>
                <Text style={styles.info}>Correo: {" "}
                    <Text style={styles.info2}>{correo}</Text>
                </Text>
                <Text style={styles.info}>Telefono: {" "}
                    <Text style={styles.info2}>{telefono}</Text>
                </Text>
            </View>
            <View style={styles.containerBtn2}>
                <Image style={styles.imgBorrar} source={require("../assets/img/editar1.png")} />
                <Pressable onPress={()=> navigation.navigate("NuevoCliente",{ cliente: route.params.item, setRecargar})}>
                    <Text style={styles.txtEditar}>Editar Cliente</Text>
                </Pressable>
            </View>
            <View style={styles.containerBtn}>
                <Image style={styles.imgBorrar} source={require("../assets/img/borrar.png")} />
                <Pressable onPress={()=> verificar()}>
                    <Text style={styles.txtEliminar}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerInfo:{
        alignItems:"baseline"
    },
    info:{
        marginTop:20,
        fontSize:16
    },
    info2:{
        fontSize:22,
        color:"#000",
        fontWeight:"500"
    },
    containerBtn:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FF1F1F",
        marginHorizontal:100,
        paddingLeft:30,
        marginTop:40,
        borderRadius:10,
        paddingVertical:8
    },
    txtEliminar:{
        color:"#FFF",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    },
    imgBorrar:{
        width:20,
        height:20,
        marginRight:10
    },
    img:{
        width:20,
        height:20
    },
    containerBtn2:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#2196F3",
        marginHorizontal:50,
        paddingLeft:60,
        marginTop:40,
        borderRadius:10,
        paddingVertical:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    txtEditar:{
        color:"#FFF",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    },
})

export default DetallesCliente;
