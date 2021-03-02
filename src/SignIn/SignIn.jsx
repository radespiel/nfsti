import {React, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors} = useForm();
  const [open, setOpen] = useState(false);
  const [backendMessage, setbackendMessage] = useState("");
  const [loading, setloading] = useState(false);

  const handleClickOpen = (evt) => {
    evt.preventDefault();
    setOpen(true);
    console.log(open)
  };

  let options = {
    baseURL: "http://localhost:3000/api",
    responseType: "application/json"
  };

  let alert
  if(backendMessage !== ""){
  alert = <Alert m={5} severity="warning">{ backendMessage }</Alert>
  }

  let loadingAlert
  if(loading === true){
  loadingAlert = <Box
  display="flex" 
  alignItems="center"
  justifyContent="center">
    <CircularProgress />
  </Box>
  }

const onSubmit = async (data) => {
    setbackendMessage("");
    setloading(true);
    axios.post(`http://localhost:3001/notas/login`, {
      "login": document.getElementById("user").value,
      "senha": document.getElementById("password").value,
    }, {
      headers: {
      }
  })
    .then(res => {
      localStorage.setItem("PHPSESSID", res.data.PHPSESSID);
      localStorage.setItem('cookieLogin', res.data.cookieLogin);
      props.updateToken(res.data.PHPSESSID)
      setloading(false);
      return;
    })
    .catch((er) => {
      if(_.get("response.data.message", er) === undefined){
        setbackendMessage("Erro desconhecido");
        console.log("erro desconhecido");
        setloading(false);
        return;
      }
      setbackendMessage(er.response.data.message);
      setloading(false);
    })
}

const verifyErrorMessageName = (fieldName) => {
  if(_.get(fieldName+".type", errors) === "required"){
    return "Campo obrigatório"
  }
  if(_.get(fieldName+".type", errors) === "maxLength"){
    return "Número máximo de caracteres excedido"
  }
  if(_.get(fieldName+".type", errors) === "minLength"){
    return "Senha de no mínimo 6 caracteres"
  }
  if(_.get(fieldName+".type", errors) === "pattern"){
    return "Formato de Email inválido"
  }
} 


  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>NFS TI</h2>
        <Typography component="h1" variant="h5">
          
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuário"
            autoComplete="user"
            autoFocus
            name="user" 
            error={!!errors.email}
            helperText={verifyErrorMessageName("user")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            inputRef={register({required: true, minLength: 6, maxLength: 60})}
            error={!!errors.password}
            helperText={verifyErrorMessageName("password")}
          />
          {loadingAlert}
          {alert}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}