import styles from "./Statistics.module.css";
import RupeeIcon from "../../assets/icons/RupeeIcon.svg";
import SoldIcon from "../../assets/icons/SoldIcon.svg";
import StockIcon from "../../assets/icons/StockIcon.svg";
import SalesChart from "../../components/chart/SalesChart";
import TopProducts from "../../components/topProducts/TopProducts";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  const revenue = Array.isArray(allInvoices)
    ? allInvoices.filter((inv) => inv?.status === "Paid")
    : [];
  const totalRevenue = revenue?.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );

  const productsSoldArr = Array.isArray(allInvoices)
    ? allInvoices.filter((inv) => inv?.status === "Paid")
    : [];

  const productsSold = productsSoldArr?.reduce(
    (sum, inv) => sum + Number(inv.quantity || 0),
    0
  );

  const productsInStock = Array.isArray(allProducts)
    ? allProducts.reduce((sum, p) => sum + Number(p.quantity || 0), 0)
    : 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "+20% from last month",
      icon: <img src={RupeeIcon} alt="RupeeIcon" />,
      bgColor: "#FFD966",
    },
    {
      title: "Products Sold",
      value: productsSold.toLocaleString(),
      change: "+180% from last month",
      icon: <img src={SoldIcon} alt="SoldIcon" />,
      bgColor: "#3EF5C0",
    },
    {
      title: "Products in Stock",
      value: productsInStock.toLocaleString(),
      change: "+1% from last month",
      icon: <img src={StockIcon} alt="stockIcon" />,
      bgColor: "#DDA0F3",
    },
  ];

  const [cards, setCards] = useState([
    { id: "sales", component: <SalesChart /> },
    {
      id: "products",
      component: <TopProducts />,
    },
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("cardIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("cardIndex");
    if (dragIndex === null) return;

    const updatedCards = [...cards];
    const [draggedCard] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(dropIndex, 0, draggedCard);

    setCards(updatedCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.statContainer}>
        {(stats ?? []).map((item, index) => {
          if (!item) return null;
          return <StatCard key={index} {...item} />;
        })}
      </div>

      {/* 🔹 Drag and Drop Section */}
      <div className={styles.chartContainer}>
        {(cards ?? [])?.map((card, index) => {
          if (!card) return null;
          return (
            <div
              key={card.id ?? index}
              className={
                card.id === "products" ? styles.fixedCard : styles.bigCard
              }
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {card?.component ?? null}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
