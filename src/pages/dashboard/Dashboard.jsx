import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
