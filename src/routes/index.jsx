import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// User
import HomePage from "../pages/user/home";
import UserLoginPage from "../pages/user/login";
import AskFatwas from "../pages/user/askFatwas";
import Fatwas from "../pages/user/fatwas";
import FatwasDetailsPage from "../pages/user/FatwasDetailsPage";
import AboutUs from "../pages/user/aboutUs";
import ContactUs from "../pages/user/contactUs";
import RulesandRegulations from "../pages/user/rulesAndRegulations";
import PrivacyandPolicy from "../pages/user/privacyAndPolicy";
import TermsandConditions from "../pages/user/termsAndCondition";
// import ResetPassword from "../pages/user/resetpassword/forgotPasswordPage";
// Admin
// import AdminHome from "../pages/admin/dashboard/index";
// import DashboardPage from "../pages/admin/dashboard/mainContainer";
// import ListCategory from "../pages/admin/dashboard/categoryPages/listCategoryPage";
// import AddCategory from "../pages/admin/dashboard/categoryPages/addCategoryPage";
// import ListProduct from "../pages/admin/dashboard/productsPages/listProductPage";
// import AddProduct from "../pages/admin/dashboard/productsPages/addProductPage";
// import ProductDetails from "../pages/admin/dashboard/productsPages/productDetailsPage";
// import StockList from "../pages/admin/dashboard/stockPages/listStockPage";
// import AddStock from "../pages/admin/dashboard/stockPages/addStockPage";
// import StockDetails from "../pages/admin/dashboard/stockPages/stockDetailsPage";
// import UserList from "../pages/admin/dashboard/userPages/listUserPage";
// import AddUser from "../pages/admin/dashboard/userPages/addUserPage";
// import UserDetails from "../pages/admin/dashboard/userPages/userDetailsPage";
import PublicRouting from "../routes/publicRoutes";
import PrivateRouting from "../routes/privateRoutes";
// import CustomerProductDetails from "../pages/user/productDetails";
// import CartPage from "../pages/user/cart";
// import OrderList from "../pages/user/accounts/order";
// import OrderDetails from "../pages/user/accounts/order/orderDetailsPage";
// import Profile from "../pages/user/accounts/profile";
// import Payment from "../pages/user/accounts/payment";
// import RegisterPage from "../pages/user/register/registerPage";
import PageNotFound from "../pages/user/pageNotFound";
// import OrderDetails from "../pages/admin/dashboard/orderPages/orderDetailsPage";
// import OrderList from "../pages/admin/dashboard/orderPages/orderPage";
// import Categorydetails from "../pages/admin/dashboard/categoryPages/categorydetailspage";
// import HeaderNav from "../components/TopNavbar";

import RouterList from "./routerList";
// import AboutUs from "../pages/user/about";
// import ContactUs from "../pages/user/contact";
// import WhishList from "../pages/user/accounts/whishlist";
// import Order from "../pages/user/accounts/order";
// import ProductList from "../pages/user/productlist";
import { authCheck } from "./auth";
import AccountHome from "../pages/user/Accounts/home";
import AskFatwasForm from "../pages/user/Accounts/askFatwas";
import Profile from "../pages/user/Accounts/profile";
import AdminHome from "../pages/admin/dashsboard";
import Dashboard from "../pages/admin/dashsboard";
import Categories from "../pages/admin/category";
import AdminFatwas from "../pages/admin/fatwas";
import Musthafthies from "../pages/admin/musthafthies";
import User from "../pages/admin/users";
import Category from "../pages/admin/category";
import CategoryDetails from "../pages/admin/category/categoryDetails";
import Article from "../pages/admin/article";
import AddCategories from "../pages/admin/category/addCategoryPage";
import AddMufthi from "../pages/admin/musthafthies/addMusthafthiesPage";
import MufthiDetails from "../pages/admin/musthafthies/musthafthiesDetailsPage";
import AddUser from "../pages/admin/users/addUserPage";
import FatwasDetails from "../pages/admin/fatwas/detailsFatwa";
import AddArticle from "../pages/admin/article/addArticle";
import ArticleDetails from "../pages/admin/article/articleDetails";
import UserAccountRouting from "./userAccounts";
import { connect } from "react-redux";
import { addHomeFilter } from "../redux/actions";

import AdminLogin from "../pages/admin/login";
import UserDetails from "../pages/admin/users/userDetailsPage";

const CustomRouters = (props) => {
  useEffect(() => {
    const { isUser, isAdmin } = authCheck();
  }, []);

  return (
    <Routes>
      <Route element={<PublicRouting />}>
        <Route path={RouterList.user.home} element={<HomePage />} />
        <Route path={RouterList.user.about} element={<AboutUs />} />
        <Route path={RouterList.user.contact} element={<ContactUs />} />
        <Route
          path={RouterList.user.rulesandregulations}
          element={<RulesandRegulations />}
        />
        <Route
          path={RouterList.user.privacypolicy}
          element={<PrivacyandPolicy />}
        />
        <Route
          path={RouterList.user.termsandconditions}
          element={<TermsandConditions />}
        />

        <Route path={RouterList.user.login} element={<UserLoginPage />} />
        <Route path={RouterList.user.askFatwas} element={<AskFatwas />} />
        <Route path={RouterList.user.fatwas} element={<Fatwas />} />
        <Route
          path={`${RouterList.user.fatwasDetailsPage}/:id`}
          element={<FatwasDetailsPage />}
        />

        <Route
          path={RouterList.user.accountUser}
          element={<UserAccountRouting />}
        >
          <Route
            index
            path={RouterList.user.accountUser}
            element={<AccountHome />}
          />
          <Route
            path={RouterList.user.accountUserAsk}
            element={<AskFatwasForm />}
          />
          <Route
            path={RouterList.user.accountUserProfile}
            element={<Profile />}
          />
        </Route>
      </Route>
      <Route path="/admin" element={<PrivateRouting />} isAdmin={true}>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path={RouterList.admin.adminfatwas} element={<AdminFatwas />} />
        <Route path="musthafthies" element={<Musthafthies />} />
        <Route path={RouterList.admin.user} element={<User />} />
        <Route path={"user/:id"} element={<UserDetails />} />

        <Route path="category" element={<Category />} />
        <Route path={"category/:id"} element={<CategoryDetails />} />
        <Route path="article" element={<Article />} />
        <Route path={"article/:id"} element={<ArticleDetails />} />
        <Route path="addCategories" element={<AddCategories />} />
        <Route path="addMufthi" element={<AddMufthi />} />
        <Route path="addUser" element={<AddUser />} />
        <Route
          path={`${RouterList.admin.adminfatwas}/${RouterList.admin.fatwasDetails}/:id`}
          element={<FatwasDetails />}
        />
        <Route
          path={`${RouterList.admin.mufthiDetails}/:id`}
          element={<MufthiDetails />}
        />
        <Route
          path={`${RouterList.admin.fatwasDetails}/:id`}
          element={<FatwasDetails />}
        />

        <Route path="addArticle" element={<AddArticle />} />

        <Route path={RouterList.admin.categoryList} element={<Categories />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addHomeFilter: (payload) => dispatch(addHomeFilter(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomRouters);
