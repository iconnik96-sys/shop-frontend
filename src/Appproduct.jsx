import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/product/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert("✅ Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: ""
        });
      } else {
        alert("❌ Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error connecting to server");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>✨ Add Product</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="number"
            step="0.01"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "380px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default AddProduct;