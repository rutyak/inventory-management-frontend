import { DeleteIcon, EyeIcon } from "../../assets/Icons";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import styles from "./Invoice.module.css";

const Invoice = () => {
  const metricsData = [
    { value: "24", label: "Recent Transactions", subLabel: "Last 7 days" },
    {
      value: "152",
      label: "Total Invoices",
      subValue: "138",
      subLabel: "Last 7 days",
      subLabel1: "Processed",
    },
    {
      value: "₹1,20,500",
      label: "Paid Amount",
      subValue: "97",
      subLabel: "Last 7 days",
      subLabel1: "customers",
    },
    {
      value: "₹45,800",
      label: "Unpaid Amount",
      subValue: "18",
      subLabel: "Ordered",
      subLabel1: "Pending Payment",
    },
  ];

  const invoicesData = [
    {
      invoiceId: "INV-1001",
      referenceNumber: "INV-052",
      amount: "₹2,450",
      status: "Paid",
      dueDate: "02-Apr-25",
    },
    {
      invoiceId: "INV-1002",
      referenceNumber: "INV-047",
      amount: "₹1,850",
      status: "Unpaid",
      dueDate: "05-Apr-25",
    },
    {
      invoiceId: "INV-1003",
      referenceNumber: "INV-057",
      amount: "₹3,620",
      status: "Paid",
      dueDate: "06-Apr-25",
    },
    {
      invoiceId: "INV-1004",
      referenceNumber: "INV-153",
      amount: "₹950",
      status: "Unpaid",
      dueDate: "07-Apr-25",
    },
    {
      invoiceId: "INV-1005",
      referenceNumber: "INV-507",
      amount: "₹4,100",
      status: "Paid",
      dueDate: "08-Apr-25",
    },
    {
      invoiceId: "INV-1006",
      referenceNumber: "INV-021",
      amount: "₹2,990",
      status: "Unpaid",
      dueDate: "10-Apr-25",
    },
    {
      invoiceId: "INV-1007",
      referenceNumber: "INV-037",
      amount: "₹5,600",
      status: "Paid",
      dueDate: "10-Apr-25",
    },
    {
      invoiceId: "INV-1008",
      referenceNumber: "INV-082",
      amount: "₹1,750",
      status: "Paid",
      dueDate: "12-Apr-25",
    },
    {
      invoiceId: "INV-1009",
      referenceNumber: "INV-009",
      amount: "₹3,250",
      status: "Unpaid",
      dueDate: "13-Apr-25",
    },
  ];

  const columns = [
    { header: "Invoice ID", key: "invoiceId" },
    { header: "Reference Number", key: "referenceNumber", hiddenBelow: 1280 },
    { header: "Amount (₹)", key: "amount", hiddenBelow: 1280 },
    { header: "Status", key: "status", hiddenBelow: 1280 },
    { header: "Due Date", key: "dueDate", hiddenBelow: 1280, threeDot: true },
    {
      header: "",
      key: "actions",
      hiddenAbove: 1280,
      render: (row) => (
        <div style={{ display: "flex", gap: "40px" }}>
          <EyeIcon />
          <DeleteIcon />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <OverallPage title="Overall Invoice" metrics={metricsData} />
      <CustomeTable
        products={invoicesData}
        rowsPerPage={10}
        title="Invoices List"
        addBtnLabel="Add Product"
        onAdd={() => alert("Add Product Clicked!")}
        columns={columns}
      />
    </div>
  );
};

export default Invoice;
