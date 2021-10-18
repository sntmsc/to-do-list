import {useState} from 'react'
import {EditarTarea} from './EditarTarea'
import {
  Text,IconButton,
  Flex,Spacer,Box} from "@chakra-ui/react"
import { motion } from "framer-motion";
import {AiFillEdit, AiTwotoneDelete} from 'react-icons/ai'
import { doc, deleteDoc} from 'firebase/firestore'
import db from './../util/firebase'


export const Tarea = ({x,i,tareas,cambiarTareas,setMensajeAlerta,mostrarAlerta})=> {
    const [edicionVisible, setEdicionVisible] = useState(false);

    const eliminarTarea = async(x) =>{
      let tareaFiltrada = [...tareas].filter(z => z!==x)
      cambiarTareas(tareaFiltrada);
      await deleteDoc(doc(db, "tareasBase", x.id))
        
      }
    
    const edicion = (versionEditada) =>{
        cambiarTareas(versionEditada)
      }

    return(
        <Flex as={motion.div} key={x.i} boxShadow="dark-lg" align="center" borderRadius="5px" p={1} 
        bg="gray.300" width="100%" mt={1} initial={{scale: 0.9}} animate={{scale: 1}} exit={{scale: 0.9}} transition={{scale:{duration: 0.5}}}>
            <Box p={2} > 
            {!edicionVisible &&
              <Text fontFamily="'PT Sans Narrow', sans-serif;" fontSize="1.5em" >{x.tarea}</Text>
            }
            {edicionVisible && 
                <EditarTarea tarea={x} tareas={tareas} edicion={edicion} cerrarEdicion={()=>setEdicionVisible(false)}
                setMensajeAlerta={(mensaje)=>setMensajeAlerta(mensaje)} 
                mostrarAlerta={()=>mostrarAlerta()}/>
            }
            </Box>
            <Spacer/>
            {!edicionVisible &&
            <>
            <IconButton icon={<AiFillEdit/>} aria-label="editar tarea" fontSize="1.3em" onClick={() => setEdicionVisible(true)}></IconButton>
            <IconButton icon={<AiTwotoneDelete/>} aria-label="eliminar tarea" fontSize="1.3em" ml={2} onClick={() => eliminarTarea(x)}></IconButton>
            </>
            }
            
        </Flex>
    )
}
