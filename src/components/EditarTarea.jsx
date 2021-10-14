import {useState} from 'react'
import {Input,Flex,IconButton} from "@chakra-ui/react"
import {GiConfirmed} from 'react-icons/gi'
import {ImCancelCircle} from 'react-icons/im'

export const EditarTarea = ({tarea, indice, tareas, edicion, cerrarEdicion,setMensajeAlerta,
                            mostrarAlerta}) =>{
    const [edit,setEdit] = useState(tarea)
    const [cerrarEdit, setCerrarEdit] = useState(true)
    const eventEdit = (event) => 
        setEdit(event.target.value);

    const actualizarTareas = (indice,edit) =>{
        let versionEditada = [...tareas].map((x,i)=> i==indice?edit:x)
        if (edit === ''){
            setMensajeAlerta('No se puede incluir una tarea vacía');
            setCerrarEdit(false)
            mostrarAlerta()
        }
        else if (tareas.find(e => e===edit) !== undefined){
            setMensajeAlerta('Esta tarea ya se encuentra en el listado')
            mostrarAlerta()
          }
          else{
        edicion(versionEditada)
        }
    }
    
    

    return(
        <Flex>
        <Input width={{base:'11em',md:'35em'}} autoFocus bg='white' defaultValue={tarea} fontSize="1.3em"  onChange={eventEdit}/>
        <IconButton ml={1} icon={<GiConfirmed/>} aria-label="Confirmar" fontSize="1.5em" onClick={()=>{actualizarTareas(indice,edit);cerrarEdicion()}}></IconButton>
        <IconButton ml={1} icon={<ImCancelCircle/>} aria-label="Cancelar" fontSize="1.5em" onClick={()=>cerrarEdicion()}></IconButton>
        </Flex>
    )
}
