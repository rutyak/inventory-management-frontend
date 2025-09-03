import { useEffect, useState, useMemo } from "react";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import styles from "./Product.module.css";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProducts } from "../../utils/productSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Product = () => {
  const products = useSelector((state) => state.products);
  const invoices = useSelector((state) => state.invoices);

  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  const {
    setIsAddProductOpen,
    setIsViewModalOpen,
    setIsOrderModalOpen,
    setOrderedProductId,
    search,
  } = useOutletContext();

  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const columns = [
    { header: "Products", key: "productName" },
    { header: "Price", key: "price", hiddenBelow: 1280 },
    { header: "Quantity", key: "quantity", hiddenBelow: 1280 },
    { header: "Threshold Value", key: "thresholdValue", hiddenBelow: 1280 },
    { header: "Expiry Date", key: "expiryDate", hiddenBelow: 1280 },
    { header: "Availability", key: "availability", Iicon: true },
  ];

  const filteredProducts = useMemo(() => {
    if (!search?.trim()) return Array.isArray(products) ? products : [];

    const query = search.toLowerCase();

    return Array.isArray(products)
      ? products.filter((prod) => {
          const formattedExpiry = prod?.expiryDate
            ? new Date(prod.expiryDate).toLocaleDateString("en-CA")
            : "";

          return [
            prod?.productName,
            prod?.productId,
            prod?.category,
            prod?.price?.toString(),
            prod?.quantity?.toString(),
            prod?.unit,
            prod?.thresholdValue?.toString(),
            formattedExpiry,
            prod?.availability,
            prod?.createdAt,
            prod?.updatedAt,
          ]
            .filter(Boolean) 
            .some((field) => field.toString().toLowerCase().includes(query));
        })
      : [];
  }, [search, products]);

  function handleAddProducts() {
    setIsAddProductOpen(true);
  }

  function handleOrder(rowIndex) {
    setOrderedProductId(rowIndex);
    setIsOrderModalOpen(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${base_url}/products?page=${pagination.page}&limit=${pagination.limit}`
        );

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

  const metricsData = useMemo(() => {
    const topFiveSelling = Array.isArray(allInvoices)
      ? allInvoices
          .filter((invoice) => Number(invoice?.amount) > 0)
          .sort((a, b) => Number(b.amount) - Number(a.amount))
          .slice(0, 5)
      : [];

    const topFiveSell = topFiveSelling?.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    const totalCategories = Array.isArray(allProducts)
      ? new Set(allProducts?.map((p) => p.category)).size
      : 0;

    const totalProducts = Array.isArray(allProducts) ? allProducts?.length : 0;

    const ordered = Array.isArray(allInvoices) ? allInvoices?.length : 0;

    const lowStocks = Array.isArray(allProducts)
      ? allProducts.filter((p) => p.availability === "Low Stock").length
      : 0;
    // const outOfStock = allProducts?.filter(
    //   (p) => p.availability === "Out of Stock"
    // ).length;
    const revenue = Array.isArray(allProducts)
      ? allProducts.reduce(
          (sum, p) =>
            sum + (Number(p?.price) || 0) * (Number(p?.quantity) || 0),
          0
        )
      : 0;

    return [
      { value: totalCategories, label: "Categories", subLabel: "Last 7 days" },
      {
        value: totalProducts,
        label: "Total Products",
        subValue: `₹${revenue.toLocaleString("en-IN")}`,
        subLabel: "Last 7 days",
        subLabel1: "Revenue",
      },
      {
        value: 5,
        label: "Top Selling",
        subValue: `₹${topFiveSell.toLocaleString("en-IN")}`,
        subLabel: "Last 7 days",
        subLabel1: "Cost",
      },
      {
        value: ordered,
        label: "Low Stocks",
        subValue: lowStocks,
        subLabel: "Ordered",
        subLabel1: "Not in stock",
      },
    ];
  }, [allInvoices, allInvoices]);

  return (
    <div className={styles.container}>
      <OverallPage title="Overall Inventory" metrics={metricsData} />
      <CustomeTable
        products={filteredProducts}
        rowsPerPage={pagination.limit}
        title="Products"
        addBtnLabel="Add Product"
        onAdd={handleAddProducts}
        onRowClick={handleOrder}
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
