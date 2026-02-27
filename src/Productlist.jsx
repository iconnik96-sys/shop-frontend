import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ fetch all products
  const loadProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/product/getallproducts"
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("❌ Failed to load products");
    }
  };

  // ✅ delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await fetch(`http://localhost:8080/product/${id}`, {
        method: "DELETE"
      });
      loadProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete product");
    }
  };

  // ✅ open edit form
  const startEdit = (product) => {
    setEditingProduct({ ...product });
  };

  // ✅ handle edit change
  const handleEditChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value
    });
  };

  // ✅ save update (FULL UPDATE)
  const saveUpdate = async () => {
    try {
      await fetch(
        `http://localhost:8080/product/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editingProduct)
        }
      );

      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update product");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📦 Product List</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.empty}>
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr
                  key={p.id}
                  style={
                    index % 2 === 0
                      ? styles.evenRow
                      : styles.oddRow
                  }
                >
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.description}</td>
                  <td style={styles.td}>₹{p.price}</td>
                  <td style={styles.td}>{p.quantity}</td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>
                    <div style={styles.actionBox}>
                      <button
                        style={styles.updateBtn}
                        onClick={() => startEdit(p)}
                      >
                        ✏️ Update
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteProduct(p.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ✅ EDIT MODAL */}
        {editingProduct && (
          <div style={styles.modal}>
            <div style={styles.modalCard}>
              <h3>Edit Product</h3>

              <input
                name="name"
                value={editingProduct.name}
                onChange={handleEditChange}
                style={styles.input}
              />

              <input
                name="description"
                value={editingProduct.description}
                onChange={handleEditChange}
                style={styles.input}
              />

              <input
                name="price"
                type="number"
                value={editingProduct.price}
                onChange={handleEditChange}
                style={styles.input}
              />

              <input
                name="quantity"
                type="number"
                value={editingProduct.quantity}
                onChange={handleEditChange}
                style={styles.input}
              />

              <input
                name="category"
                value={editingProduct.category}
                onChange={handleEditChange}
                style={styles.input}
              />

              <div style={styles.modalActions}>
                <button
                  style={styles.saveBtn}
                  onClick={saveUpdate}
                >
                  ✅ Save
                </button>

                <button
                  style={styles.cancelBtn}
                  onClick={() => setEditingProduct(null)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    background: "#f5f6fa",
    padding: "12px",
    textAlign: "left"
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee"
  },
  evenRow: { background: "#fafafa" },
  oddRow: { background: "#ffffff" },
  actionBox: { display: "flex", gap: "8px" },
  updateBtn: {
    padding: "6px 12px",
    background: "#1677ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    padding: "20px"
  },

  /* ✅ modal */
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },
  saveBtn: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  cancelBtn: {
    background: "gray",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ProductList;