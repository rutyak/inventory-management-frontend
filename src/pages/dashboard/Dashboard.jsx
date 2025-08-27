import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import BottomNav from "../../components/bottomNav/BottomNav";
import { SearchIcon, SettingIcon } from "../../assets/Icons";
import { AppIcon } from "../../assets/images";
import Settings from "../setting/Settings";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSettingsPage = location.pathname.includes("/dashboard/settings");

  return (
    <div className={styles.dashboard}>
      {/* Sidebar (hidden on small devices if needed) */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        {!isSettingsPage && (
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

        {/* Main Content */}
        <div
          className={isSettingsPage ? styles.settingPage : styles.commonStyles}
        >
          {isMobile && isSettingsPage ? <Settings /> : <Outlet />}
        </div>
      </main>

      {/* Bottom navigation (mobile only) */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Dashboard;
