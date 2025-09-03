import styles from "../Home.module.css";

const MetricCard = ({ icon: Icon, value, label, variant = "default" }) => (
  <div className={styles.metric}>
    <img src={Icon} alt={label} />
    <div
      className={
        variant === "summary" ? styles.innerSummery : styles.innerMatric
      }
    >
      <p className={styles.metricValue}>{value}</p>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  </div>
);

export default MetricCard;
