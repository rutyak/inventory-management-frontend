import {
  HomeIcon,
  InvoiceIcon,
  ProductIcon,
  SatisticsIcon,
} from "../../assets/Icons";
import styles from "./ButtonNav.module.css";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/dashboard">
        <HomeIcon className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/product">
        <ProductIcon className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/invoice">
        <InvoiceIcon className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/statistics">
        <SatisticsIcon className={styles.iconSize} />
      </Link>
    </div>
  );
};

export default BottomNav;
