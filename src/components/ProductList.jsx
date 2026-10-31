
import { money } from "../format.js";

export default function ProductList({ products, qtyOf, onAdd }) {
  return (
    <section className="products" aria-labelledby="products-h">
      <h2 id="products-h">Products</h2>
      <ul className="grid">
        {products.map((p) => {
          const inCart = qtyOf(p.id);
          const maxed = inCart >= p.stock;
          return (
                 <li key={p.id} className="card">
              <div className="card-body">
       <h3>{p.name}</h3>
                <p className="price">{money(p.price)}</p>
                <p className="muted">
                  {maxed ? "All stock in your cart" : `${p.stock - inCart} left`}
                </p>
              </div>
              <button className="btn" disabled={maxed} onClick={() => onAdd(p.id)}>
                {maxed ? "Max in cart" : "Add to cart"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
