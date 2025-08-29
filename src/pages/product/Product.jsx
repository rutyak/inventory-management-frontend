import { useEffect, useState } from "react";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import styles from "./Product.module.css";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProducts } from "../../utils/productSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

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

const Product = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const { setIsAddProductOpen, setIsViewModalOpen } = useOutletContext();

  const columns = [
    { header: "Products", key: "productName" },
    { header: "Price", key: "price", hiddenBelow: 1280 },
    { header: "Quantity", key: "quantity", hiddenBelow: 1280 },
    { header: "Threshold Value", key: "thresholdValue", hiddenBelow: 1280 },
    { header: "Expiry Date", key: "expiryDate", hiddenBelow: 1280 },
    { header: "Availability", key: "availability", Iicon: true },
  ];

  function handleAddProducts() {
    setIsAddProductOpen(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${base_url}/products?page=${pagination.page}&limit=${pagination.limit}`
        );

        setProducts(res.data.products);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.pagination.totalPages,
        }));

        dispatch(addProducts(res.data.products)); 
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProducts();
  }, [dispatch, pagination.page, pagination.limit]);

  return (
    <div className={styles.container}>
      <OverallPage title="Overall Inventory" metrics={metricsData} />
      <CustomeTable
        products={products}
        rowsPerPage={pagination.limit}
        title="Products"
        addBtnLabel="Add Product"
        onAdd={handleAddProducts}
        columns={columns}
        setIsViewModalOpen={setIsViewModalOpen}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(newPage) =>
          setPagination((prev) => ({ ...prev, page: newPage }))
        }
      />
    </div>
  );
};

export default Product;
