import styles from "./Sidebar.module.css";
import { AppIcon } from "../../assets/images";
import {
  HomeIcon,
  InvoiceIcon,
  ProductIcon,
  SatisticsIcon,
  SettingIcon,
} from "../../assets/Icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <AppIcon className={styles.appIconSize} />
      </div>

      <hr style={{ border: "1px solid #424457" }} />

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        <Link to="/dashboard" className={styles.navItem}>
          <HomeIcon className={styles.iconSize} />
          <span>Home</span>
        </Link>

        <Link to="/dashboard/product" className={styles.navItem}>
          <ProductIcon className={styles.iconSize} />
          <span>Product</span>
        </Link>

        <Link to="/dashboard/invoice" className={styles.navItem}>
          <InvoiceIcon className={styles.iconSize} />
          <span>Invoice</span>
        </Link>

        <Link to="/dashboard/statistics" className={styles.navItem}>
          <SatisticsIcon className={styles.iconSize} />
          <span>Statistics</span>
        </Link>

        <Link to="/dashboard/settings" className={styles.navItem}>
          <SettingIcon className={styles.iconSize} />
          <span>Settings</span>
        </Link>
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
