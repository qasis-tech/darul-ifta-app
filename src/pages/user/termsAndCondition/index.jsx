import { Container, Grid, Paper, Typography } from "@mui/material";

import FooterComponent from "../../../components/Footer";
import "./termsandconditions.styles.scss";
export default function TermsAndConditions() {
  return (
    <div>
      <div className="termsandconditions-section">
        <Container>
          <Grid spacing={3}>
            <Grid item md={12}>
              <Typography
                variant="h5"
                align="center"
                className="text-decoration-underline"
              >
                Terms and Condition
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography
                variant="h5"
                align="center"
                className="text-decoration-underline"
              >
                Darul Ifta Kauzariyya
              </Typography>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">AGREEMENT TO TERMS</Typography>
                </Grid>
                <Grid item md={12} marginTop={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    These Terms of Use constitute a legally binding agreement
                    made between you, whether personally or on behalf of an
                    entity (“you”) and DARUL IFTA KAUZARIYYA, doing business as
                    KAUZARIYYA("KAUZARIYYA," “we," “us," or “our”), concerning
                    your access to and use of the{" "}
                    <a href="">daruliftakauzariyya.com</a> website as well as
                    any other media form, media channel, mobile website or
                    mobile application related, linked, or otherwise connected
                    thereto (collectively, the “Site”). We are registered in
                    India and have our registered office at Kauzariyya Arabic
                    college, Edathala North PO, Ernakulam, Kerala 683561. You
                    agree that by accessing the Site, you have read, understood,
                    and agreed to be bound by all of these Terms of Use. IF YOU
                    DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
                    EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST
                    DISCONTINUE USE IMMEDIATELY.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Supplemental terms and conditions or documents that may be
                    posted on the Site from time to time are hereby expressly
                    incorporated herein by reference. We reserve the right, in
                    our sole discretion, to make changes or modifications to
                    these Terms of Use from time to time. We will alert you
                    about any changes by updating the “Last updated” date of
                    these Terms of Use, and you waive any right to receive
                    specific notice of each such change. Please ensure that you
                    check the applicable Terms every time you use our Site so
                    that you understand which Terms apply. You will be subject
                    to, and will be deemed to have been made aware of and to
                    have accepted, the changes in any revised Terms of Use by
                    your continued use of the Site after the date such revised
                    Terms of Use are posted.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    The information provided on the Site is not intended for
                    distribution to or use by any person or entity in any
                    jurisdiction or country where such distribution or use would
                    be contrary to law or regulation or which would subject us
                    to any registration requirement within such jurisdiction or
                    country. Accordingly, those persons who choose to access the
                    Site from other locations do so on their own initiative and
                    are solely responsible for compliance with local laws, if
                    and to the extent local laws are applicable.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">
                    INTELLECTUAL PROPERTY RIGHTS
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Unless otherwise indicated, the Site is our proprietary
                    property and all source code, databases, functionality,
                    software, website designs, audio, video, text, photographs,
                    and graphics on the Site (collectively, the “Content”) and
                    the trademarks, service marks, and logos contained therein
                    (the “Marks”) are owned or controlled by us or licensed to
                    us, and are protected by copyright and trademark laws and
                    various other intellectual property rights .The Content and
                    the Marks are provided on the Site “AS IS” for your
                    information and personal use only. Except as expressly
                    provided in these Terms of Use, no part of the Site and no
                    Content or Marks may be copied, reproduced, aggregated,
                    republished, uploaded, posted, publicly displayed, encoded,
                    translated, transmitted, distributed, sold, licensed, or
                    otherwise exploited for any commercial purpose whatsoever,
                    without our express prior written permission.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Provided that you are eligible to use the Site, you are
                    granted a limited license to access and use the Site and to
                    download or print a copy of any portion of the Content to
                    which you have properly gained access solely for your
                    personal, non-commercial use. We reserve all rights not
                    expressly granted to you in and to the Site, the Content and
                    the Marks.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">USER REPRESENTATIONS</Typography>
                </Grid>
                <Grid item md={12} marginTop={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    By using the Site, you represent and warrant that: (1) all
                    registration information you submit will be true, accurate,
                    current, and complete; (2) you will maintain the accuracy of
                    such information and promptly update such registration
                    information as necessary; (3) you have the legal capacity
                    and you agree to comply with these Terms of Use; (4) you are
                    not a minor in the jurisdiction in which you reside; (5) you
                    will not access the Site through automated or non-human
                    means, whether through a bot, script, or otherwise; (6) you
                    will not use the Site for any illegal or unauthorized
                    purpose; and (7) your use of the Site will not violate any
                    applicable law or regulation.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    If you provide any information that is untrue, inaccurate,
                    not current, or incomplete, we have the right to suspend or
                    terminate your account and refuse any and all current or
                    future use of the Site (or any portion thereof).
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">USER REGISTRATION</Typography>
                </Grid>
                <Grid item md={12} marginTop={3} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    You may be required to register with the Site. You agree to
                    keep your password confidential and will be responsible for
                    all use of your account and password. We reserve the right
                    to remove, reclaim, or change a username you select if we
                    determine, in our sole discretion, that such username is
                    inappropriate, obscene, or otherwise objectionable.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">PROHIBITED ACTIVITIES</Typography>
                </Grid>
                <Grid item md={12} marginTop={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    You may not access or use the Site for any purpose other
                    than that for which we make the Site available. The Site may
                    not be used in connection with any commercial endeavors
                    except those that are specifically endorsed or approved by
                    us.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={3} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    As a user of the Site, you agree not to:
                  </Typography>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Systematically retrieve data or other content from the
                        Site to create or compile, directly or indirectly, a
                        collection, compilation, database, or directory without
                        written permission from us.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Trick, defraud, or mislead us and other users,
                        especially in any attempt to learn sensitive account
                        information such as user passwords.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Circumvent, disable, or otherwise interfere with
                        security-related features of the Site, including
                        features that prevent or restrict the use or copying of
                        any Content or enforce limitations on the use of the
                        Site and/or the Content contained therein.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Disparage, tarnish, or otherwise harm, in our opinion,
                        us and/or the Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Use any information obtained from the Site in order to
                        harass, abuse, or harm another person.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Make improper use of our support services or submit
                        false reports of abuse or misconduct.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Use the Site in a manner inconsistent with any
                        applicable laws or regulations.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Engage in unauthorized framing of or linking to the
                        Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Upload or transmit (or attempt to upload or to transmit)
                        viruses, Trojan horses, or other material, including
                        excessive use of capital letters and spamming
                        (continuous posting of repetitive text), that interferes
                        with any party’s uninterrupted use and enjoyment of the
                        Site or modifies, impairs, disrupts, alters, or
                        interferes with the use, features, functions, operation,
                        or maintenance of the Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Engage in any automated use of the system, such as using
                        scripts to send comments or messages, or using any data
                        mining, robots, or similar data gathering and extraction
                        tools.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Delete the copyright or other proprietary rights notice
                        from any Content.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Attempt to impersonate another user or person or use the
                        username of another user.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Upload or transmit (or attempt to upload or to transmit)
                        any material that acts as a passive or active
                        information collection or transmission mechanism,
                        including without limitation, clear graphics interchange
                        formats (“gifs”), 1×1 pixels, web bugs, cookies, or
                        other similar devices (sometimes referred to as
                        “spyware” or “passive collection mechanisms” or “pcms”).
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Interfere with, disrupt, or create an undue burden on
                        the Site or the networks or services connected to the
                        Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Harass, annoy, intimidate, or threaten any of our
                        employees or agents engaged in providing any portion of
                        the Site to you.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Attempt to bypass any measures of the Site designed to
                        prevent or restrict access to the Site, or any portion
                        of the Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Copy or adapt the Site’s software, including but not
                        limited to Flash, PHP, HTML, JavaScript, or other code.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Except as permitted by applicable law, decipher,
                        decompile, disassemble, or reverse engineer any of the
                        software comprising or in any way making up a part of
                        the Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Except as may be the result of standard search engine or
                        Internet browser usage, use, launch, develop, or
                        distribute any automated system, including without
                        limitation, any spider, robot, cheat utility, scraper,
                        or offline reader that accesses the Site, or using or
                        launching any unauthorized script or other software.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Use a buying agent or purchasing agent to make purchases
                        on the Site.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Make any unauthorized use of the Site, including
                        collecting usernames and/or email addresses of users by
                        electronic or other means for the purpose of sending
                        unsolicited email, or creating user accounts by
                        automated means or under false pretenses.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Use the Site as part of any effort to compete with us or
                        otherwise use the Site and/or the Content for any
                        revenue-generating endeavor or commercial enterprise.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Use the Site to advertise or offer to sell goods and
                        services.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Sell or otherwise transfer your profile.
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        sexual contents{" "}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item md={9} marginTop={2}>
                    <Paper elevation={2} className="p-4">
                      <Typography
                        variant="paragraph"
                        sx={{ lineHeight: 1.8, textAlign: "justify" }}
                      >
                        Things that cause religious communalism
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">SUBMISSIONS</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    You acknowledge and agree that any questions, comments,
                    suggestions, ideas, feedback, or other information regarding
                    the Site ("Submissions") provided by you to us are
                    non-confidential and shall become our sole property. We
                    shall own exclusive rights, including all intellectual
                    property rights, and shall be entitled to the unrestricted
                    use and dissemination of these Submissions for any lawful
                    purpose, commercial or otherwise, without acknowledgment or
                    compensation to you. You hereby waive all moral rights to
                    any such Submissions, and you hereby warrant that any such
                    Submissions are original with you or that you have the right
                    to submit such Submissions. You agree there shall be no
                    recourse against us for any alleged or actual infringement
                    or misappropriation of any proprietary right in your
                    Submissions.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">SITE MANAGEMENT</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    We reserve the right, but not the obligation, to: (1)
                    monitor the Site for violations of these Terms of Use; (2)
                    take appropriate legal action against anyone who, in our
                    sole discretion, violates the law or these Terms of Use,
                    including without limitation, reporting such user to law
                    enforcement authorities; (3) in our sole discretion and
                    without limitation, refuse, restrict access to, limit the
                    availability of, or disable (to the extent technologically
                    feasible) any of your Contributions or any portion thereof;
                    (4) in our sole discretion and without limitation, notice,
                    or liability, to remove from the Site or otherwise disable
                    all files and content that are excessive in size or are in
                    any way burdensome to our systems; and (5) otherwise manage
                    the Site in a manner designed to protect our rights and
                    property and to facilitate the proper functioning of the
                    Site.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">PRIVACY POLICY</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    We care about data privacy and security.Please review our
                    Privacy Policy By using the Site, you agree to be bound by
                    our Privacy Policy, which is incorporated into these Terms
                    of Use. Please be advised the Site is hosted in India. If
                    you access the Site from any other region of the world with
                    laws or other requirements governing personal data
                    collection, use, or disclosure that differ from applicable
                    laws in India, then through your continued use of the Site,
                    you are transferring your data to India, and you agree to
                    have your data transferred to and processed in India.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">TERM AND TERMINATION</Typography>
                </Grid>
                <Grid item md={12} marginTop={2} marginBottom={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    These Terms of Use shall remain in full force and effect
                    while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION
                    OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE
                    DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO
                    AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP
                    ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
                    INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
                    REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE
                    TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
                    TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE
                    YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED
                    AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    If we terminate or suspend your account for any reason, you
                    are prohibited from registering and creating a new account
                    under your name, a fake or borrowed name, or the name of any
                    third party, even if you may be acting on behalf of the
                    third party. In addition to terminating or suspending your
                    account, we reserve the right to take appropriate legal
                    action, including without limitation pursuing civil,
                    criminal, and injunctive redress.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">
                    MODIFICATIONS AND INTERRUPTIONS
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={2} marginBottom={3}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    We reserve the right to change, modify, or remove the
                    contents of the Site at any time or for any reason at our
                    sole discretion without notice. However, we have no
                    obligation to update any information on our Site. We also
                    reserve the right to modify or discontinue all or part of
                    the Site without notice at any time. We will not be liable
                    to you or any third party for any modification, price
                    change, suspension, or discontinuance of the Site.
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    We cannot guarantee the Site will be available at all times.
                    We may experience hardware, software, or other problems or
                    need to perform maintenance related to the Site, resulting
                    in interruptions, delays, or errors. We reserve the right to
                    change, revise, update, suspend, discontinue, or otherwise
                    modify the Site at any time or for any reason without notice
                    to you. You agree that we have no liability whatsoever for
                    any loss, damage, or inconvenience caused by your inability
                    to access or use the Site during any downtime or
                    discontinuance of the Site. Nothing in these Terms of Use
                    will be construed to obligate us to maintain and support the
                    Site or to supply any corrections, updates, or releases in
                    connection therewith.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">GOVERNING LAW</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    These Terms shall be governed by and defined following the
                    laws of India. DARUL IFTA KAUZARIYYA and yourself
                    irrevocably consent that the courts of India shall have
                    exclusive jurisdiction to resolve any dispute which may
                    arise in connection with these terms.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">DISPUTE RESOLUTION</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    You agree to irrevocably submit all disputes related to
                    Terms or the relationship established by this Agreement to
                    the jurisdiction of the India courts. DARUL IFTA KAUZARIYYA
                    shall also maintain the right to bring proceedings as to the
                    substance of the matter in the courts of the country where
                    you reside or, if these Terms are entered into in the course
                    of your trade or profession, the state of your principal
                    place of business.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">DISCLAIMER</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
                    AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT
                    YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
                    DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION
                    WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT
                    LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE
                    MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                    COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY
                    WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY
                    OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
                    INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY
                    OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM
                    YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED
                    ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL
                    PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED
                    THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION
                    TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES,
                    OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE
                    BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN
                    ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY
                    KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
                    TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO
                    NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
                    FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD
                    PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY
                    WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR
                    OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY
                    WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN
                    YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
                    AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
                    MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
                    JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">LIMITATIONS OF LIABILITY</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
                    BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS
                    OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE,
                    EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                    DAMAGES.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">LIMITATIONS OF LIABILITY</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
                    BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS
                    OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE,
                    EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                    DAMAGES.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">INDEMNIFICATION</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    You agree to defend, indemnify, and hold us harmless,
                    including our subsidiaries, affiliates, and all of our
                    respective officers, agents, partners, and employees, from
                    and against any loss, damage, liability, claim, or demand,
                    including reasonable attorneys’ fees and expenses, made by
                    any third party due to or arising out of: (1) your
                    Contributions; (2) use of the Site; (3) breach of these
                    Terms of Use; (4) any breach of your representations and
                    warranties set forth in these Terms of Use; (5) your
                    violation of the rights of a third party, including but not
                    limited to intellectual property rights; or (6) any overt
                    harmful act toward any other user of the Site with whom you
                    connected via the Site. Notwithstanding the foregoing, we
                    reserve the right, at your expense, to assume the exclusive
                    defense and control of any matter for which you are required
                    to indemnify us, and you agree to cooperate, at your
                    expense, with our defense of such claims. We will use
                    reasonable efforts to notify you of any such claim, action,
                    or proceeding which is subject to this indemnification upon
                    becoming aware of it.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">USER DATA</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    We will maintain certain data that you transmit to the Site
                    for the purpose of managing the performance of the Site, as
                    well as data relating to your use of the Site. Although we
                    perform regular routine backups of data, you are solely
                    responsible for all data that you transmit or that relates
                    to any activity you have undertaken using the Site. You
                    agree that we shall have no liability to you for any loss or
                    corruption of any such data, and you hereby waive any right
                    of action against us arising from any such loss or
                    corruption of such data.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">
                    ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    Visiting the Site, sending us emails, and completing online
                    forms constitute electronic communications. You consent to
                    receive electronic communications, and you agree that all
                    agreements, notices, disclosures, and other communications
                    we provide to you electronically, via email and on the Site,
                    satisfy any legal requirement that such communication be in
                    writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC
                    SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO
                    ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF
                    TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE.
                    You hereby waive any rights or requirements under any
                    statutes, regulations, rules, ordinances, or other laws in
                    any jurisdiction which require an original signature or
                    delivery or retention of non-electronic records, or to
                    payments or the granting of credits by any means other than
                    electronic means.
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} marginTop={4}>
              <Paper elevation={2} className="p-4">
                <Grid item md={12} marginTop={3}>
                  <Typography variant="h5">CONTACT US</Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    In order to resolve a complaint regarding the Site or to
                    receive further information regarding use of the Site,
                    please contact us at:
                  </Typography>
                </Grid>
                <Grid item md={12} marginTop={1} marginBottom={4}>
                  <Typography
                    variant="paragraph"
                    sx={{ lineHeight: 1.8, textAlign: "justify" }}
                  >
                    DARUL IFTA KAUZARIYYA
                    <br />
                    Kauzariyya Arabic college
                    <br />
                    Edathala North PO
                    <br />
                    Ernakulam, Kerala 683561
                    <br />
                    India
                    <br />
                    Phone: +919744662299
                    <br />
                    darulifta@kauzariyya.com
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <FooterComponent />
    </div>
  );
}
