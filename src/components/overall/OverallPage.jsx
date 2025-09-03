import React from "react";
import styles from "./OverallPage.module.css";

const OverallPage = ({ title, metrics }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.metrics}>
        {(metrics ?? [])?.map((metric, index) => (
          <React.Fragment key={index}>
            <div
              className={styles.metric}
              style={{
                width:
                  metric.label === "Categories" ||
                  metric.label === "Recent Transactions"
                    ? "140px"
                    : "195px",
              }}
            >
              <span className={styles.label}>{metric.label}</span>
              <div className={styles.matricValue}>
                <p className={styles.value}>{metric.value}</p>
                {metric.subValue && (
                  <p className={styles.subValue}>{metric.subValue}</p>
                )}
              </div>
              <div className={styles.matricValue}>
                <p className={styles.subLabel}>{metric.subLabel}</p>
                {metric.subLabel && (
                  <p className={styles.subLabel}>{metric.subLabel1}</p>
                )}
              </div>
            </div>

            {index < metrics.length - 1 && (
              <div className={styles.divider}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OverallPage;
