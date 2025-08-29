import React, { useState } from "react";
import styles from "./CustomeTable.module.css";
import { Iicon, ThreeDots, EyeIcon, DeleteIcon } from "../../assets/Icons";

const CustomeTable = ({
  products,
  rowsPerPage = 10,
  title = "Products",
  addBtnLabel = "Add Product",
  onAdd = () => {},
  columns = [],
  setIsViewModalOpen = () => {},
  setInvoiceOpen = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuRow, setMenuRow] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(false);

  const totalPages = Math.ceil(products?.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = products?.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={styles.card}>
      {/* ✅ Dynamic Header */}
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
            {columns?.map((col, index) => (
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
          {currentData?.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={activeRow === rowIndex ? "active" : ""}
              onClick={() => setActiveRow(rowIndex)}
            >
              {columns.map((col, colIndex) => {
                const cellContent = col.render
                  ? col.render(item)
                  : item[col.key];

                return (
                  <td
                    key={colIndex}
                    className={
                      `${col.hiddenBelow ? styles.hideOnSmall : ""} ` +
                      `${col.hiddenAbove ? styles.hideOnLarge : ""} ` +
                      (col.key === "availability"
                        ? `${styles.status} ${
                            item[col.key] === "In-stock"
                              ? styles.inStock
                              : item[col.key] === "Out of stock"
                              ? styles.outOfStock
                              : styles.lowStock
                          }`
                        : "")
                    }
                  >
                    <div className={styles.iIconContainer}>
                      <div>{cellContent}</div>
                      {col.Iicon && (
                        <div
                          className={styles.iIcon}
                          onClick={() => setIsViewModalOpen(true)}
                        >
                          <Iicon />
                        </div>
                      )}
                      {col.threeDot && (
                        <div
                          className={styles.threeDot}
                          onClick={() =>
                            setMenuRow(menuRow === rowIndex ? null : rowIndex)
                          }
                        >
                          <ThreeDots />
                          {menuRow === rowIndex && (
                            <div className={styles.contextMenu}>
                              <div
                                className={styles.menuItem}
                                onClick={() => setInvoiceOpen(true)}
                              >
                                <EyeIcon className={styles.eyeIcon} />
                                View Invoice
                              </div>
                              <div
                                className={styles.menuItem}
                                onClick={() => {
                                  setMenuRow(null);
                                  setDeleteRow(rowIndex);
                                }}
                              >
                                <DeleteIcon className={styles.deleteIcon} />
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {deleteRow === rowIndex && (
                        <div className={styles.contextMenu}>
                          <div className={styles.modal}>
                            <p className={styles.text}>
                              this invoice will be deleted.
                            </p>
                            <div className={styles.actions}>
                              <button
                                className={styles.cancel}
                                onClick={() => setDeleteRow(null)}
                              >
                                Cancel
                              </button>
                              <button
                                className={styles.confirm}
                                onClick={() => setDeleteRow(null)}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className={styles.footer}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={styles.paginationBtn}
        >
          Previous
        </button>
        <span className={styles.pageCoute}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
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
