import React from "react";
import styles from "./Statistics.module.css";
import { RupeeIcon, SoldIcon, StockIcon } from "../../assets/Icons";
import SalesChart from "../../components/chart/SalesChart";
import TopProducts from "../../components/topProducts/TopProducts";

const StatCard = ({ title, value, change, icon, bgColor }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <span className={styles.icon}>{icon}</span>
      </div>
      <h2 className={styles.value}>{value}</h2>
      <p className={styles.change}>{change}</p>
    </div>
  );
};

const Statistics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,32,875",
      change: "+20% from last month",
      icon: <RupeeIcon />,
      bgColor: "#FFD966",
    },
    {
      title: "Products Sold",
      value: "8,294",
      change: "+180% from last month",
      icon: <SoldIcon />,
      bgColor: "#3EF5C0",
    },
    {
      title: "Products in Stock",
      value: "234",
      change: "+1% from last month",
      icon: <StockIcon />,
      bgColor: "#DDA0F3",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.statContainer}>
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
      <div className={styles.chartContainer}>
        <SalesChart />
        <div className={`${styles.hidden} ${styles.topProduct}`}>
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
