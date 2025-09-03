import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";
import EyeIcon from "../../assets/icons/EyeIcon.svg";
import OverallPage from "../../components/overall/OverallPage";
import CustomeTable from "../../components/table/CustomeTable";
import axios from "axios";
import styles from "./Invoice.module.css";
import {
  addInvoices,
  removeInvoice,
  updateInvoice,
} from "../../utils/invoiceSlice";
import { toast } from "react-toastify";
import {
  incrementOpenCount,
  removeAllInvoice,
  updateAllInvoice,
} from "../../utils/allInvoiceSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Invoice = () => {
  const invoices = useSelector((state) => state.invoices);

  const allInvoices = useSelector((state) => state.allInvoices);

  const dispatch = useDispatch();

  const { setInvoiceOpen, setOpenedInvoiceId, search } = useOutletContext();

  const [invoiceOpenCount, setInvoiceOpenCount] = useState();
  const [deleteInvoiceId, setDeleteInvoiceId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

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
      render: (item) => (
        <div style={{ display: "flex", gap: "20px", position: "relative" }}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleInvoiceOpen(item._id);
            }}
          >
            <img src={EyeIcon} alt="eye-icon" className={styles.eyeIcon} />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDeleteInvoiceId(item._id);
            }}
          >
            <img
              src={DeleteIcon}
              alt="delete-icon"
              className={styles.deleteIcon}
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          `${base_url}/invoices?page=${pagination.page}&limit=${pagination.limit}`
        );

        setPagination((prev) => ({
          ...prev,
          page: res.data.pagination.page,
          limit: res.data.pagination.limit,
          totalPages: res.data.pagination.totalPages,
        }));

        dispatch(addInvoices(res?.data?.invoices));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchInvoices();
  }, [pagination.page, pagination.limit, dispatch]);

  async function handleDeleteInvoice(id) {
    try {
      await axios.delete(`${base_url}/invoice/${id}`);
      dispatch(removeInvoice(id));
      dispatch(removeAllInvoice(id));
      toast.success("Invoice deleted successfully");
      setDeleteInvoiceId(null);
    } catch (error) {
      toast.error(error.message || "Something is wrong");
      console.error("Failed to delete invoice:", error.message);
    }
  }

  async function handlePaymentStatusChange(id) {
    try {
      const res = await axios.patch(`${base_url}/invoice/${id}`, {
        status: "Paid",
      });

      dispatch(
        updateInvoice({
          id,
          status: "Paid",
          referenceNumber: res.data.invoice.referenceNumber,
        })
      );

      dispatch(
        updateAllInvoice({
          id,
          status: "Paid",
          referenceNumber: res.data.invoice.referenceNumber,
        })
      );

      toast.success(res.data.message || "Payment status updated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update status"
      );
    }
  }

  async function incrementInvoiceOpenCount(invoiceId) {
    try {
      const res = await axios.patch(`${base_url}/invoice/${invoiceId}/open`);
      dispatch(updateInvoice(res.data?.invoice));
    } catch (err) {
      console.error("Failed to increment open count", err);
    }
  }

  function handleInvoiceOpen(id) {
    setOpenedInvoiceId(id);
    setInvoiceOpen(true);

    dispatch(incrementOpenCount(id));

    incrementInvoiceOpenCount(id);
  }

  // ✅ Dynamic Metrics
  const metricsData = useMemo(() => {
    const list = Array.isArray(allInvoices) ? allInvoices : [];

    const totalInvoices = list.length;
    const paidInvoices = list.filter((inv) => inv?.status === "Paid");
    const unpaidInvoices = list.filter((inv) => inv?.status === "Unpaid");

    const invoiceOpenCount = list.reduce(
      (sum, inv) => sum + (inv.openCount || 0),
      0
    );

    const paidAmount = paidInvoices?.reduce(
      (sum, inv) => sum + (inv.amount || 0),
      0
    );

    const unpaidAmount = unpaidInvoices?.reduce(
      (sum, inv) => sum + (inv.amount || 0),
      0
    );

    return [
      {
        value: paidInvoices?.length,
        label: "Recent Transactions",
        subLabel: "Last 7 days",
      },
      {
        value: totalInvoices,
        label: "Total Invoices",
        subValue: invoiceOpenCount,
        subLabel: "Last 7 days",
        subLabel1: "Processed",
      },
      {
        value: `₹${paidAmount.toLocaleString("en-IN")}`,
        label: "Paid Amount",
        subValue: paidInvoices?.length,
        subLabel: "Last 7 days",
        subLabel1: "customers",
      },
      {
        value: `₹${unpaidAmount?.toLocaleString("en-IN")}`,
        label: "Unpaid Amount",
        subValue: unpaidInvoices?.length,
        subLabel: "Ordered",
        subLabel1: "Pending Payment",
      },
    ];
  }, [allInvoices]);

  const filteredInvoices = useMemo(() => {
    const list = Array.isArray(invoices) ? invoices : [];
    if (!search?.trim()) return list;

    const query = search.toLowerCase();

    return list.filter((inv) => {
      return [
        inv?.invoiceId,
        inv?.invoiceDate,
        inv?.referenceNumber,
        inv?.amount?.toString(),
        inv?.status,
        inv?.dueDate,
        inv?.productId,
        inv?.quantity?.toString(),
        inv?.createdAt,
        inv?.updatedAt,
      ]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(query));
    });
  }, [search, invoices]);

  return (
    <div className={styles.container}>
      <OverallPage title="Overall Invoice" metrics={metricsData} />

      <CustomeTable
        products={filteredInvoices}
        rowsPerPage={pagination.limit}
        title="Invoices List"
        addBtnLabel="Add Invoice"
        onAdd={() => alert("Add Invoice Clicked!")}
        columns={columns}
        handleInvoiceOpen={handleInvoiceOpen}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(newPage) =>
          setPagination((prev) => ({ ...prev, page: newPage }))
        }
        handleDeleteInvoice={handleDeleteInvoice}
        handlePaymentStatusChange={handlePaymentStatusChange}
      />
    </div>
  );
};

export default Invoice;
