import React from "react";
import { useState } from "react";
import "./AddProduct.css";

const AddProducts = () => {
  const [rating, setRating] = useState(0);

  return (
       <div className="background">
      <form>
        <h1>Product Information</h1>

        <label htmlFor="name">Product Name:</label>
        <input type="text" id="name" placeholder="Enter the product name" />

        <label htmlFor="Image">Product Image:</label>
        <input type="file" id="Image" />

        <label htmlFor="Category">Category:</label>
        <select id="Category">
          <option>Choose any option</option>
          <option value="Beauty">Beauty</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Books">Books</option>
        </select>

        <label htmlFor="Price">Product Price:</label>
        <input type="text" id="Price" placeholder="Enter the product price" />
        <label htmlFor="Ratings">Product Ratings:</label>
        <div className="star-rating">
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="star5">★</label>

          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="star4">★</label>

          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="star3">★</label>

          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="star2">★</label>

          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="star1">★</label>
        </div>
        <div>
          <button>Submit</button>
        </div>
        
      </form>

      </div>
  );
};

export default AddProducts;
