import React from "react";

export default function FeaturedMenu() {
  const featuredItems = [
    {
      id: 1,
      name: "Butter Chicken",
      category: "Curries",
      price: "₹299",
      icon: "🍗",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      category: "Appetizers",
      price: "₹249",
      icon: "🧀",
    },
    {
      id: 3,
      name: "Biryani",
      category: "Rice",
      price: "₹399",
      icon: "🍚",
    },
    {
      id: 4,
      name: "Naan",
      category: "Breads",
      price: "₹49",
      icon: "🥖",
    },
  ];

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="section-header">
          <h2>Featured Menu</h2>
          <p>Our most popular dishes</p>
        </div>

        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <div key={item.id} className="featured-card" style={{ "--delay": `${index * 0.1}s` }}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p className="card-category">{item.category}</p>
              <p className="card-price">{item.price}</p>
              <button className="card-btn">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="featured-footer">
          <button className="view-menu-btn">View Full Menu</button>
        </div>
      </div>
    </section>
  );
}
