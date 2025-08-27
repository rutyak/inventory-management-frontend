import { useState } from "react";
import styles from "./Settings.module.css";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

function Settings({ setIsSettingPageCliked }) {
  const [activeTab, setActiveTab] = useState("edit");

  const navigate = useNavigate();

  const accounts = [
    { id: 1, email: "Acount01_@gmail.com" },
    { id: 2, email: "Acount02_@gmail.com" },
  ];

  function handleCloseCliked() {
    console.log("close cliked");

    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.closeSetting} onClick={handleCloseCliked}>
          <CloseIcon className={styles.closeIcon} />
        </div>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("edit")}
            className={`${styles.tabButton} ${
              activeTab === "edit" ? styles.activeTab : ""
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`${styles.tabButton} ${
              activeTab === "account" ? styles.activeTab : ""
            }`}
          >
            Account Management
          </button>
        </div>

        {/* Edit Profile Form */}
        {activeTab === "edit" && (
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>First name</label>
              <input
                type="text"
                defaultValue="Sarthak"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last name</label>
              <input type="text" defaultValue="Pal" className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                defaultValue="Sarthakpal08@gmail.com"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                defaultValue="************"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                defaultValue="************"
                className={styles.input}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </div>
          </form>
        )}

        {/* Account Management */}
        {activeTab === "account" && (
          <div className={styles.account}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Identity verification</h3>
              <p className={styles.verified}>Verifiied</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Add Accounts</h3>
              <ul className={styles.accountList}>
                {accounts.map((acc, index) => (
                  <li key={acc.id} className={styles.accountItem}>
                    <span className={styles.circle}></span>
                    <span className={styles.email}>{acc.email}</span>
                    <div className={styles.actionsRow}>
                      <button className={styles.toggleBtn}>
                        {index === 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      </button>
                      {index === 0 && (
                        <button className={styles.deleteBtn}>🗑 Delete</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.logoutWrapper}>
              <button className={styles.logoutBtn}>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
