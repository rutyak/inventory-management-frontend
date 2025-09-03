import { useSelector } from "react-redux";
import styles from "../Home.module.css";
import CatagoriesIcon from "../../../assets/icons/CatagoriesIcon.svg";
import QuantityInHand from "../../../assets/icons/QuantityInHand.svg";
import SupplierIcon from "../../../assets/icons/SupplierIcon.svg";
import TobeReceived from "../../../assets/icons/TobeReceived.svg";
import MetricCard from "./MetricCard";

const SummarySection = () => {
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  //inventorty summery
  const totalCategories = 20;
  const totalSuppier = 15;

  //product summery
  const invoicesList = Array.isArray(allInvoices) ? allInvoices : [];
  const productsList = Array.isArray(allProducts) ? allProducts : [];

  const productsArr = invoicesList.filter((inv) => inv?.status === "Paid");
  const productsSold = productsArr?.reduce(
    (sum, inv) => sum + Number(inv?.quantity || 0),
    0
  );

  const quantityInHand = productsList?.reduce(
    (total, product) => total + Number(product?.quantity || 0),
    0
  );

  return (
    <div className={styles.summery}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Inventory Summary</h3>
        <div className={styles.metrics}>
          <MetricCard
            icon={QuantityInHand}
            value={quantityInHand}
            label="Quantity in Hand"
            variant="summary"
          />
          <MetricCard
            icon={TobeReceived}
            value={productsSold}
            label="To be received"
            variant="summary"
          />
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Product Summary</h3>
        <div className={styles.metrics}>
          <MetricCard
            icon={SupplierIcon}
            value={totalSuppier}
            label="Number of Suppliers"
            variant="summary"
          />
          <MetricCard
            icon={CatagoriesIcon}
            value={totalCategories}
            label="Number of Categories"
            variant="summary"
          />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
