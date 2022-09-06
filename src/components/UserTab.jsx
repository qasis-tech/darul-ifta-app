import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountHomeComponent from './AccountHomeComponent';
import AskFatwasComponent from '../pages/user/Accounts/askFatwas';
import Profile from '../pages/user/Accounts/profile';
import "../pages/user/Accounts/home/account.home.styles.scss";
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function UserTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div className="user-tab-section">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            className="main-tab"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab className="tab-name" label="Home" {...a11yProps(0)} />
            <Tab label="Ask Fatwas" {...a11yProps(1)} />
            <Tab label="Profile" {...a11yProps(2)} />
            <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AccountHomeComponent/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <AskFatwasComponent/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Profile/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </div>
  );
}
