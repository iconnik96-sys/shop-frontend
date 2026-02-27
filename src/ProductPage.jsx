import React, { useEffect, useState } from "react";
import axios from  "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const [editId, setEditId] = useState(null);

  const BASE_URL = "https://shop-backend-b8e2.onrender.com/product";

  // 🔹 Fetch All Products
  const fetchProducts = async () => {
    const res = await axios.get(`${BASE_URL}/getallproducts`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${BASE_URL}/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(`${BASE_URL}/addproduct`, formData);
    }

    setFormData({ name: "", price: "", quantity: "" });
    fetchProducts();
  };

  // 🔹 Delete Product
  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    fetchProducts();
  };

  // 🔹 Edit Product
  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      {/* Product List */}
      <h3>All Products</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;