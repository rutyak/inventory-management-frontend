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
        <AppIcon className={styles.appIconSize} />
      </div>

      <hr style={{ border: "1px solid #424457" }} />

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        <a href="#" className={styles.navItem}>
          <HomeIcon className={styles.iconSize} />
          <span>Home</span>
        </a>

        <a href="#" className={styles.navItem}>
          <ProductIcon className={styles.iconSize} />
          <span>Product</span>
        </a>

        <a href="#" className={styles.navItem}>
          <InvoiceIcon className={styles.iconSize} />
          <span>Invoice</span>
        </a>

        <a href="#" className={styles.navItem}>
          <SatisticsIcon className={styles.iconSize} />
          <span>Statistics</span>
        </a>

        <a href="#" className={styles.navItem}>
          <SettingIcon className={styles.iconSize} />
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
