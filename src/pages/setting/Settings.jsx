import { useState } from "react";
import styles from "./Settings.module.css";
import CloseIcon from "../../assets/icons/CloseIcon.svg";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function Settings({ setIsSettingPageCliked }) {
  const userData = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id, name, email } = userData;

  const [activeTab, setActiveTab] = useState("edit");
  const [openAccountId, setOpenAccountId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [formData, setFormData] = useState({
    firstname: name ? name.split(" ")[0] : "",
    lastname: name ? name.split(" ")[1] || "" : "",
    email: email || "",
    password: "",
    confirmPassword: "",
  });

  const accounts = [{ id: 1, email: user?.email }];

  function handleCloseCliked() {
    navigate(-1);
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleEdit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.patch(
        `${base_url}/update/${_id}`,
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(addUser(res.data?.user));
        toast.success("User updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  }

  function handleLogout() {
    const logout = async () => {
      try {
        await axios.post(`${base_url}/logout`, {}, { withCredentials: true });
        dispatch(removeUser());
        toast.success("Logged out successfully!");
        navigate("/");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.error || "Logout failed!");
      }
    };
    logout();
  }

  function toggleAccount(id) {
    setOpenAccountId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.closeSetting} onClick={handleCloseCliked}>
          <img src={CloseIcon} alt="close-icon" className={styles.closeIcon} />
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
          <form className={styles.form} onSubmit={handleEdit}>
            <div className={styles.field}>
              <label className={styles.label}>First name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter your firstname"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter your lastname"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className={styles.input}
                disabled
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                defaultValue={"........"}
                placeholder="Enter password"
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                defaultValue={"........"}
                onChange={handleChange}
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
              <p className={styles.verified}>Verified</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Add Accounts</h3>
              <ul className={styles.accountList}>
                {
                  (accounts ?? [])?.map((acc) => (
                    <li key={acc.id} className={styles.accountItem}>
                      <input
                        type="radio"
                        name="selectedAccount"
                        value={acc.id}
                        checked={selectedAccountId === acc.id}
                        onChange={() => setSelectedAccountId(acc.id)}
                        className={styles.radio}
                      />

                      <span className={styles.email}>{acc.email}</span>

                      <div className={styles.actionsRow}>
                        <button
                          type="button"
                          className={styles.toggleBtn}
                          onClick={() => toggleAccount(acc.id)}
                        >
                          {openAccountId === acc.id ? (
                            <img src={ArrowUpIcon} alt="arrow-up" />
                          ) : (
                            <img src={ArrowDownIcon} alt="arrow-down" />
                          )}
                        </button>

                        {openAccountId === acc.id && (
                          <button className={styles.deleteBtn}>
                            <img src={DeleteIcon} alt="DeleteIcon" /> Delete
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles.logoutWrapper}>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
