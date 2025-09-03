import styles from "./TopProducts.module.css";
import { useSelector } from "react-redux";

const products = [
  { name: "Redbull", rating: 5 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 2 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 4 },
  { name: "Bru", rating: 1 },
];

const TopProducts = () => {
  const allInvoices = useSelector((state) => state.allInvoices);
  const allProducts = useSelector((state) => state.allProducts);

  const topFiveSelling = Array.isArray(allInvoices)
    ? allInvoices
        .filter((invoice) => Number(invoice.amount) > 0)
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .slice(0, 5)
    : [];

  const topFiveProductIds = (topFiveSelling ?? []).flatMap((invoice) => {
    if (!invoice?.productId) return [];
    return Array.isArray(invoice.productId)
      ? invoice.productId
      : [invoice.productId];
  });

  const matchedProducts = Array.isArray(allProducts)
    ? allProducts.filter((product) => topFiveProductIds.includes(product._id))
    : [];

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Top Products</h3>
      <div className={styles.list}>
        {matchedProducts?.map((item, index) => {
          if (!item) return null;

          return (
            <div key={index} className={styles.row}>
              <span className={styles.name}>{item.productName}</span>
              <div className={styles.imageContainer}>
                <img
                  src={item?.imageUrl}
                  alt={item.productName ?? "product"}
                  className={styles.imageStyle}
                />
                <div className={styles.dots}>
                  {[5, 5, 5, 5].map((rating, i) => (
                    <span
                      key={i}
                      className={`${styles.dot} ${
                        i < rating ? styles.active : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;
