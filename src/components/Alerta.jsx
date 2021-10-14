import React from 'react'
import {
    Alert,AlertIcon,
    AlertDescription,CloseButton} from "@chakra-ui/react"

const Alerta = ({mensaje,close}) => {
    
    return(
        <Alert width={{base:"80%",md:"40%"}} status="error">
            <AlertIcon />
            
            <AlertDescription width='80%' textAlign='center'>{mensaje}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={close}/>
        </Alert>
    )
}



export default Alerta