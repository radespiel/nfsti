import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { AlternateEmail } from '@material-ui/icons';

export default function Lancar(props) {
  const [oc, setOc] = useState(false);
  const [cer, setCer] = useState(false);
  const [base64Pdf, setBase64Pdf] = useState("");     

  const handleOcChange = (event) => {
    setOc(event.target.checked);
  };

  const handleCerChange = (event) => {
    setCer(event.target.checked);
  };

  const handlePdfChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        console.log(reader.result)
        setBase64Pdf(reader.result)
    };
  }

  async function lancaNf(){
    await axios.post('http://localhost:3001/notas/lancatriare', {
      PHPSESSID: localStorage.getItem('PHPSESSID'),
    }, {
      headers: {
      }
  })
  .then((res) => { 
    alert("nota lançada com sucesso!")
  })
  .catch((error) => {
    alert("Deu algum erro :(")
    console.error(error)
  })

    axios.post('http://localhost:3001/notas/lancanfsti', {
      fornecedor: document.getElementById("fornecedor").value,
      cnpj: document.getElementById("cnpj").value,
      vencimento: document.getElementById("vencimento").value,
      carimbo: document.getElementById("carimbo").value,
      numero: document.getElementById("numeronf").value,
      serie: document.getElementById("serienf").value,
      temoc: oc,
      temcer: cer,
      obs: document.getElementById("obs").value,
      anexopdf: base64Pdf,
      quem: localStorage.getItem('cookieLogin'),
      triare: "251.123"
    }, {
      headers: {
      }
  })
  .then((res) => { 
    alert("nota lançada com sucesso!")
  })
  .catch((error) => {
    alert("Deu algum erro :(")
    console.error(error)
  })
  }
    return(
        <Box>
        <h2>Lançar Nota</h2>
        <form noValidate justifyContent="center" >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="fornecedor"
          label="Fornecedor"
        />
         <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="cnpj"
          label="CNPJ" 
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="numeronf"
          label="Número da NF"
          type="number"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="serienf"
          label="Série da NF"
          type="number"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="vencimento"
          label=""
          format="YYYY-MM-DD"
          type="date"
        />
         <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="carimbo"
          label="Carimbo"
        />
        <label>Possui Ordem de Compra</label>
        <Checkbox
            checked={oc}
            onChange={handleOcChange}
            name="checkedB"
            color="primary"
            id="temoc"
          />
          <br></br>
          <label>Possui CER</label>
        <Checkbox
            checked={cer}
            onChange={handleCerChange}
            name="checkedB"
            color="primary"
            id="temcer"
          />
          <br></br>
          <TextField
          id="obs"
          label="Observações"
          multiline
          fullWidth
          rows={4}
        />
        <br></br>
        <br></br>
        <label>Anexar NF</label>
        <br></br>
        <input type="file" accept="application/pdf" id="anexo" onChange={handlePdfChange}></input>
        <Box m={2}>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{width: "200px"}}
          onClick={lancaNf}
          >
          Enviar Nota
          </Button>
        </Box>
        </form>
        </Box>
        );
}