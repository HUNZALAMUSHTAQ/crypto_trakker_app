import React, { useState , useEffect} from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button
} from '@material-ui/core';
import axios from 'axios';



const Login= () => {
  
  
  
  const [loginEmail, setloginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  axios.defaults.withCredentials = true
  const auth = () => {
    axios.post("http://localhost:8000/login", {
      email: loginEmail,
      password: loginPassword
    });
  //   axios.get("http://localhost:8000/auth", { withCredentials: true }).then((response) => {
  //   console.log(response);
  // });
  }

  useEffect(() => {
    axios.get('http://localhost:8000/login').then((response)=>{
      console.log(response);
    })
  }, [])
  

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Username" onChange={(e) => {setloginEmail(e.target.value)}}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(e) => {setLoginPassword(e.target.value)}}></TextField>
          </Grid>
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={auth}> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;