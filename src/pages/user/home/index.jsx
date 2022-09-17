import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


// import { URLS } from "../../../config/urls.config";
import{ formatDate} from "../../utils/dateformat";
import Carousel from "react-bootstrap/Carousel";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image1 from "../../../assets/Ifta_ayah.svg";
import LogoImage from "../../../assets/ifta-logo.svg";
import Image2 from "../../../assets/Minaret.svg";
import HeaderComponent from "../../../components/Header";
import FooterComponent from "../../../components/Footer";
import QuestionComponent from "../../../components/QuestionContainer";
import BackgroundImage from "../../../assets/webback.png";

import "./home.styles.scss";
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

const HomePage = (props) => {
  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [categoryData,setCategoryData]=useState([]);
  const [madhabData,setMadhabData]=useState([]);
  const[subCategoryData,setSubCategoryData]=useState([])
  const [questionsData,setQuestionsData]=useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChange = (event, newValue) => {
    console.log("newvalue",newValue)
    setValue(newValue);
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  
  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (searchInput === "") {
      getQuestionsApi()
    }
  }, [searchInput]);

  useEffect(() => {
    getQuestionsApi()
  }, [page, rowsPerPage]);

  useEffect(() => {
    getCatgoryListApi();
    getmadhabListApi();
    getQuestionsApi()
   }, []);

  // useEffect(() => {
  // if(value>=1){
  //   getQuestionsApi() 
  // }
  // }, [value]);


 const getCatgoryListApi = () => {
  
    axios
      .get("http://localhost:1337/category", {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res category",res.data)
       setCategoryData(res.data)
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  const getmadhabListApi=()=>{
    axios
    .get("http://localhost:1337/madhab", {
      headers: {
        // Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("res mathab",res.data)
      setMadhabData(res.data)
    })
    .catch((err) => {
      console.log("error madhab", err);
    });

  }
  const getSubcategoryListApi=(id)=>{
    axios
    .get("http://localhost:1337/subcategories?category_id="+id, {
      headers: {
         "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("res subcategories",res.data)
      setSubCategoryData(res.data)
     
    })
    .catch((err) => {
      console.log("error subcategories", err);
    });

  }

  const getQuestionsApi=()=>{
   let url= 
   (value>=1)?
   `http://localhost:1337/questions?language=${value}`:
   (searchInput!=="")?`http://localhost:1337/questions/searchquestions?key=${searchInput}&limit=${rowsPerPage}&skip=${
    page * rowsPerPage
  }`:`http://localhost:1337/questions?limit=${rowsPerPage}&skip=${page * rowsPerPage}`
    axios
    .get(url, {
      headers: {
         "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("res questions",res.data)
      setQuestionsData(res.data)
     
    })
    .catch((err) => {
      console.log("error questions", err);
    });

  }
  

  return (
    <div className="home-page">
      {/* <HeaderComponent /> */}
      <div
        class="bg-custom slider-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div class="d-flex justify-content-center container">
          <Carousel className="carousel-hero">
            <Carousel.Item>
              <div class="row col-md-12">
                <div class="col-md-9 d-flex flex-column justify-content-center">
                  <div class="max-width">
                    <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                    <h6 class="my-4 desc">
                      A site for online fatwas (Islamic queries) running under
                      the supervision of Al Jamiathul Kauzariyya Fatwa board to
                      guide humanity to authentic rulings of Islam.
                    </h6>

                    <div class="d-flex justify-content-end">
                      <img src={Image1} alt="" srcset="" />
                    </div>

                    <div class="btn-wrapper d-flex">
                      <span class="custom-question-icon">
                        <QuestionMarkIcon />
                      </span>
                      <span class="d-flex align-items-center">
                        <span class="custom-btn"> Ask Question </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <img
                    src={LogoImage}
                    class="img-thumbnails"
                    alt=""
                    style={{ height: "400px" }}
                  />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="row col-md-12">
                <div class="col-md-9 d-flex flex-column justify-content-center">
                  <div class="max-width">
                    <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                    <h6 class="my-4 desc">
                      A site for online fatwas (Islamic queries) running under
                      the supervision of Al Jamiathul Kauzariyya Fatwa board to
                      guide humanity to authentic rulings of Islam.
                    </h6>

                    <div class="d-flex justify-content-end">
                      <img src={Image1} alt="" srcset="" />
                    </div>

                    <div class="btn-wrapper d-flex">
                      <span class="custom-question-icon">
                        <QuestionMarkIcon />
                      </span>
                      <span class="d-flex align-items-center">
                        <span class="custom-btn"> Ask Question </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <img
                    src={Image2}
                    class="img-thumbnails"
                    alt=""
                    style={{ height: "400px" }}
                  />
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        <section className="body-section">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="col side-accord-container shadow">
                  <div class="green">
                    <span class="text-white fs-6">Categories</span>
                  </div>
                  <div class="l-green"></div>
                  <div>
                    <div class="accordian-wrapper">
                    {categoryData?.map((category)=>{
                           return(
                      <Accordion class="accordian" onClick={()=> getSubcategoryListApi(category.id)}>
                       
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon className="arrow-color" />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          key={category.id}
                        >
                         <Typography>{category?.title}</Typography>
                        </AccordionSummary>
                         {subCategoryData?.length?subCategoryData?.map((subcategory)=>{
                          return(
                           
                        <AccordionDetails key={subcategory.id} >
                          <ul class="accordion-sub">
                            <li >{subcategory.title}</li>
                          </ul>
                        </AccordionDetails>
                          )
                         }):<div>
                          no data</div>}
                        
                      </Accordion>
                       )
                      })}

                      {/* <accordion class="accordian">
                        <accordion-group heading="Faiths & Beliefs">
                          <ul>
                            <li>Islamic Beliefs</li>
                          </ul>
                        </accordion-group>
                      </accordion> */}
                    </div>
                  </div>
                  <div class="madhab-category">
                    <div class="green mt-4">
                      <span class="text-white fs-6">Madhab</span>
                    </div>
                    <div class="l-green"></div>

                    <div>
                      {madhabData.map((madhab)=>{
                         return( 
                      <ul class="mt-2"
                      key={madhab.id}>
                        <li>{madhab?.title}</li>
                         </ul>
                       )
                      })}
                    </div>
                  </div>
                </div>
                <div class="col custom-details shadow">
                  <div class="custom-details-column">
                    <h6>Visitor</h6>
                    <div>100</div>
                  </div>

                  <div class="custom-details-column">
                    <h6>Total Fatwas</h6>
                    <div>100</div>
                  </div>
                  <div class="custom-details-column">
                    <h6>Registered Users</h6>
                    <div>100</div>
                  </div>
                </div>
              </div>
              <div class="col-md-9 tab-container shadow rounded">
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
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton  sx={{
                      visibility: searchInput !== "" ? "visible" : "hidden",
                    }}
                    onClick={() => setSearchInput("")}>
                          <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => getQuestionsApi()}>
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
                      onClick={getQuestionsApi}
                      aria-label="basic tabs example"
                    >
                      <Tab className="tab-name" label="All"  />
                      <Tab label="English"  />
                      <Tab label="മലയാളം" />
                      <Tab label="اردو"  />
                      <Tab
                        label="العربيــــــــــــــــــة"
                       
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} >
                  {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                  {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                  {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })}
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                  {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })}
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                  {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })}
                  </TabPanel>
                </Box>
               
                {/* {questionsData.map((questions)=>{
                 
                 return (
                    <QuestionComponent key={questions.id}
                    shortquestion={questions.short_question} 
                    question={questions.question}
                    questionCount={questions.id}
                    createdDate={formatDate(questions.createdAt)}
                    views={questions.views}></QuestionComponent>
                 
                  )
                })} */}
               
              </div>
            </div>
          </div>
        </section>
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};
export default HomePage;
