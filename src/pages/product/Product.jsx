import { useEffect, useState } from "react";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import styles from "./Product.module.css";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProducts } from "../../utils/productSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Product = () => {
  const productsData = useSelector((state) => state.products);

  const dispatch = useDispatch();

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

  const columns = [
    { header: "Products", key: "productName" },
    { header: "Price", key: "price", hiddenBelow: 1280 },
    { header: "Quantity", key: "quantity", hiddenBelow: 1280 },
    { header: "Threshold Value", key: "thresholdValue", hiddenBelow: 1280 },
    { header: "Expiry Date", key: "expiryDate", hiddenBelow: 1280 },
    { header: "Availability", key: "availability", Iicon: true },
  ];

  const { setIsOpen, setIsViewModalOpen } = useOutletContext();

  function handleAddProducts() {
    setIsOpen(true);
  }

  useEffect(() => {
    console.log("No dispatch is happening");

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${base_url}/products`);
        console.log("data from api: ", res.data?.products);
        dispatch(addProducts(res.data?.products));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

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
        setIsViewModalOpen={setIsViewModalOpen}
      />
    </div>
  );
};

export default Product;
