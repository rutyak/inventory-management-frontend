import styles from "./Sidebar.module.css";
import AppIcon from "../../assets/images/AppIcon.svg";
import HomeIcon from "../../assets/icons/HomeIcon.svg";
import InvoiceIcon from "../../assets/icons/InvoiceIcon.svg";
import ProductIcon from "../../assets/icons/ProductIcon.svg";
import SatisticsIcon from "../../assets/icons/SatisticsIcon.svg";
import SettingIcon from "../../assets/icons/SettingIcon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ setPageName }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={AppIcon} alt="appIcon" className={styles.appIconSize} />
      </div>

      <hr style={{ border: "1px solid #424457" }} />

      <nav className={styles.navMenu}>
        <Link to="/dashboard" className={styles.navItem} onClick={() => setPageName("Home")}>
          <img src={HomeIcon} alt="homeIcon" className={styles.iconSize} />
          <span>Home</span>
        </Link>

        <Link to="/dashboard/product" className={styles.navItem} onClick={() => setPageName("Product")}>
          <img
            src={ProductIcon}
            alt="productionIcon"
            className={styles.iconSize}
          />
          <span>Product</span>
        </Link>

        <Link to="/dashboard/invoice" className={styles.navItem} onClick={() => setPageName("Invoice")}>
          <img
            src={InvoiceIcon}
            alt="invoiceIcon"
            className={styles.iconSize}
          />
          <span>Invoice</span>
        </Link>

        <Link to="/dashboard/statistics" className={styles.navItem} onClick={() => setPageName("Statistics")}>
          <img
            src={SatisticsIcon}
            alt="satisticsIcon"
            className={styles.iconSize}
          />
          <span>Statistics</span>
        </Link>

        <Link to="/dashboard/settings" className={styles.navItem} onClick={() => setPageName("Settings")}>
          <img
            src={SettingIcon}
            alt="settingIcon"
            className={styles.iconSize}
          />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Profile Section */}
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <span className={styles.username}>{user.name?.split(" ")[0]}</span>
      </div>
    </div>
  );
};

export default Sidebar;
