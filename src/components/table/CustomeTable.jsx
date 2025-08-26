import React, { useState } from "react";
import styles from "./CustomeTable.module.css";

const CustomeTable = ({ products, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = products.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Products</h3>
        <button className={styles.addBtn}>Add Product</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Threshold Value</th>
            <th>Expiry Date</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.threshold}</td>
              <td>{item.expiry}</td>
              <td
                className={`${styles.status} ${
                  item.availability === "In-stock"
                    ? styles.inStock
                    : item.availability === "Out of stock"
                    ? styles.outOfStock
                    : styles.lowStock
                }`}
              >
                {item.availability}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={styles.paginationBtn}
        >
          Previous
        </button>
        <span className={styles.pageCoute}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.paginationBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomeTable;
