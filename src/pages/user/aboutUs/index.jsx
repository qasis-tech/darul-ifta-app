import { Container, Grid, Paper, Typography } from "@mui/material";

import AboutImage from "../../../assets/images/about-image.png";
import AboutImage1 from "../../../assets/images/about1.png";

import FooterComponent from "../../../components/Footer";
import "./about.styles.scss";
export default function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-section">
        <div className="container">
          <Grid spacing={2}>
            <Grid item md={12}>
              <Paper elevation={2} className="p-3 main-section">
                <Grid item md={12} className="main-heading">
                  <Typography variant="h4" align="center">
                    About Us
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ഈ ദാറുൽ ഇഫ്ത കൗസരിയ്യ (https://daruliftakauzariyya.com)!
                    ഇസ്‌ലാമിന്റെ ആധികാരിക വിധികളിലേക്ക് മനുഷ്യരാശിയെ നയിക്കാൻ അൽ
                    ജംഇയ്യത്തുൽ കൗസരിയ്യ ഫത്വ ബോർഡിന്റെ മേൽനോട്ടത്തിൽ
                    പ്രവർത്തിക്കുന്ന ഓൺലൈൻ ഫത്‌വകൾക്കായുള്ള (ഇസ്‌ലാമിക
                    അന്വേഷണങ്ങൾ) ഒരു സൈറ്റ്.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    കഴിഞ്ഞ 47 വർഷമായി ജംഇയ്യത്തുൽ കൗസരിയ്യ അറബിക് കോളേജ്
                    ഇസ്‌ലാമിക സമൂഹത്തിന് മഹത്തായ സംഭാവനകൾ നൽകുന്നുണ്ട്. 1972-ൽ
                    സ്ഥാപിതമായ മസ്‌ലക്-ഇ-ദിയോബന്ദിന്റെ കീഴിൽ കേരളത്തിലെ ആദ്യത്തെ
                    ഇസ്ലാമിക സ്ഥാപനമാണ് ഞങ്ങളുടെ സംഘടന.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ഈ ചുരുങ്ങിയ സമയത്തിനുള്ളിൽ, ഞങ്ങൾ 600-ലധികം ഉലമകളെയും
                    2000-ലധികം ഹുഫാസുകളെയും ലോകമെമ്പാടുമുള്ള മുസ്ലീം ഉമ്മാക്ക്
                    അവരുടെ സേവനവും വാഗ്ദാനം ചെയ്തിട്ടുണ്ട്.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ഈ മദ്രസയുടെ കീഴിൽ, കഴിഞ്ഞ 11 വർഷമായി തെറ്റിദ്ധാരണകൾ
                    നീക്കുന്നതിനും മനുഷ്യരാശിയെ യഥാർത്ഥ ഇസ്ലാമിക പാതയിലേക്ക്
                    നയിക്കുന്നതിനുമായി ഫിഖ്ഹ് വകുപ്പിന് കീഴിൽ ഒരു ദാറുൽ ഇഫ്ത
                    പ്രവർത്തിക്കുന്നു. പ്രമുഖ പണ്ഡിതന്മാരുടെ മാർഗനിർദേശപ്രകാരം
                    ഏകദേശം 22 മുഫ്തിമാർ ഈ വകുപ്പിൽ പഠനം പൂർത്തിയാക്കിയിട്ടുണ്ട്.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    തുടക്കത്തിലും സർവേയിലും അക്ഷരങ്ങളിലൂടെയും പിന്നീട് ഞങ്ങളുടെ
                    മദ്രസ വെബ്‌സൈറ്റിലൂടെ ഓൺലൈൻ q & ഒരു ഓപ്ഷനും ഞങ്ങൾ
                    അവതരിപ്പിച്ചു, അത് ഹസ്രത്ത് മൗലാന സയ്യിദ് അർഷാദ് മദനി സാഹിബ്
                    (ഉസ്താദുൽ ഹദീസ് - ദാറുൽ ഉലൂം ദയൂബന്ദ്) ഉദ്ഘാടനം ചെയ്തു.
                    FATWA വാഗ്‌ദാനം ചെയ്‌ത് മുസ്‌ലിം ഉമ്മത്തിനെ സഹായിക്കുക എന്ന
                    ലക്ഷ്യവും ആശയവുമായി 2010-ൽ https://daruliftakauzariyya.com/
                    എന്ന സംരംഭം ഞങ്ങൾ ആരംഭിച്ചു.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ശരീഅത്ത് നിയമങ്ങൾ ഏറ്റവും മികച്ചത് ചെയ്യുമെന്ന് ഞങ്ങൾ
                    മുസ്ലിം ഉമ്മത്തിന് വാഗ്ദാനം ചെയ്യുന്നു.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ഈ വെബ്‌സൈറ്റ് ഇസ്ലാമിക ശരീഅവുമായി ബന്ധപ്പെട്ട ഫത്‌വാ
                    ചോദിക്കാൻ പ്രത്യേകം ഉദ്ദേശിച്ചുള്ളതാണ്. ഫത്വ എന്നാൽ ഒരു
                    മുഫ്തി (ശരീഅത്ത് -ഇസ്‌ലാമിക നിയമശാസ്ത്രം വ്യക്തമാക്കുന്നതിനോ
                    വിശദീകരിക്കുന്നതിനോ ഉള്ള അംഗീകൃത അധികാരം, സാമൂഹികകാര്യങ്ങൾ,
                    ഇടപാടുകൾ, ഇടപാടുകൾ എന്നിവയിലേക്കുള്ള വിശ്വാസങ്ങളും
                    പ്രാർത്ഥനകളും ഉൾപ്പെടുന്നു) നൽകുന്ന ഇസ്ലാമിക നിയമത്തിലെ ഒരു
                    തീരുമാനമാണ്. ഫത്‌വകൾ ഉപദേശം/മാർഗ്ഗനിർദ്ദേശം (ഇസ്‌ലാമിക
                    ശരീഅത്തിൽ നിന്നുള്ള) മാത്രമാണ്, അത് നിയമപരമായ ബാധ്യതകളല്ല.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    മലയാളം, ഇംഗ്ലീഷ്, അറബിക്, ഉർദു എന്നീ നാല് ഭാഷകളിലാണ് ഫത്‌വ
                    നിങ്ങൾക്ക് നൽകിയിരിക്കുന്നത്. ഞങ്ങൾ തയ്യാറാണ്, ഒരു പുതിയ
                    ചോദ്യം ചോദിക്കാനും ഉത്തരങ്ങൾക്കായി തിരയാനും കഴിഞ്ഞ ഫത്‌വ
                    വായിക്കാനും നിങ്ങളുടെ ഗൂഗിൾ അക്കൗണ്ട് നിങ്ങളെ സഹായിക്കും.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    നിങ്ങൾക്ക് എന്തെങ്കിലും ഇസ്ലാമിക ഉപദേശം ആവശ്യമുണ്ടെങ്കിൽ
                    ഞങ്ങളെ ബന്ധപ്പെടാൻ മടിക്കരുത്! നിങ്ങളോടൊപ്പം പ്രവർത്തിക്കാൻ
                    ഞങ്ങൾ ആഗ്രഹിക്കുന്നു!
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ഞങ്ങളുടെ എല്ലാ ശ്രമങ്ങളും അല്ലാഹു സ്വീകരിക്കട്ടെ, ഞങ്ങളുടെ
                    മദ്രസയുടെ കീഴിലുള്ള എല്ലാ മതപരമായ പ്രവർത്തനങ്ങളിലും
                    നിങ്ങളുടെ യഥാർത്ഥ പിന്തുണ പ്രതീക്ഷിക്കുന്നു.
                  </Typography>
                </Grid>
                <Grid item md={12} marginBottom={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    ദാറുൽ ഇഫ്ത - (അൽ ജാമിഅത്തുൽ കൗസരിയ്യ അറബിക് കോളേജ്){" "}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid spacing={2} className="about-main-section d-flex">
              <Grid item xs={6} className="p-5 image-section">
                <img
                  src={AboutImage}
                  width="450"
                  height="600"
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
                <Grid item xs={12} marginTop={3}>
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

                <Grid item xs={12} marginTop={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Within this short period of time, we have offered more than
                    600 Ulamas & 2000 s of Huffaz and their servicing the Muslim
                    ummah all over the world.
                  </Typography>
                </Grid>

                <Grid item xs={12} marginTop={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Under this Madrasa, a Darul Ifta is working under fiqh
                    department to clear the misconceptions and to guide the
                    community towards the realistic Islamic path for the last 11
                    years. Almost 22 Muftis have completed their studies in this
                    department under the guidance of eminent scholars.
                  </Typography>
                </Grid>

                <Grid item xs={12} marginTop={3}>
                  <Typography
                    variant="subtitle1"
                    x={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Under this Madrasa, a Darul Ifta is working under fiqh
                    department to clear the misconceptions and to guide the
                    community towards the realistic Islamic path for the last 11
                    years. Almost 22 Muftis have completed their studies in this
                    department under the guidance of eminent scholars.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid spacing={3} className="about-second-section d-flex">
          <Grid item xs={6}>
            <Paper elevation={2} className="p-5 about-second-content">
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  Initially we provides a survey through letters and later on,
                  we have introduced online q & a option through our Madrasa
                  website which was inaugurated by Hazrath Moulana Syed Arshad
                  Madani Sahib (Usthadul Hadees - Darul Uloom Deoband). We
                  started the initiative https://daruliftakauzariyya.com/ in the
                  year 2010 with the aim and idea of helping the Muslim Ummah by
                  offering FATWA.
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  We promise the Muslim Ummah that Sharia laws will do the best.
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  This website is specially meant for asking fatwas related to
                  Islamic sharia. Fatwa means a decision on a point of Islamic
                  law given by a Mufti (recognized authority to clarify or
                  explain Shariah -Islamic Jurisprudence, which includes Beliefs
                  and Prayers to Social Affairs, Transactions and Dealings).
                  Fatwas are just advice/guidance (from Islamic Shariah) and
                  constitute no legal binding.{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  Fatwa is issued with you in four languages Malayalam, English,
                  Arabic & Urdu. We are ready and your google account will help
                  you to ask a new question, search for answers and read past
                  fatwa.
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  Do not hesitate to contact us if you need any Islamic advice!
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  we look forward to working with you !{" "}
                </Typography>
              </Grid>

              <Grid item xs={12} marginTop={3} marginBottom={2}>
                <Typography
                  variant="subtitle1"
                  x={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  May Allah accept all our efforts & hope your genuine support
                  in all the religious endeavor under our Madrasa.
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} spacing={3} className="image-section px-5">
            <Grid item xs={12} className="second-content">
              <Typography variant="h4" className="title">
                DARUL IFTA – <br />( AL JAMIATHUL KAUZARIYYA ARABIC COLLEGE )
              </Typography>
            </Grid>
            <Grid item xs={12} className="second-image">
              <img
                src={AboutImage1}
                width="288"
                height="288"
                alt="About Image"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <FooterComponent />
    </div>
  );
}
