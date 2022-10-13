import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import QuestionContainer from "./QuestionContainer";
import "../pages/user/home/home.styles.scss";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const FatwaSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return (
    <div className="home-page">
      <section className="body-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="col side-accord-container shadow">
                <div className="green">
                  <span className="text-white fs-6">Categories</span>
                </div>
                <div className="l-green"></div>
                <div>
                  <div className="accordian-wrapper">
                    <Accordion className="accordian">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="arrow-color" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Faiths & Beliefs</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul className="accordion-sub">
                          <li>Hanafi Madhab</li>
                          <li>Shafi Madhab</li>
                          <li>Common</li>
                        </ul>
                      </AccordionDetails>
                    </Accordion>

                    {/* <accordion className="accordian">
                      <accordion-group heading="Faiths & Beliefs">
                        <ul>
                          <li>Islamic Beliefs</li>
                        </ul>
                      </accordion-group>
                    </accordion> */}
                  </div>
                </div>
                <div className="madhab-category">
                  <div className="green mt-4">
                    <span className="text-white fs-6">Madhab</span>
                  </div>
                  <div className="l-green"></div>
                  <div>
                    <ul className="mt-2">
                      <li>Hanafi Madhab</li>
                      <li>Shafi Madhab</li>
                      <li>Common</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col custom-details shadow">
                <div className="custom-details-column">
                  <h6>Visitor</h6>
                  <div>100</div>
                </div>

                <div className="custom-details-column">
                  <h6>Total Fatwas</h6>
                  <div>100</div>
                </div>
                <div className="custom-details-column">
                  <h6>Registered Users</h6>
                  <div>100</div>
                </div>
              </div>
            </div>
            <div className="col-md-9 tab-container shadow rounded">
              <div className="row chip-section">
                <div className="">
                  <Chip
                    label="Chip Filled"
                    className="single-chip"
                    onDelete={handleDelete}
                  />
                  <Chip
                    label="Chip Filled"
                    className="single-chip"
                    onDelete={handleDelete}
                  />
                </div>
              </div>
              <TextField
                label="Search"
                fullWidth
                size="small"
                className="search-btn"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    className="main-tab"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab className="tab-name" label="All" {...a11yProps(0)} />
                    <Tab label="മലയാളം" {...a11yProps(1)} />
                    <Tab label="English" {...a11yProps(2)} />
                    <Tab label="اردو" {...a11yProps(3)} />
                    <Tab label="العربيــــــــــــــــــة" {...a11yProps(4)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Item Five
                </TabPanel>
              </Box>
              <QuestionContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FatwaSection;
