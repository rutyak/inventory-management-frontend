import styles from "./InvoiceModal.module.css";
import { useSelector } from "react-redux";
import CrossIcon from "../../assets/icons/CrossIcon.svg";
import DownloadIcon from "../../assets/icons/DownloadIcon.svg";
import PrinterIcon from "../../assets/icons/PrinterIcon.svg";
import InvoiceFooterIcon from "../../assets/icons/InvoiceFooterIcon.svg";

const InvoiceModal = ({ isOpen, onClose, openedInvoiceId }) => {
  if (!isOpen) return null;

  const invoiceData = useSelector((state) =>
    state.invoices.find((inv) => inv._id === openedInvoiceId)
  );

  if (!invoiceData) return null;

  const company = {
    name: "Shopfinity Pvt. Ltd.",
    address: "Office No. 12, 3rd Floor, MG Road, Shivajinagar",
    city: "Pune, Maharashtra, India - 411005",
  };

  const business = {
    address: "Baner Road, Near Symbiosis College",
    city: "Pune, Maharashtra, India - 411045",
    taxId: "GSTIN-27ABCDE1234F1Z5",
  };

  const products = [
    {
      name: `${invoiceData.productId.productName} (${invoiceData.productId.unit})`,
      qty: `${invoiceData.quantity} `,
      price: `₹${invoiceData.productId.price}`,
    },
  ];

  const totals = {
    subtotal: `₹${invoiceData.amount.toFixed(2)}`,
    tax: `₹${(invoiceData.amount * 0.1).toFixed(2)}`,
    total: `₹${(invoiceData.amount * 1.1).toFixed(2)}`,
  };

  const footer = {
    website: "www.shopfinity.com",
    phone: "+44 20 7946 0958",
    email: "support@shopfinity.com",
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.actionButtons}>
          <img
            src={CrossIcon}
            alt="CrossIcon"
            onClick={onClose}
            className={styles.close}
          />
          <img src={DownloadIcon} alt="download" className={styles.download} />
          <img src={PrinterIcon} className={styles.print} />
        </div>

        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.mobileInvoice}>
              <h1 className={styles.title}>INVOICE</h1>
              <img src={CrossIcon} alt="cross-icon" onClick={onClose} />
            </div>
            <div>
              <p className={styles.label}>Billed to</p>

              <div className={styles.infoRow}>
                <div className={styles.leftText}>
                  <p className={styles.companyName}>{company.name}</p>
                  <p>{company.address}</p>
                  <p>{company.city}</p>
                </div>

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
                <p className={styles.invoiceNumber}>{invoiceData.invoiceId}</p>
              </div>
              <div>
                <p className={styles.label}>Invoice date</p>
                <p className={styles.invoiceNumber}>
                  {invoiceData.invoiceDate}
                </p>
              </div>
              <div>
                <p className={styles.label}>Reference</p>
                <p className={styles.invoiceNumber}>
                  {invoiceData.referenceNumber}
                </p>
              </div>
              <div>
                <p className={styles.label}>Due date</p>
                <p className={styles.invoiceNumber}>{invoiceData.dueDate}</p>
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
                  {(products ?? [])?.map((item, i) => (
                    <tr key={i} className={styles.topTableRow}>
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
                    <td colSpan={2} className={styles.taxLable}>
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
                <img src={InvoiceFooterIcon} alt="footerIcon" /> Please pay
                within 15 days of receiving this invoice.
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
