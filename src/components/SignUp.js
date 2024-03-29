import React, { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import avataars from "../images/avataaars.png"

const SignUp = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credintials, setcredintials] = useState({ name: "", email: "", password: "", repassword: "" });

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credintials.name, emails: credintials.email, password: credintials.password }),
    });
    const note = await response.json()
    console.log(note);
    if (note.success) {
      localStorage.setItem('token', note.authtoken);
      props.showAlerts('Your account has been successfully created', 'success', 'Success');
      navigate('/login');
    }
    else {
      props.showAlerts('Invalid credentials', 'danger', 'Failed');
    }
  }
  const onChange = (e) => {
    setcredintials({ ...credintials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className="d-flex" >
        <div className="col-md-5">
          <img className="img-fluid" src={avataars} alt="register" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
        </div>

        <div className="col-md-7 ps-5 pe-5 pt-5" style={{ width: "60%" }}>
          <h2 style={{ fontWeight: "Bold" }}>Create a new account</h2>
          <p className="mb-4">Use your email to create a new account</p>
          <form autoComplete="off" noValidate>
            <div className="mb-4">
              <TextField color="secondary" label="Name" name="name" value={credintials.name} variant="outlined" fullWidth onChange={onChange}/>
            </div>
            <div className="mb-4">
              <TextField type="email" color="secondary" name="email" value={credintials.email} label="Email" variant="outlined" fullWidth onChange={onChange}/>
            </div>
            <div className="mb-4">
              <FormControl variant="outlined" fullWidth>
                <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  color="secondary"
                  name="password"
                  value={credintials.password}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password" onChange={onChange}/>
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl variant="outlined" fullWidth>
                <InputLabel color="secondary" htmlFor="outlined-adornment-password">Re-Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  color="secondary"
                  label="Re-Password" />
              </FormControl>
            </div>
            <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit}>Register now</Button>
          </form>
          <p>If have an account? <Link to="/login" >LogIn</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
