import styles from "./Auth.module.css";

const FormField = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) => (
  <div className={styles.lableContainer}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);

export default FormField;
