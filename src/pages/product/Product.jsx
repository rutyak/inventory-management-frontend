import { useState } from "react";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import styles from "./Product.module.css";
import { useOutletContext } from "react-router-dom";

const Product = () => {
  const metricsData = [
    { value: "14", label: "Categories", subLabel: "Last 7 days" },
    {
      value: "868",
      label: "Total Products",
      subValue: "₹25000",
      subLabel: "Last 7 days",
      subLabel1: "Revenue",
    },
    {
      value: "5",
      label: "Top Selling",
      subValue: "₹2500",
      subLabel: "Last 7 days",
      subLabel1: "Cost",
    },
    {
      value: "12",
      label: "Low Stocks",
      subValue: "2",
      subLabel: "Last 7 days",
      subLabel1: "Not in stock",
    },
  ];

  const productsData = [
    {
      name: "Maggi",
      price: "₹430",
      quantity: "43 Packets",
      threshold: "12 Packets",
      expiry: "11/12/25",
      availability: "In-stock",
    },
    {
      name: "Bru",
      price: "₹257",
      quantity: "22 Packets",
      threshold: "12 Packets",
      expiry: "21/12/25",
      availability: "Out of stock",
    },
    {
      name: "Red Bull",
      price: "₹405",
      quantity: "36 Packets",
      threshold: "9 Packets",
      expiry: "5/12/25",
      availability: "In-stock",
    },
    {
      name: "Bourn Vita",
      price: "₹502",
      quantity: "14 Packets",
      threshold: "6 Packets",
      expiry: "8/12/25",
      availability: "Out of stock",
    },
    {
      name: "Horlicks",
      price: "₹530",
      quantity: "5 Packets",
      threshold: "5 Packets",
      expiry: "9/1/25",
      availability: "In-stock",
    },
    {
      name: "Harpic",
      price: "₹605",
      quantity: "10 Packets",
      threshold: "5 Packets",
      expiry: "9/1/25",
      availability: "In-stock",
    },
    {
      name: "Ariel",
      price: "₹408",
      quantity: "23 Packets",
      threshold: "7 Packets",
      expiry: "15/12/25",
      availability: "Out of stock",
    },
    {
      name: "Scotch Brite",
      price: "₹359",
      quantity: "43 Packets",
      threshold: "8 Packets",
      expiry: "6/6/25",
      availability: "In-stock",
    },
    {
      name: "Coca cola",
      price: "₹205",
      quantity: "41 Packets",
      threshold: "10 Packets",
      expiry: "11/11/25",
      availability: "Low stock",
    },
  ];

  const columns = [
    { header: "Products", key: "name" },
    { header: "Price", key: "price", hiddenBelow: 1280 },
    { header: "Quantity", key: "quantity", hiddenBelow: 1280 },
    { header: "Threshold Value", key: "threshold", hiddenBelow: 1280 },
    { header: "Expiry Date", key: "expiry", hiddenBelow: 1280 },
    { header: "Availability", key: "availability", Iicon: true },
  ];

  const { setIsOpen } = useOutletContext();
  
  function handleAddProducts() {
    setIsOpen(true);
  }

  return (
    <div className={styles.container}>
      <OverallPage title="Overall Inventory" metrics={metricsData} />
      <CustomeTable
        products={productsData}
        rowsPerPage={10}
        title="Products"
        addBtnLabel="Add Product"
        onAdd={handleAddProducts}
        columns={columns}
      />
    </div>
  );
};

export default Product;
