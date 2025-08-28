import styles from "./productViewModal.module.css";

const ProductView = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Products Details</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <p className={styles.productName}>Maggi</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsRow}>
            <span className={styles.label}>Price</span>
            <span className={styles.value}>₹430</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.label}>Quantity</span>
            <span className={styles.value}>43 Packets</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.label}>Threshold Value</span>
            <span className={styles.value}>12 Packets</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.label}>Expiry Date</span>
            <span className={styles.value}>11/12/25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
