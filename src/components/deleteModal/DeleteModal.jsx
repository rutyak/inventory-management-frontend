import styles from "./DeleteModal.module.css";

function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>this invoice will be deleted.</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.confirm} onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
