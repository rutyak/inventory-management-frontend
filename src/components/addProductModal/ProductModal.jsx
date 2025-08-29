import { useState } from "react";
import styles from "./ProductModal.module.css";
import { FileIcon, NextIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ isOpen, onClose }) => {
  const [isManualClick, setIsManualClick] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={stopPropagation}>
        {!isManualClick && (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                navigate("/dashboard/add/individual/product");
                onClose();
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
            {/* Header */}
            <div className={styles.uploadModalHeader}>
              <div>
                <h3>CSV Upload</h3>
                <p className={styles.subText}>Add your documents here</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                ✕
              </button>
            </div>

            <label className={styles.uploadBox}>
              <div className={styles.uploadIcon}>
                <FileIcon />
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
                onChange={handleFileChange}
              />
              <button type="button" className={styles.browseBtn}>
                Browse files
              </button>
            </label>

            {/* File Preview */}
            {file && (
              <div className={styles.filePreview}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileIcon}>📄</span>
                  <div>
                    <p className={styles.fileName}>{file.name}</p>
                    <p className={styles.fileSize}>
                      {(file.size / 1024).toFixed(2)} KB
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
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsManualClick(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.uploadBtn}
                  disabled={!file}
                  onClick={() => alert("File Uploaded!")}
                >
                  Next <NextIcon />
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
