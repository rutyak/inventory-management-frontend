import { useState, useRef } from "react";
import styles from "./ProductModal.module.css";
import FileIcon from "../../assets/icons/FileIcon.svg";
import NextIcon from "../../assets/icons/NextIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const ProductModal = ({ isOpen, onClose }) => {
  const [isManualClick, setIsManualClick] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  // ✅ reset everything and close modal
  const resetAndClose = () => {
    setFile(null);
    setIsManualClick(false);
    setLoading(false);
    onClose();
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${base_url}/products/bulk`, formData);

      resetAndClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={resetAndClose}>
      <div
        className={`${styles.modal} ${
          isManualClick ? styles.modalExpanded : ""
        }`}
        onClick={stopPropagation}
      >
        {!isManualClick && (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                navigate("/dashboard/add/individual/product");
                resetAndClose();
              }}
            >
              Individual product
            </button>
            <button
              className={styles.btn}
              onClick={() => setIsManualClick(true)}
            >
              Multiple product
            </button>
          </>
        )}

        {isManualClick && (
          <>
            <div className={styles.uploadModalHeader}>
              <div>
                <h3>CSV Upload</h3>
                <p className={styles.subText}>Add your documents here</p>
              </div>
              <button className={styles.closeBtn} onClick={resetAndClose}>
                ✕
              </button>
            </div>

            <label className={styles.uploadBox}>
              <div className={styles.uploadIcon}>
                <img src={FileIcon} alt="fileIcon" />
              </div>
              <p>Drag your file(s) to start uploading</p>
              <span className={styles.orStyle}>
                <hr />
                OR
                <hr />
              </span>

              <input
                type="file"
                accept=".csv"
                className={styles.fileInput}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button
                type="button"
                className={styles.browseBtn}
                onClick={handleBrowseClick}
              >
                Browse files
              </button>
            </label>

            {/* File Preview */}
            {file && (
              <div className={styles.filePreview}>
                <div className={styles.fileDetails}>
                  <div className={styles.fileIcon}>📄</div>
                  <div className={styles.fileText}>
                    <p className={styles.fileName}>{file.name}</p>
                    <p className={styles.fileSize}>
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <button className={styles.removeBtn} onClick={handleRemoveFile}>
                  ✕
                </button>
              </div>
            )}

            {/* Footer */}
            <div className={styles.footerContainer}>
              <div className={styles.footer}>
                <button className={styles.cancelBtn} onClick={resetAndClose}>
                  Cancel
                </button>
                <button
                  className={styles.uploadBtn}
                  disabled={!file || loading}
                  onClick={handleUpload}
                >
                  {loading ? "Uploading..." : "Next"}{" "}
                  <img src={NextIcon} alt="nextIcon" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
