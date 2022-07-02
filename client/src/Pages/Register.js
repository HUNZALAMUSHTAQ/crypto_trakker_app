import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button
} from '@material-ui/core';
import axios from 'axios';



const Register= () => {

  
  
  
  const [registerEmail, setregisterEmail] = useState("")
  const [registerPassword, setregisterPassword] = useState("")
  const [registerPhoneNumber, setregisterPhoneNumber] = useState("")
  const [registerUserName, setregisterUserName] = useState("")
  // axios.defaults.withCredentials = true
  const auth = () => {
    axios.post("http://localhost:8000/register", {
      email: registerEmail,
      password: registerPassword,
      userName: registerUserName,
      phoneNumber: registerPhoneNumber

    });
  //   axios.get("http://localhost:8000/auth", { withCredentials: true }).then((response) => {
  //   console.log(response);
  // });
  }
  

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
            <TextField label="Username" onChange={(e) => {setregisterEmail(e.target.value)}}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(e) => {setregisterPassword(e.target.value)}}></TextField>
          </Grid>
          <Grid item xs={12}>
          <TextField label='UserName' onChange={(e) => {setregisterUserName(e.target.value)}}></TextField>
          </Grid>
          <Grid item xs={12}>
          <TextField label='Phone number' onChange={(e) => {setregisterPhoneNumber(e.target.value)}} ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={auth}> Register </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Register;