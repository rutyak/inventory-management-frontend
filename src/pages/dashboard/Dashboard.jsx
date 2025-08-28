import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import BottomNav from "../../components/bottomNav/BottomNav";
import { SearchIcon, SettingIcon } from "../../assets/Icons";
import { AppIcon } from "../../assets/images";
import Settings from "../setting/Settings";
import ProductModal from "../../components/productModal/ProductModal";
import ProductView from "../../components/productViewModal/ProductView";
import InvoiceModal from "../../components/invoiceModal/InvoiceModal";

const invoiceData = {
  company: {
    name: "Company Name",
    address: "Company address",
    city: "City, Country - 00000",
  },
  business: {
    address: "Business address",
    city: "City, State, IN - 000 000",
    taxId: "TAX ID 00XXX0021234XXX",
  },
  invoice: {
    number: "INV-1007",
    date: "01-Apr-2025",
    reference: "INV-057",
    dueDate: "15-Apr-2025",
  },
  products: [
    { name: "Basmati Rice (5kg)", qty: 1, price: "₹1,090" },
    { name: "Aashirvaad Atta (10kg)", qty: 1, price: "₹545" },
    { name: "Fortune Sunflower Oil (5L)", qty: 1, price: "₹1,090" },
    { name: "Amul Toned Milk (1L)", qty: 5, price: "₹273" },
    { name: "Tata Salt (1kg)", qty: 2, price: "₹55" },
    { name: "Maggi Noodles (12-pack)", qty: 1, price: "₹136" },
    { name: "Good Day Biscuits (10 packs)", qty: 1, price: "₹227" },
    { name: "Red Label Tea (500g)", qty: 1, price: "₹263" },
    { name: "Sugar (5kg)", qty: 1, price: "₹272" },
    { name: "Mixed Vegetables", qty: "1 set", price: "₹1,090" },
  ],
  totals: {
    subtotal: "₹5,090",
    taxRate: 10,
    tax: "₹510",
    total: "₹5,600",
  },
  footer: {
    note: "Please pay within 15 days of receiving this invoice.",
    website: "www.recethtol.inc",
    phone: "+91 00000 00000",
    email: "hello@email.com",
  },
};

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isInvoiceOpen, setInvoiceOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSettingsPage = location.pathname.includes("/dashboard/settings");

  return (
    <div className={styles.dashboard}>
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <main className={styles.main}>
        {(!isMobile || !isSettingsPage) && (
          <header className={styles.header}>
            <div className={styles.innerHeader}>
              {isMobile ? (
                <AppIcon className={styles.appIconSize} />
              ) : (
                <h2 className={styles.pageTitle}>Home</h2>
              )}

              {isMobile ? (
                <Link to="/dashboard/settings">
                  <SettingIcon className={styles.iconSize} />
                </Link>
              ) : (
                <div className={styles.searchBox}>
                  <SearchIcon className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search here..."
                    className={styles.searchInput}
                  />
                </div>
              )}
            </div>
            {!isMobile && <hr className={styles.divider} />}
          </header>
        )}

        <div
          className={
            isSettingsPage && isMobile
              ? styles.settingPage
              : styles.commonStyles
          }
        >
          {isMobile && isSettingsPage ? (
            <Settings />
          ) : (
            <Outlet
              context={{ setIsOpen, setIsViewModalOpen, setInvoiceOpen }}
            />
          )}
        </div>

        <ProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <ProductView
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        />
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setInvoiceOpen(false)}
          invoiceData={invoiceData}
        />
      </main>

      {isMobile && <BottomNav />}
    </div>
  );
};

export default Dashboard;
