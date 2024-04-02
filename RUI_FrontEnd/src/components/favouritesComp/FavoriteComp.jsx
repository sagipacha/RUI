import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/User.jsx";
import { APIBaseUrl } from "../../config/API.js";
import ProductCard from "../productCard/ProductCard.jsx";
import styles from "./FavoriteComp.module.css"; 

export default function FavouritesComp() {
  const { user } = useContext(UserContext);
  const [favorite, setFavorite] = useState([]);

  const getFavoriteProducts = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}/favorites/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("RUI_user_token")}`,
        },
      });
      setFavorite(res.data[0].productId);
      console.log(favorite);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(favorite);
  useEffect(() => {
    getFavoriteProducts();
  }, []);
  return (
    <div className={styles.productsContainer}> {/* Apply styles to container */}
      {favorite.length > 0 ? (
        favorite.map((item, i) => {
          return (
            <ProductCard
              isFavComp={true}
              i={i}
              key={i}
              product={item}
            />
          );
        })
      ) : (
        <p>No favorite products found.</p>
      )}
    </div>
  );
}
