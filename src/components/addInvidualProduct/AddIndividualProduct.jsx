import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./AddIndividualProduct.module.css";
import { useOutletContext } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const categories = [
  "Beverages",
  "Food",
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
  "Groceries",
  "Pharmacy",
  "Toys & Games",
  "Books",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Automotive",
  "Stationery",
  "Pet Supplies",
  "Jewelry",
  "Baby Products",
  "Health & Wellness",
  "Garden & Tools",
];

const AddIndividualProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    thresholdValue: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setIsAddProductOpen } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare FormData for backend
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productId", formData.productId);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("unit", formData.unit);
      data.append("expiryDate", formData.expiryDate);
      data.append("thresholdValue", formData.thresholdValue);

      if (formData.imageFile) {
        data.append("productImage", formData.imageFile);
      }

      const res = await axios.post(`${base_url}/product`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success("Product added successfully!");
        setFormData({
          productName: "",
          productId: "",
          category: "",
          price: "",
          quantity: "",
          unit: "",
          expiryDate: "",
          thresholdValue: "",
          imageFile: null,
        });
        setPreview(null);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          onClick={() => setIsAddProductOpen(true)}
          style={{ paddingRight: "6px" }}
        >
          Add Product
        </span>{" "}
        &gt; Individual Product
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>New Product</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <div className={styles.imageUpload}>
              <div className={styles.imageBox}>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                )}
              </div>
              <div className={styles.imageText}>
                <p>Drag image here</p>
                <p>or</p>
                <label className={styles.browseBtn}>
                  Browse image
                  <input
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              placeholder="Enter product ID"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select product category</option>
              {(categories ?? [])?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Enter product unit"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Threshold Value</label>
            <input
              type="number"
              name="thresholdValue"
              value={formData.thresholdValue}
              onChange={handleChange}
              placeholder="Enter threshold value"
              required
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.discardBtn}
              onClick={() => {
                setFormData({
                  productName: "",
                  productId: "",
                  category: "",
                  price: "",
                  quantity: "",
                  unit: "",
                  expiryDate: "",
                  thresholdValue: "",
                  imageFile: null,
                });
                setPreview(null);
              }}
            >
              Discard
            </button>
            <button type="submit" className={styles.addBtn} disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndividualProduct;
