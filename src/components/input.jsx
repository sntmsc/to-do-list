import {useState} from 'react'
import {Input, Button} from "@chakra-ui/react"
import { collection,addDoc} from 'firebase/firestore';
import db from './../util/firebase'

const InputForm = ({tareas, cambiarTareas, cambiarAlerta, mostrarAlerta})=> {
    const [nuevaTarea, setNuevaTarea] = useState('');

    const eventNuevaTarea = (event) => 
    setNuevaTarea(event.target.value);

    const agregarTarea = (event) => {
        event.preventDefault();
        if(tareas.find(e => e.tarea===nuevaTarea) !== undefined){
          cambiarAlerta('Esta tarea ya se encuentra en el listado')
          mostrarAlerta()
        }
        else if(nuevaTarea===''){
          cambiarAlerta('No se puede incluir una tarea vacía')
          mostrarAlerta()
        }
        else{
          cambiarTareas([...tareas].concat({tarea:nuevaTarea}));
    
          const agregarTareasBase = async() => {
            await addDoc(collection(db, "tareasBase"), {
              tarea: `${nuevaTarea}`
            })
          }
          agregarTareasBase()
      
          setNuevaTarea('');
        }
      }
      
    return(
        <form onSubmit={agregarTarea}>
            <Input width={{base:"80%", md:"50%"}} value={nuevaTarea} onChange={eventNuevaTarea}/>
            <Button colorScheme="teal" variant="outline" size="md" fontFamily="'Source Code Pro', monospace;" type="submit" mt={{base:'.5em',md:'0'}} ml={2}>Agregar</Button>
        </form>
    )
}




export default InputForm