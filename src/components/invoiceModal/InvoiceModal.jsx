import React from "react";
import styles from "./InvoiceModal.module.css";
import {
  CrossIcon,
  DownloadIcon,
  InvoiceFooterIcon,
  PrinterIcon,
} from "../../assets/Icons";

const InvoiceModal = ({ isOpen, onClose, invoiceData }) => {
  if (!isOpen) return null;

  const { company, business, invoice, products, totals, footer } = invoiceData;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal}>
        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button onClick={onClose} className={styles.close}>
            <CrossIcon />
          </button>
          <button className={styles.download}>
            <DownloadIcon />
          </button>
          <button className={styles.print}>
            <PrinterIcon />
          </button>
        </div>

        {/* Scrollable content wrapper */}
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>INVOICE</h1>

            <div>
              <p className={styles.label}>Billed to</p>

              <div className={styles.infoRow}>
                <div className={styles.leftText}>
                  <p className={styles.companyName}>{company.name}</p>
                  <p>{company.address}</p>
                  <p>{company.city}</p>
                </div>

                {/* Right side - Business */}
                <div className={styles.rightText}>
                  <p>{business.address}</p>
                  <p>{business.city}</p>
                  <p>{business.taxId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice details */}
          <div className={styles.container}>
            <div className={styles.leftInfo}>
              <div>
                <p className={styles.label}>Invoice #</p>
                <p className={styles.invoiceNumber}>{invoice.number}</p>
              </div>
              <div>
                <p className={styles.label}>Invoice date</p>
                <p className={styles.invoiceNumber}>{invoice.date}</p>
              </div>
              <div>
                <p className={styles.label}>Reference</p>
                <p className={styles.invoiceNumber}>{invoice.reference}</p>
              </div>
              <div>
                <p className={styles.label}>Due date</p>
                <p className={styles.invoiceNumber}>{invoice.dueDate}</p>
              </div>
            </div>

            <div className={styles.rightTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Product rows */}
                  {products.map((item, i) => (
                    <tr
                      key={i}
                      style={{
                        marginBottom: item.qty == "1 set" ? "53px" : "0",
                      }}
                    >
                      <td className={styles.productName}>{item.name}</td>
                      <td className={styles.other}>{item.qty}</td>
                      <td className={styles.other}>{item.price}</td>
                    </tr>
                  ))}

                  {/* Totals section */}
                  <tr>
                    <td colSpan={2} className={styles.subtotalLabel}>
                      Subtotal
                    </td>
                    <td className={styles.other}>{totals.subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className={styles.subtotalLabel}>
                      Tax (10%)
                    </td>
                    <td className={styles.other}>{totals.tax}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className={styles.totalDue}>
                      Total due
                    </td>
                    <td className={styles.totalValue}>{totals.total}</td>
                  </tr>
                </tbody>
              </table>

              <p className={styles.note}>
                <InvoiceFooterIcon /> Please pay within 15 days of receiving
                this invoice.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p>{footer.website}</p>
            <p>{footer.phone}</p>
            <p>{footer.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
