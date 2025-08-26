import {
  HomeIcon,
  InvoiceIcon,
  ProductIcon,
  SatisticsIcon,
} from "../../assets/Icons";
import styles from "./ButtonNav.module.css";

const BottomNav = () => {
  return (
    <div className={styles.navbar}>
      <HomeIcon className={styles.iconSize} />
      <ProductIcon className={styles.iconSize} />
      <InvoiceIcon className={styles.iconSize} />
      <SatisticsIcon className={styles.iconSize} />
    </div>
  );
};

export default BottomNav;
