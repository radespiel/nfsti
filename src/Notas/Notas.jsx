import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import SelectedUser from '../SelectedUser/SelectedUser'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const columns = [
    {field: 'quem', headerName: 'Responsável', width: 220 },
    {field: 'fornecedor', headerName: 'Fornecedor', width: 220 },
    {field: 'cnpj', headerName: 'cnpj', width: 220 },
    {field: 'numero', headerName: 'Número NF', width: 250 },
    {field: 'serie', headerName: 'Série', width: 100 },
    {field: 'carimbo', headerName: 'Carimbo', width: 250 },
    {field: 'vencimentoconverted', headerName: 'Vencimento', width: 250},
    {field: 'temcer', headerName: 'CER', width: 100,},
    {field: 'temoc', headerName: 'OC', width: 100,},
    {field: 'obs', headerName: 'Observações', width: 300,},
    {field: 'triare', headerName: 'Triare', width: 300,},
    {field: 'anexo', headerName: 'Anexo', width: 250 },
  ];

export default function Notas(props) {
    const [notas, setNotas] = useState([]); 
    const [search, setSearch] = useState("");   
    const [selected, setSelected] = useState({email: "", id: "", name: "", birthdate: "", condition: "", forcereload: 0});
    
    function emptyze() {
      if(search === ""){
        return "empty"
      }
      else{
        return search
      }
    }    
    useEffect(() => {
        let copy = search
        axios.get('http://localhost:3001/notas/'+emptyze(), {
        headers: {
        'Authorization': props.tokenp
        }
    })
    .then((res) => {
      setNotas(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
      }, [selected, search])

      return (
     <Box style={{ width: '100%' }} >
     <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="serach"
      label="Pesquisar por número da nota"
      onChange={e => setSearch(e.target.value)}
        />
     <div style={{ height: 400, width: '100%' }}>
        <DataGrid disableMultipleSelection={true} rows={notas} columns={columns} pageSize={5} onCellClick={(cell)=>{console.log(cell.data);if(cell.colDef.field==="anexo"){ window.open("http://"+cell.data.anexo)}}} />
    </div>
      <SelectedUser tokenp={props.tokenp} selectedRow={selected} changeSelected={setSelected}></SelectedUser>
      </Box>
      )
}