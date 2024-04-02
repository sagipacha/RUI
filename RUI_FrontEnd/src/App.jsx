import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
// import { UserContext } from './context/UserProvider';

import NavBar from './components/navBar/NavBar';
import Home from './pages/home/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import SingleProduct from './pages/singleProducts/SingleProduct';
import Favorite from './pages/favourites/Favorites.jsx';
import StreetProducts from './pages/streetProducts/StreetProducts';
import SingleStreetProduct from './pages/singleStreetProduct/SingleStreetProduct';
import AddProduct from './pages/addProduct/AddProduct';
import HostagesTimer from "./components/hostagesTimer/HostagesTimer.jsx";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddProductRequest from './pages/addProductRequest/AddProductRequest.jsx';
import Footer from "./components/footer/Footer.jsx";
import MagicLink from "./pages/magicLink/MagicLink.jsx";
import AddStreetProduct from "./pages/addStreetProduct/AddStreetProduct.jsx";




import ProductForm from "./pages/addStreetProduct/AddStreetProduct.jsx";

function App() {
  // const { user, setUser } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/favourites"
            element={
              <Favorite />
            } />
          <Route
            path="/addProduct"
            element={
              <AddProduct />
            } />
            <Route
            path="/addStreetProduct"
            element={
              <AddStreetProduct />
            } />
            <Route
            path="/addProductRequest"
            element={
              <AddProductRequest />
            } />

          <Route path="/:productId" element={<SingleProduct />} />

          <Route
            path="/:singStreetProductId"
            element={<SingleStreetProduct />}
          />

          <Route path="/streetProducts" element={<StreetProducts />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/signIn" element={<SignIn />} />

          <Route path="/addStreetProduct" element={<ProductForm />} />

          <Route
            path="/shareAddLink/:userId/token/:token"
            element={<MagicLink />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div className={`${styles.hostagesContainer} ${styles.hostages}`}>
          <HostagesTimer />
        </div>

        <div
          className={`${styles.whatsAppIconContainer} ${styles.whatsAppIcon}`}
        >
          <a href="https://wa.me/972508264881?text=מוזמנים ליצור קשר" target="blank">
            <WhatsAppIcon />
          </a>
        </div>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
