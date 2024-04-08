import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [all_products, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://30ec-117-211-249-155.ngrok-free.app/admin/api/products")
      .then((resp) => resp.json())
      .then((data) => setAllProducts(data));
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`http://30ec-117-211-249-155.ngrok-free.app/admin/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify({id: id}),
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {all_products.products?.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image_url}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>Rs. {product.sticker_price}</p>
                <p>Rs. {product.price}</p>
                <p>{product.category[0]}</p>
                <img onClick={() => removeProduct(product.id)}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
