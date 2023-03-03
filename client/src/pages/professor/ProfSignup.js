import { useProfSignup } from "../../hooks/useProfSignup"
import * as React from 'react';

// email, password, name, dept, chamber, researchInterest, websites, hod

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.bits-pilani.ac.in/">
          Birla Institute of Technology & Science, Pilani
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

const ProfSignup = () => {
  const {signup, error, isLoading} = useProfSignup()

  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const name = data.get('name')
    const dept = data.get('dept')
    const chamber = data.get('chamber')
    const researchInterest = data.get('researchInterest')
    const websites = data.get('websites')
    const hod = false

    // console.log(email, password, name, dept, chamber, researchInterest, websites, hod);
    await signup(email, password, name, dept, chamber, researchInterest, websites, hod)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#0e5ec7' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Faculty Sign up
          </Typography>
          <Box>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/prof/login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dept"
                  label="Department"
                  name="dept"
                //   autoComplete="studentID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="chamber"
                  label="Chamber"
                  name="chamber"
                //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="researchInterest"
                  label="Research Interest"
                  name="researchInterest"
                //   autoComplete="cgpa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="websites"
                  label="LinkedIn, Google Scholar, etc"
                  name="websites"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            {error && <div className="error">{error}</div>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default ProfSignup