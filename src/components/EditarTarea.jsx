import {useState} from 'react'
import {Input,Flex,IconButton} from "@chakra-ui/react"
import {GiConfirmed} from 'react-icons/gi'
import {ImCancelCircle} from 'react-icons/im'
import { runTransaction, doc } from '@firebase/firestore'
import db from './../util/firebase'

export const EditarTarea = ({tarea, tareas,edicion, cerrarEdicion,setMensajeAlerta,
                            mostrarAlerta}) =>{
    const [edit,setEdit] = useState(tarea.tarea)
    const eventEdit = (event) => 
        setEdit(event.target.value);

    const actualizarTareas = (edit) =>{
        
        if (edit === ''){
            setMensajeAlerta('No se puede incluir una tarea vacía');
            
            mostrarAlerta()
        }
        else if (tareas.find(e => e.tarea===edit) !== undefined){
            setMensajeAlerta('Esta tarea ya se encuentra en el listado')
            mostrarAlerta()
          }
          else{
        const versionEditada = tareas.map( x => x.id === tarea.id ?
                                             ({id: x.id, tarea:edit}):
                                             ({id: x.id, tarea: x.tarea}))
        edicion(versionEditada)
        const editar = async () => {
           const sfDocRef = doc(db, "tareasBase", tarea.id)
            await runTransaction(db, async (transaction) =>{
                const sfDoc = await transaction.get(sfDocRef);
                transaction.update(sfDocRef, {tarea: `${edit}`})
                }) 
        }
        editar()
    }
}
    
    

    return(
        <Flex>
        <Input width={{base:'11em',md:'35em'}} autoFocus bg='white' defaultValue={tarea.tarea} fontSize="1.3em"  onChange={eventEdit}/>
        <IconButton ml={1} icon={<GiConfirmed/>} aria-label="Confirmar" fontSize="1.5em" onClick={()=>{actualizarTareas(edit);cerrarEdicion()}}></IconButton>
        <IconButton ml={1} icon={<ImCancelCircle/>} aria-label="Cancelar" fontSize="1.5em" onClick={()=>cerrarEdicion()}></IconButton>
        </Flex>
    )
}
