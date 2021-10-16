import {useState,useEffect} from 'react'
import {Tarea} from './components/Tarea'
import Alerta from './components/Alerta'
import db from './util/firebase'
import { collection,query,addDoc, onSnapshot, where } from 'firebase/firestore';
import './App.css'
import {
  ChakraProvider,Text,Input,Button,
  Flex,Center,Box} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [tareas,setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
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

  const eventNuevaTarea = (event) => 
  setNuevaTarea(event.target.value);

  const mostrarAlerta = () =>{
    setAlertaVisible(true)
    setTimeout(()=>setAlertaVisible(false),3000);
  }

  const agregarTarea = (event) => {
    event.preventDefault();
    if(tareas.find(e => e.tarea===nuevaTarea) !== undefined){
      setMensajeAlerta('Esta tarea ya se encuentra en el listado')
      mostrarAlerta()
    }
    else if(nuevaTarea===''){
      setMensajeAlerta('No se puede incluir una tarea vacía')
      mostrarAlerta()
    }
    else{
      setTareas([...tareas].concat({tarea:nuevaTarea}));

      const agregarTareasBase = async() => {
        await addDoc(collection(db, "tareasBase"), {
          tarea: `${nuevaTarea}`
        })
      }
      agregarTareasBase()
  
      setNuevaTarea('');
    }
  }
console.log(tareas)
  const cambiarTareas = (cambio) =>{
    setTareas(cambio);
  }
  const lista = () =>
    tareas.map( (x, i) => 
      <Tarea key={i} x={x} i={i} tareas={tareas} cambiarTareas={cambiarTareas}
       setMensajeAlerta={(mensaje)=>setMensajeAlerta(mensaje)} 
       mostrarAlerta={()=>mostrarAlerta()}/>
    )

  return (
    <ChakraProvider>
      <Flex direction="column">
          <Flex  direction="column" className="App">
          <Text as="samp" fontSize={{base:"4xl",md:"5xl",lg:"6xl"}} fontFamily=" 'Raleway', sans-serif" color="gray50" mt={5} mb={5}> Tareas a realizar:</Text>
            <form onSubmit={agregarTarea}>
              <Input width={{base:"80%", md:"50%"}} value={nuevaTarea} onChange={eventNuevaTarea}/>
              <Button colorScheme="teal" variant="outline" size="md" fontFamily="'Source Code Pro', monospace;" type="submit" mt={{base:'.5em',md:'0'}} ml={2}>Agregar</Button>
            </form>
          </Flex>
          <Box mt={5}>
            <Center>
          <Flex bg="gray.400" direction="column" align="center" justify="space-around" borderRadius="5px" width="60em" p={3} pt={2}> 
                {lista()}
                {tareas.length === 0 &&
                <Text fontFamily=" 'Nanum Gothic Coding', monospace;" fontSize="1.5em">Sin tareas</Text> 
                }
          </Flex>
          </Center>
          </Box>
      </Flex>
      <AnimatePresence>
      {alertaVisible && 
          <Flex as={motion.div} justifyContent="center" position="fixed" width="100%" top={{base:'31em',md:'32em' }}
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
