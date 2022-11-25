import { Container, Grid, Paper, Typography } from "@mui/material";

import AboutImage from "../../../assets/images/about-image.png";
import "./about.styles.scss";
export default function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-section">
        <div className="container">
          <Grid spacing={2}>
            <Grid item md={12}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} className="main-heading">
                  <Typography variant="h4" align="center">
                    About Us
                  </Typography>
                </Grid>
                {/* <Grid item md={6}>
                  <Typography variant="subtitle1" align="center">
                    Islamic University in Kerala which helps to attain massive
                    knowledge in Quraan , Hadith , Fiqh & Aqidah along with
                    intense skill in languages like Arabic, English,Urdu &
                    Malayalam. Please check our full documentation for detailed
                    information on Al Jamiathul Kauzariyya Arabic College
                  </Typography>
                </Grid> */}
              </Paper>
            </Grid>

            <Grid spacing={2} className="about-main-section d-flex">
              <Grid item xs={6} className="p-5 image-section">
                <img
                  src={AboutImage}
                  width="450"
                  height="500"
                  alt="About Image"
                />
              </Grid>
              <Grid item xs={6} className="p-5">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" x={{ lineHeight: 1.8, textAlign: "justify" }}>
                    This DARUL IFTA KAUZARIYYA
                    (https://daruliftakauzariyya.com)is a site for online fatwas
                    (Islamic queries) running under the supervision of Al
                    Jamiathul Kauzariyya Fatwa board to guide the community to
                    authentic rulings of Islam.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
