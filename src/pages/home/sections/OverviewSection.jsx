import MetricCard from "./MetricCard";
import styles from "../Home.module.css";
import CancelIcon from "../../../assets/icons/CancelIcon.svg";
import CostDashboardIcon from "../../../assets/icons/CostDashboardIcon.svg";
import CostIcon from "../../../assets/icons/CostIcon.svg";
import ProfitIcon from "../../../assets/icons/ProfitIcon.svg";
import PurchaseIcon from "../../../assets/icons/PurchaseIcon.svg";
import ReturnIcon from "../../../assets/icons/ReturnIcon.svg";
import RevenueIcon from "../../../assets/icons/RevenueIcon.svg";
import SalesIcon from "../../../assets/icons/SalesIcon.svg";
import { useSelector } from "react-redux";

const OverviewSection = () => {
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  //sale
  const salesCost = 17432;

  // purchase
  const purchase = 82;
  const purchaseCost = 13573;
  const cancel = 5;
  const returnCost = 17432;

  const invoicesList = Array.isArray(allInvoices) ? allInvoices : [];

  const revenue = invoicesList.filter((inv) => inv?.status === "Paid");
  const totalRevenue = revenue?.reduce(
    (sum, inv) => sum + Number(inv?.amount || 0),
    0
  );

  const profit = totalRevenue - purchaseCost;

  return (
    <div className={styles.overview}>
      <div className={`${styles.bigCard} ${styles.salesOverview}`}>
        <h3 className={styles.cardTitle}>Sales Overview</h3>
        <div className={styles.metrics}>
          <MetricCard
            icon={SalesIcon}
            value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
            label="Sales"
          />
          <MetricCard
            icon={RevenueIcon}
            value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
            label="Revenue"
          />
          <MetricCard
            icon={ProfitIcon}
            value={`₹ ${profit.toLocaleString("en-IN")}`}
            label="Profit"
          />
          <MetricCard
            icon={CostIcon}
            value={`₹ ${salesCost.toLocaleString("en-IN")}`}
            label="Cost"
          />
        </div>
      </div>

      <div className={`${styles.bigCard} ${styles.purchaseOverview}`}>
        <h3 className={styles.cardTitle}>Purchase Overview</h3>
        <div className={styles.metrics}>
          <MetricCard icon={PurchaseIcon} value={purchase} label="Purchase" />
          <MetricCard
            icon={CostDashboardIcon}
            value={`₹ ${purchaseCost.toLocaleString("en-IN")}`}
            label="Cost"
          />
          <MetricCard icon={CancelIcon} value={cancel} label="Cancel" />
          <MetricCard
            icon={ReturnIcon}
            value={`₹ ${returnCost.toLocaleString("en-IN")}`}
            label="Return"
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
