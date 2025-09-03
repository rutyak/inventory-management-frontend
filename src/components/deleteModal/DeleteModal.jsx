import styles from "./DeleteModal.module.css";

function DeleteModal({
  invoiceId,
  handleDeleteInvoice,
  setDeleteRow,
  setMenuRow,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.text}>This invoice will be deleted.</p>
        <div className={styles.actions}>
          <button
            className={styles.cancel}
            onClick={() => setDeleteRow(null)}
          >
            Cancel
          </button>
          <button
            className={styles.confirm}
            onClick={() => {
              handleDeleteInvoice(invoiceId);
              setDeleteRow(null);
              setMenuRow(null);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
