import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SelectedUser(props) {

  function deleteUser(){
    axios.delete('http://localhost:3000/api/admin/users/'+props.selectedRow.id, {
      headers: {
      'Authorization': props.tokenp
      }
  })
  .then((res) => {
    props.changeSelected({email: "", id: "", name: "", birthdate: "", condition: "", birthdateconverted: ""})
    console.log("operação teve sucesso:", res.data)
  })
  .catch((error) => {
    console.error(error)
  })
  }

  function updateUser(){
    axios.post('http://localhost:3000/api/admin/users', props.selectedRow, {
      headers: {
      'Authorization': props.tokenp
      }
  })
  .then((res) => {
    props.changeSelected({...props.selectedRow, forcereload: Math.random(0,100)}) 
  })
  .catch((error) => {
    console.error(error)
  })
  }

    return(
        <form noValidate justifyContent="center" >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="id"
          label="ID"
          value={props.selectedRow.id}
          disabled
        />
         <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Nome"
          value={props.selectedRow.name}
          onChange={e => props.changeSelected({...props.selectedRow, name:e.target.value})}
      
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          value={props.selectedRow.email}
          onChange={e => props.changeSelected({...props.selectedRow, email:e.target.value})}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="birthdate"
          label=""
          value={props.selectedRow.birthdate.slice(0,10)}
          format="YYYY-MM-DD"
          type="date"
          onChange={e => props.changeSelected({...props.selectedRow, birthdate:e.target.value})}
        />
         <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="condition"
          label="Condição"
          value={props.selectedRow.condition}
          onChange={e => props.changeSelected({...props.selectedRow, condition:e.target.value})}
        />
        <Box display="flex" flexDirection="row">
        <Box m={2}>
        <Button
        variant="contained"
        color="secondary"
        style={{width: "200px"}}
        onClick={deleteUser}
      
         >
            Remover Usuário
          </Button>
          </Box>
          <Box m={2}>
          <Button
        variant="contained"
        color="primary"
        style={{width: "200px"}}
        onClick={updateUser}
         >
            Salvar Alterações
          </Button>
          </Box>
          </Box>
      </form>    
    );
}