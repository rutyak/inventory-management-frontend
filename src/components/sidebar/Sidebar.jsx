import {
  FaHome,
  FaBox,
  FaFileInvoice,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { AppIcon } from "../../assets/images";
import {
  HomeIcon,
  InvoiceIcon,
  ProductIcon,
  SatisticsIcon,
  SettingIcon,
} from "../../assets/Icons";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <AppIcon />
      </div>

      <hr style={{ border: "1px solid #424457" }} />

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        <a href="#" className={styles.navItem}>
          <HomeIcon />
          <span>Home</span>
        </a>

        <a href="#" className={styles.navItem}>
          <ProductIcon />
          <span>Product</span>
        </a>

        <a href="#" className={styles.navItem}>
          <InvoiceIcon />
          <span>Invoice</span>
        </a>

        <a href="#" className={styles.navItem}>
          <SatisticsIcon />
          <span>Statistics</span>
        </a>

        <a href="#" className={styles.navItem}>
          <SettingIcon />
          <span>Setting</span>
        </a>
      </nav>

      {/* Profile Section */}
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <span className={styles.username}>Sarthak</span>
      </div>
    </div>
  );
};

export default Sidebar;
