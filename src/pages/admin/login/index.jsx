import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./admin-login.styles.scss";
export default function Login() {
  return (
    <div className="admin-login">
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Box className="d-flex" sx={{ height: "450px" }}>
            <Grid
              container
              spacing={2}
              mb={2}
              className="d-flex justify-content-center align-content-center"
            >
              <Grid item xs={8} className="d-flex justify-content-center">
                <LockOpenIcon className="lock-icon"/>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4" align="center" className="heading-section" gutterBottom>
                  Admin Panel
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  size="small"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  size="small"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid align="center" mt={2} item xs={8}>
                <Button className="login-button" fullWidth variant="contained">Login</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
