import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SalesChart from "../../components/chart/SalesChart";
import TopProducts from "../../components/topProducts/TopProducts";

import OverviewSection from "./sections/OverviewSection";
import SummarySection from "./sections/SummarySection";
import { addAllInvoices } from "../../utils/allInvoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts } from "../../utils/allProductSlice";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const DraggableSection = ({ id, children, onDrag, onDrop, isDragging }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", id);
    onDrag(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId !== id) onDrop(draggedId, id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${styles.draggableSection} ${
        isDragging ? styles.dragging : ""
      } ${isDragOver ? styles.dragOver : ""}`}
    >
      {children}
    </div>
  );
};

const ChartSection = () => (
  <div className={styles.bigCard}>
    <SalesChart />
  </div>
);

const TopProductsSection = () => (
  <div className={styles.card}>
    <TopProducts />
  </div>
);

// Section configuration
const sectionComponents = {
  overview: OverviewSection,
  chart: ChartSection,
  summary: SummarySection,
  topProducts: TopProductsSection,
};

const Home = () => {
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  const [sections, setSections] = useState({
    left: ["overview", "chart"],
    right: ["summary", "topProducts"],
  });

  const [draggingId, setDraggingId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(`${base_url}/fetch/invoices`);
        dispatch(addAllInvoices(res.data?.invoices));
      } catch (err) {
        console.error(err.response?.data?.error || "Failed to fetch invoices");
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${base_url}/fetch/products`);
        dispatch(addAllProducts(res.data?.products));
      } catch (err) {
        console.error(err.response?.data?.error || "Failed to fetch products");
      }
    };

    fetchInvoices();
    fetchProducts();
  }, [dispatch]);
  
  const handleDragStart = (id) => setDraggingId(id);

  const handleDrop = (draggedId, targetId) => {
    const isDraggedFromLeft = sections.left.includes(draggedId);
    const isTargetInLeft = sections.left.includes(targetId);

    if (isDraggedFromLeft === isTargetInLeft) {
      const column = isDraggedFromLeft ? "left" : "right";
      const newSections = [...sections[column]];
      const fromIndex = newSections.indexOf(draggedId);
      const toIndex = newSections.indexOf(targetId);

      newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, draggedId);

      setSections({ ...sections, [column]: newSections });
    } else {
      const sourceColumn = isDraggedFromLeft ? "left" : "right";
      const targetColumn = isTargetInLeft ? "left" : "right";

      const newSourceSections = [...sections[sourceColumn]];
      const newTargetSections = [...sections[targetColumn]];

      const fromIndex = newSourceSections.indexOf(draggedId);
      newSourceSections.splice(fromIndex, 1);

      const toIndex = newTargetSections.indexOf(targetId);
      newTargetSections.splice(toIndex, 0, draggedId);

      setSections({
        ...sections,
        [sourceColumn]: newSourceSections,
        [targetColumn]: newTargetSections,
      });
    }

    setDraggingId(null);
  };

  const renderSection = (sectionId, column) => {
    const Component = sectionComponents[sectionId];
    const isDragging = draggingId === sectionId;

    return (
      <DraggableSection
        key={sectionId}
        id={sectionId}
        onDrag={handleDragStart}
        onDrop={handleDrop}
        isDragging={isDragging}
      >
        <Component />
      </DraggableSection>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {(sections.left ?? []).map(
            (sectionId) => sectionId && renderSection(sectionId, "left")
          )}
        </div>
        <div className={styles.rightColumn}>
          {(sections.right ?? []).map(
            (sectionId) => sectionId && renderSection(sectionId, "right")
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
