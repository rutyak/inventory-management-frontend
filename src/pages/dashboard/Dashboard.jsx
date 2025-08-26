import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import BottomNav from "../../components/bottomNav/BottomNav";
import { SearchIcon, SettingIcon } from "../../assets/Icons";
import { AppIcon } from "../../assets/images";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.innerHeader}>
            {isMobile ? (
              <AppIcon className={styles.appIconSize} />
            ) : (
              <h2 className={styles.pageTitle}>Home</h2>
            )}
            {isMobile ? (
              <SettingIcon className={styles.iconSize} />
            ) : (
              <div className={styles.searchBox}>
                <div style={{ marginRight: "1px" }}>
                  <SearchIcon />
                </div>
                <input type="text" placeholder="Search here..." />
              </div>
            )}
          </div>
          {!isMobile && <hr style={{ width: "100%", border: "1px solid white" }} />}
        </header>

        <div className={styles.commonStyles}>
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
