import React from "react";
import styles from "./CustomeTable.module.css";
import ThreeDots from "../../assets/icons/ThreeDots.svg";
import EyeIcon from "../../assets/icons/EyeIcon.svg";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";
import Iicon from "../../assets/icons/Iicon.svg";
import DeleteModal from "../deleteModal/DeleteModal";

const CustomeTable = ({
  products,
  rowsPerPage,
  title = "Products",
  addBtnLabel = "Add Product",
  onAdd = () => {},
  onRowClick = () => {},
  columns = [],
  setIsViewModalOpen = () => {},
  handleInvoiceOpen = () => {},
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  handleDeleteInvoice = () => {},
  handlePaymentStatusChange = () => {},
}) => {
  const [menuRow, setMenuRow] = React.useState(null);
  const [activeRow, setActiveRow] = React.useState(null);
  const [deleteRow, setDeleteRow] = React.useState(false);

  function handleRowClick(rowIndex) {
    onRowClick(rowIndex);
    setActiveRow(rowIndex);
  }

  return (
    <div className={styles.card} onClick={() => setMenuRow(null)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {!(title === "Invoices List") && (
          <button className={styles.addBtn} onClick={onAdd}>
            {addBtnLabel}
          </button>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {(columns ?? [])?.map((col, index) => (
              <th
                key={index}
                className={
                  col.hiddenBelow
                    ? styles.hideOnSmall
                    : col.hiddenAbove
                    ? styles.hideOnLarge
                    : ""
                }
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(products ?? [])?.map((item, rowIndex) => (
            <React.Fragment key={item._id}>
              <tr
                className={activeRow === rowIndex ? "active" : ""}
                style={{ position: "relative" }}
                onClick={() => handleRowClick(item._id)}
              >
                {(columns ?? [])?.map((col, colIndex) => {
                  const cellContent = col.render
                    ? col.render(item)
                    : (() => {
                        if (col.key === "price" || col.key === "amount") {
                          return `₹${Number(item[col.key]).toLocaleString()}`;
                        }
                        if (col.key === "quantity" || col.key === "threshold") {
                          return `${item[col.key]} Packets`;
                        }
                        return item[col.key];
                      })();

                  return (
                    <td
                      key={colIndex}
                      className={
                        `${col.hiddenBelow ? styles.hideOnSmall : ""} ` +
                        `${col.hiddenAbove ? styles.hideOnLarge : ""} ` +
                        (col.key === "availability"
                          ? `${styles.status} ${
                              item[col.key] === "In Stock"
                                ? styles.inStock
                                : item[col.key] === "Out of Stock"
                                ? styles.outOfStock
                                : styles.lowStock
                            }`
                          : "")
                      }
                    >
                      <div className={styles.iIconContainer}>
                        <div>{cellContent}</div>
                        {col.Iicon && (
                          <img
                            src={Iicon}
                            alt="Iicon"
                            className={styles.iIcon}
                            onClick={() => {
                              setMenuRow(null);
                              setIsViewModalOpen(true);
                            }}
                          />
                        )}
                        {col.threeDot && (
                          <div
                            className={styles.threeDot}
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuRow(
                                menuRow === rowIndex ? null : rowIndex
                              );
                            }}
                          >
                            <img src={ThreeDots} alt="threeDot" />
                            {!deleteRow && menuRow === rowIndex && (
                              <div className={styles.contextMenu}>
                                <div
                                  className={styles.menuItem}
                                  onClick={() => handleInvoiceOpen(item._id)}
                                >
                                  <img
                                    src={EyeIcon}
                                    alt="eyeIcon"
                                    className={styles.eyeIcon}
                                  />
                                  View Invoice
                                </div>
                                <div
                                  className={styles.menuItem}
                                  onClick={() => {
                                    setMenuRow(null);
                                    setDeleteRow(rowIndex);
                                  }}
                                >
                                  <img
                                    src={DeleteIcon}
                                    alt="deleteIcon"
                                    className={styles.deleteIcon}
                                  />
                                  Delete
                                </div>
                                {item.status === "Unpaid" && (
                                  <div
                                    className={`${styles.menuItem} ${styles.paid}`}
                                    onClick={() => {
                                      handlePaymentStatusChange(item._id);
                                      setMenuRow(null);
                                    }}
                                  >
                                    <span className={styles.paidLabel}>
                                      Paid
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Delete Modal Row */}
                            {deleteRow === rowIndex && (
                              <DeleteModal
                                invoiceId={item._id}
                                handleDeleteInvoice={handleDeleteInvoice}
                                setDeleteRow={setDeleteRow}
                                setMenuRow={setMenuRow}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className={styles.footer}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationBtn}
        >
          Previous
        </button>
        <span className={styles.pageCoute}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomeTable;
