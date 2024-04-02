import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import axios from "axios";
import { APIBaseUrl } from "../../config/API";
import SearchBar from "../../components/searchBar/SearchBar";
import styles from './Home.module.css'
import { Link } from "react-router-dom";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [showSearchBar, setShowSearchBar] = useState(false); 
  const [favorite, setFavorite] = useState([]);



const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${APIBaseUrl}/Products`);
    setProducts(res.data);
    console.log(res.data);

  } catch (error) {
    console.log("error fetching Products: ", error);
  }
};

const getFavoriteProducts = async () => {
  try {
    const res = await axios.get(`${APIBaseUrl}/favorites/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("RUI_user_token")}`,
      },
    });
    setFavorite(res.data[0].productId);
  } catch (error) {
    console.log(error);
  }
};

 useEffect(() => {
  getFavoriteProducts();
}, []);

  useEffect(() => {
    fetchAllProducts()
  }, []);
console.log(favorite);
  return (
    <>
      <br />
      <br />
      <div className={styles.banner}>
        <div className={styles.box3}>
          <div className={styles.box} >
           
            <Link to="/addProduct"> מוצר לתרומה</Link>
          </div>
          <div className={styles.box} >
           
            <Link to="/addProductRequest"> בקשת מוצר</Link>

          </div>
          <div className={styles.box} > 
          <Link to="/addStreetProduct">מוצר רחוב</Link>

          </div>
      


        </div>
        <div className={styles.text}>
      {showSearchBar && <SearchBar setProducts={setProducts} />} {/* Render SearchBar only if showSearchBar is true */}
      <div  className={styles.stickyButtonContainer}> {/* Container for sticky button */}
        <button className={styles.stickyButton} onClick={() => setShowSearchBar(!showSearchBar)}>
          {showSearchBar ? "סגור חיפוש" : "פתח חיפוש"} {/* Toggle the visibility of SearchBar */}
        </button>
      </div>
      </div>
        
      </div>
      
   
    <div>
      <div className={styles.productsContainer}>
      {products.map((product) => (
      <ProductCard 
        key={product._id}
        product={product} 
        favorite={favorite}
      />
    ))}
    </div>
    </div>

    </>
  );
}

