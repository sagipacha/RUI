import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from '../../context/UserProvider';
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { APIBaseUrl } from '../../config/Api'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";
import { UserContext } from "../../context/User";
import { APIBaseUrl } from "../../config/API";
import axios from "axios";


function SignIn() {
  // const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { user, getUserFromDb, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, password } = formData;
    try {
      const res = await axios.post(`${APIBaseUrl}/users/login`, {
        email,
        password,
      });
      const token = res.data; 
      console.log(token);
    
      localStorage.setItem("RUI_user_token", token);
      await getUserFromDb();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Email or password are incorrect");
      } else {
        console.log("An error occurred:", error.message);
      }
    }
  };

  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
    console.log(formData);

  };

  // useEffect(() => {
  //   if (user?.email) {
  //     navigate('/profile');

  //   }
  // }, [user])

  const [rememberMe, setRememberMe] = useState(true);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleGoogleLogin = async (response) => {
    const res = await axios.post(`${APIBaseUrl}/users/auth/google`, {
      token: response.credential,
    });
    navigate('/'); 

    console.log({ res });
    setUser(res.user);

  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={changeHandler}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={changeHandler}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox color="primary" onChange={handleCheckboxChange} />
                }
                label="Remember me"
                checked={rememberMe}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <GoogleLogin
                clientId="576900486233-90d7lc7agfbv5d6769gk14p0k6nv5lel.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleLogin}
                onFailure={(error) => console.log("Login Failed:", error)}
                cookiePolicy={"single_host_origin"}
              />

              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // const credentialResponseDecoded = jwt.decode(
                  //   credentialResponse.credential
                  // );
                  console.log({ credentialResponse });
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}

              <p></p>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <RouterLink to="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default SignIn;
