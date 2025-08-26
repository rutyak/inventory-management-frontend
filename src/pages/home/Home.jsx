import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSell, MdOutlineInventory2 } from "react-icons/md";
import { BiRupee, BiTrendingUp } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import styles from "./Home.module.css";
import {
  CancelIcon,
  CatagoriesIcon,
  CostDashboardIcon,
  CostIcon,
  ProfitIcon,
  PurchaseIcon,
  QuantityInHand,
  ReturnIcon,
  RevenueIcon,
  SalesIcon,
  SearchIcon,
  SupplierIcon,
  TobeReceived,
} from "../../assets/Icons";
import SalesChart from "../../components/chart/SalesChart";
import TopProducts from "../../components/topProducts/TopProducts";

const data = [
  { month: "Jan", Purchase: 48000, Sales: 42000 },
  { month: "Feb", Purchase: 51000, Sales: 41000 },
  { month: "Mar", Purchase: 42000, Sales: 46000 },
  { month: "Apr", Purchase: 31000, Sales: 39000 },
  { month: "May", Purchase: 39000, Sales: 40000 },
  { month: "Jun", Purchase: 24000, Sales: 36000 },
  { month: "Jul", Purchase: 30000, Sales: 28000 },
  { month: "Aug", Purchase: 26000, Sales: 23000 },
];

const topProducts = [
  { name: "Redbull", rating: 6 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 5 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 5 },
  { name: "Bru", rating: 4 },
];

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.cardsRow}>
          {/* Sales Overview */}
          <div className={styles.bigCard}>
            <h3 className={styles.cardTitle}>Sales Overview</h3>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <SalesIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 832</p>
                  <span className={styles.metricLabel}>Sales</span>
                </div>
              </div>

              <div className={styles.metric}>
                <RevenueIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 18,300</p>
                  <span className={styles.metricLabel}>Revenue</span>
                </div>
              </div>

              <div className={styles.metric}>
                <ProfitIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 868</p>
                  <span className={styles.metricLabel}>Profit</span>
                </div>
              </div>

              <div className={styles.metric}>
                <CostIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 17,432</p>
                  <span className={styles.metricLabel}>Cost</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className={`${styles.card} ${styles.hidden}`}>
            <h3 className={`${styles.cardTitle} ${styles.summeryTitle}`}>
              Inventory Summary
            </h3>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <QuantityInHand />
                <div className={styles.innerSummery}>
                  <p className={styles.metricValue}>868</p>
                  <span className={styles.metricLabel}>Quantity in Hand</span>
                </div>
              </div>

              <div className={styles.metric}>
                <TobeReceived />
                <div className={styles.innerSummery}>
                  <p className={styles.metricValue}>200</p>
                  <span className={styles.metricLabel}>To be received</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.cardsRow} ${styles.hidden}`}>
          {/* product Overview */}
          <div className={styles.bigCard}>
            <h3 className={styles.cardTitle}>Purchase Overview</h3>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <PurchaseIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>82</p>
                  <span className={styles.metricLabel}>Purchase</span>
                </div>
              </div>

              <div className={styles.metric}>
                <CostDashboardIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 13,500</p>
                  <span className={styles.metricLabel}>Cost</span>
                </div>
              </div>

              <div className={styles.metric}>
                <CancelIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>5</p>
                  <span className={styles.metricLabel}>Cancel</span>
                </div>
              </div>

              <div className={styles.metric}>
                <ReturnIcon />
                <div className={styles.innerMatric}>
                  <p className={styles.metricValue}>₹ 17,432</p>
                  <span className={styles.metricLabel}>Return</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Summary */}
          <div className={`${styles.card} ${styles.hidden}`}>
            <h3 className={`${styles.cardTitle} ${styles.summeryTitle}`}>
              Product Summary
            </h3>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <SupplierIcon />
                <div className={styles.innerSummery}>
                  <p className={styles.metricValue}>31</p>
                  <span className={styles.metricLabel}>
                    Number of Suppliers
                  </span>
                </div>
              </div>

              <div className={styles.metric}>
                <CatagoriesIcon />
                <div className={styles.innerSummery}>
                  <p className={styles.metricValue}>21</p>
                  <span className={styles.metricLabel}>
                    Number of Catagories
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* chart */}
        <div className={styles.chartContainer}>
          <SalesChart />
          <div className={`${styles.hidden} ${styles.topProduct}`}>
            <TopProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
