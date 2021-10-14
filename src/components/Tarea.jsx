import {useState} from 'react'
import {EditarTarea} from './EditarTarea'
import {
  Text,IconButton,
  Flex,Spacer,Box} from "@chakra-ui/react"
import {AiFillEdit, AiTwotoneDelete} from 'react-icons/ai'



export const Tarea = ({x,i,tareas,cambiarTareas,setMensajeAlerta,mostrarAlerta})=> {
    const [edicionVisible, setEdicionVisible] = useState(false);

    const eliminarTarea = (x) =>{
        let tareaFiltrada = [...tareas].filter(z => z!==x)
        cambiarTareas(tareaFiltrada);
        setEdicionVisible(false);
      }
    
    const edicion = (versionEditada) =>{
        cambiarTareas(versionEditada)
      }

    return(
        <Flex key={i} boxShadow="xl" align="center" borderRadius="5px" p={2} bg="gray.300" width="100%" mt={1}>
            <Box p={2} > 
            {!edicionVisible &&
              <Text fontFamily="'Source Sans Pro', sans-serif;" fontSize="1.5em" >{x}</Text>
            }
            {edicionVisible && 
                <EditarTarea tarea={x} indice={i} tareas={tareas} edicion={edicion} cerrarEdicion={()=>setEdicionVisible(false)}
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