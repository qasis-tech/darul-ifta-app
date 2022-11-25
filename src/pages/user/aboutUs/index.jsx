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
              <Grid item xs={6} className="p-5 about-content-section">
                {/* <Grid item xs={12}>
                  <Typography variant="h4">
                    About Us
                  </Typography>
                </Grid> */}
                <Grid item xs={12} marginTop={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    This DARUL IFTA KAUZARIYYA
                    (https://daruliftakauzariyya.com)is a site for online fatwas
                    (Islamic queries) running under the supervision of Al
                    Jamiathul Kauzariyya Fatwa board to guide the community to
                    authentic rulings of Islam.
                  </Typography>
                </Grid>
                <Grid item xs={12} marginTop={4}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    For the last 47 years, the Jamiathul Kauzariyya Arabic
                    college is providing enormous contributions to the Islamic
                    community. Our organisation is the first Islamic institution
                    in Kerala under Maslak-e-Deoband which was established on
                    1972.
                  </Typography>
                </Grid>

                <Grid item xs={12} marginTop={4}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Within this short period of time, we have offered more than
                    600 Ulamas & 2000 s of Huffaz and their servicing the Muslim
                    ummah all over the world.
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
