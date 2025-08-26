import React from "react";
import styles from "./TopProducts.module.css";
import productImage from "../../assets/image.png";

const products = [
  { name: "Redbull", rating: 5 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 2 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 4 },
  { name: "Bru", rating: 1 },
];

const TopProducts = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Products</h3>
      <div className={styles.list}>
        {products.map((item, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.imageContainer}>
              <img
                src={productImage}
                alt="product"
                className={styles.imageStyle}
              />
              <div className={styles.dots}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${
                      i < item.rating ? styles.active : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
