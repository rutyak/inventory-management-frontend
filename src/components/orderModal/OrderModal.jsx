import { useState } from "react";
import styles from "./OrderModal.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { addInvoiceData } from "../../utils/allInvoiceSlice";
import { useDispatch } from "react-redux";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const OrderModal = ({ isOpen, onClose, productId }) => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  const resetAndClose = () => {
    setQuantity("");
    setLoading(false);
    if (onClose) onClose();
  };

  const generateInvoiceId = () =>
    "INV-" + Math.floor(1000 + Math.random() * 9000);

  const handleOrder = async () => {
    if (!quantity) {
      toast.error("Please enter quantity");
      return;
    }

    setLoading(true);
    try {
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 15);

      const invoicePayload = {
        invoiceId: generateInvoiceId(),
        invoiceDate: today.getDate(),
        dueDate,
        productId,
        quantity,
      };

      const res = await axios.post(`${base_url}/invoice`, invoicePayload);

      dispatch(addInvoiceData(res.data?.invoice));
      toast.success("Order placed successfully!");
      resetAndClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleOrder();
  };

  return (
    <div className={styles.modalOverlay} onClick={resetAndClose}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <input
          type="number"
          className={styles.inputBox}
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.orderButton}
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
