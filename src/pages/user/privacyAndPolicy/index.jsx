import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import "./privacypolicy.styles.scss";
export default function PrivacyAndPolicy() {
  return (
    <Container className="privacy-policy-section">
      <Grid spacing={3}>
        <Grid item md={12}>
          <Typography
            variant="h5"
            align="center"
            className="text-decoration-underline"
          >
            Privacy Policy Darul Ifta Kauzariyya
          </Typography>
        </Grid>
        <Grid item md={12} marginTop={1}>
          <Typography variant="subtitle2" align="center" className="fw-bold">
            Updated at 2022-01-01
          </Typography>
        </Grid>
        <Grid item md={12} marginTop={5} marginBottom={3}>
          <Typography variant="paragraph"  sx={{ lineHeight: 1.8, textAlign: "justify" }}>
           <b> DARUL IFTA KAUZARIYYA.</b> ("we," "our," or "us") is committed to
            protecting your privacy. This Privacy Policy explains how your
            personal information is collected, used, and disclosed by DARUL IFTA
            KAUZARIYYA. This Privacy Policy applies to our <b>website :-</b> 
             <a href="">daruliftakauzariyya.com </a>, and its associated subdomains
            (collectively, our "Service") alongside our application, DARUL IFTA
            KAUZARIYYA. By accessing or using our Service, you signify that you
            have read, understood, and agree to our collection, storage, use,
            and disclosure of your personal information as described in this
            Privacy Policy and our Terms of Service.
          </Typography>
        </Grid>
        <Divider/>
      </Grid>
      <Grid item md={12} marginTop={4}>
        <Paper elevation={2} className="p-4">
          <Grid item md={12}>
          <Typography variant="h5">
          Definitions and key terms
          </Typography>
          </Grid>
          <Grid item md={12} marginTop={1}>
            <Typography variant="paragraph">
            For this Privacy Policy
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}
