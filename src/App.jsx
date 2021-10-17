import {useState,useEffect} from 'react'
import InputForm from './components/input'
import {Tarea} from './components/Tarea'
import Alerta from './components/Alerta'
import db from './util/firebase'
import { collection,query, onSnapshot} from 'firebase/firestore';
import './App.css'
import {
  ChakraProvider,Text,
  Flex,Center,Box} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [tareas,setTareas] = useState([]);
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const [alertaVisible, setAlertaVisible] = useState(false)

useEffect( () =>{
  const obtenerDatos = () =>{
    const q = query(collection(db, "tareasBase"));
    onSnapshot(q, (querySnapshot) => {
    const tareasBase = [];
    querySnapshot.forEach((doc) => {
      tareasBase.push(({id:doc.id,
                    tarea:doc.data().tarea}));
  });
  setTareas(tareasBase);
  });
  }
obtenerDatos()

},[])

  const mostrarAlerta = () =>{
    setAlertaVisible(true)
    setTimeout(()=>setAlertaVisible(false),3000);
  }

  const cambiarTareas = (cambio) =>{
    setTareas(cambio);
  }

  const cambiarAlerta = (cambio) =>{
    setMensajeAlerta(cambio)
  }

  const lista = () =>
    tareas.map( (x, i) => 
      <Tarea key={i} x={x} i={i} tareas={tareas} cambiarTareas={cambiarTareas}
       setMensajeAlerta={(mensaje)=>setMensajeAlerta(mensaje)} 
       mostrarAlerta={()=>mostrarAlerta()} />
    )

  return (
    <ChakraProvider>
      <Flex direction="column">
          <Flex  direction="column" className="App">
          <Text as="samp" fontSize={{base:"5xl",md:"6xl",lg:"7xl"}} fontFamily=" 'Indie Flower', cursive;" color="gray50" mt={5} mb={5}> Tareas a realizar</Text>
           <InputForm  tareas={tareas} cambiarTareas={cambiarTareas} cambiarAlerta={cambiarAlerta} mostrarAlerta={mostrarAlerta}/>
          </Flex>
          <Box mt={5}>
            <Center>
          <Flex bg="gray.400" direction="column" align="center" justify="space-around" borderRadius="5px" width="60em" p={3} pt={2}>
            <AnimatePresence> 
                {lista()}
            </AnimatePresence>
                {tareas.length === 0 &&
                <Text fontFamily=" 'Nanum Gothic Coding', monospace;" fontSize="1.5em">Sin tareas</Text> 
                }
          </Flex>
          </Center>
          </Box>
      </Flex>
      <AnimatePresence>
      {alertaVisible && 
          <Flex as={motion.div} justifyContent="center" position="fixed" width="100%" bottom='1em'
          initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
          transition= {{opacity:{duration: 2.8}}}> 
          
            <Alerta mensaje={mensajeAlerta} close={()=>setAlertaVisible(false)}/>
          
          </Flex>
        }
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default App
