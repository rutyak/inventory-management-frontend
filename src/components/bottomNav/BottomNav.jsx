import HomeIcon from "../../assets/icons/HomeIcon.svg";
import InvoiceIcon from "../../assets/icons/InvoiceIcon.svg";
import ProductIcon from "../../assets/icons/ProductIcon.svg";
import SatisticsIcon from "../../assets/icons/SatisticsIcon.svg";

import styles from "./ButtonNav.module.css";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/dashboard">
        <img src={HomeIcon} alt="homeIcon" className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/product">
        <img src={ProductIcon} alt="ProductIcon" className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/invoice">
        <img src={InvoiceIcon} alt="invoiceIcon" className={styles.iconSize} />
      </Link>
      <Link to="/dashboard/statistics">
        <img src={SatisticsIcon} alt="satisticsIcon" className={styles.iconSize} />
      </Link>
    </div>
  );
};

export default BottomNav;
