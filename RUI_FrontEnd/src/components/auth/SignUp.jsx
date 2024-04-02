import React, { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { APIBaseUrl } from '../../config/Api';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { APIBaseUrl } from "../../config/API";
import axios from "axios";
import { UserContext } from "../../context/User";


const theme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { user, getUserFromDb, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    const { email, password, firstName, lastName } = formData;
    e.preventDefault();
    try {
      const res = await axios.post(`${APIBaseUrl}/users/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      const data = res.data;
      localStorage.setItem("RUI_user_token", data.token);
      setUser(data.user);
      naviagte("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>

              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                select
                fullWidth
                label="Role"
                SelectProps={{
                  native: true,
                }}>
                <option value="player">User</option>
                <option value="admin">Admin</option>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credentialResponseDecoded = jwt.decode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              <p></p>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/SignIn" variant="body2">
                    Already have an account? Sign in
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;