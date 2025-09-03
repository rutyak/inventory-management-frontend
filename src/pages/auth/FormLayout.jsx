import styles from "./Auth.module.css";

const FormLayout = ({ title, subtitle, children, footer }) => (
  <>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.subtitle}>{subtitle}</p>
    <form className={styles.form}>{children}</form>
    {footer && <div className={styles.footerText}>{footer}</div>}
  </>
);

export default FormLayout;
