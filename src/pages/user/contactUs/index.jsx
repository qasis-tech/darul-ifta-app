import { Grid, Paper, Typography } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FooterComponent from "../../../components/Footer";
import "./contact.styles.scss";
export default function ContactUs() {
  return (
    <div className="contact-page">
      <div className="contact-section">
        <div className="container">
          <Grid spacing={2}>
            <Grid item md={12}>
              <Paper elevation={2} className="p-3 main-section">
                <Grid item md={12} className="main-heading">
                  <Typography variant="h4" align="center">
                    Contact Us
                  </Typography>
                </Grid>
                <Grid item md={12} className="d-flex align-items-center">
                  <Typography variant="subtile1" align="center">
                    AL JAMIATHUL KAUZARIYYA ARABIC COLLEGE
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid spacing={2} className="p-4 d-flex second-section">
            <Grid item xs={6} spacing={4} className="p-4 d-flex sub-main">
              <Grid item xs={4} className="p-3 sub">
                <ImportContactsIcon className="icons" />
                <Typography variant="h6" align="center" marginBottom={1}>
                  Address
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  Aluva , Edathala North <br />
                  P/O , Ernakulam Kerala ,<br /> INDIA , 683564
                </Typography>
              </Grid>

              <Grid item xs={4} className="p-3 sub">
                <EmailIcon className="icons" />
                <Typography variant="h6" align="center" marginBottom={1}>
                  Email
                </Typography>
                <Typography variant="subtitle1" align="center">
                  kausariyya@gmail.com
                </Typography>
              </Grid>

              <Grid item xs={4} className="p-3 sub">
                <LocalPhoneIcon className="icons" />
                <Typography variant="h6" align="center" marginBottom={1}>
                  Phone
                </Typography>
                <Typography variant="subtitle1" align="center">
                  +91 9809 677 219 ( office )
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} className="p-5 sub-title w-50">
              <Grid item xs={12}>
                <Typography variant="h4" align="center" className="main">
                  Contact Us
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={2}>
                <Typography variant="subtitle1" align="center" className="main">
                  Contact Us to know more about us!
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item spacing={2} marginBottom={6}>
            <Grid item xs={12}>
              <iframe
              className="maping"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1964.1560178343377!2d76.3738226!3d10.0734983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0809f661857ae9%3A0x9aaa303d344d6ef3!2sDARUL%20IFTA%20KAUZARIYYA!5e0!3m2!1sen!2sin!4v1669264374983!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{border:"0"}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
}
