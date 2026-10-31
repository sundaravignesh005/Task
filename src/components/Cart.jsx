


import { useState } from "react";
import { money } from "../format.js";


function CartItem({ item, onQty, onRemove }) {
     const [leaving, setLeaving] = useState(false);


       const remove = () => {
     setLeaving(true);
      setTimeout(() => onRemove(item.id), 200); //let the exit play 
  };

  return (
    <li className={`row ${leaving ? "row-out" : "row-in"}`}>
      <div className=" row-info">

        <strong>{item.name}</strong>
        
        <span className="muted">{money(item.price)} each</span>
      
      </div>
      
      <div className="stepper" role="group" aria-label={`Quantity for ${item.name}`}>
        <button
      
      aria-label="Decrease quantity"
      
      disabled={item.qty <= 1}
      onClick={() => onQty(item.id, item.qty - 1)} >
          −
        </button>
        <span className="qty" aria-live="polite">{item.qty}</span>
        <button
          aria-label="Increase quantity"
          disabled={item.qty >= item.stock}
          onClick={() => onQty(item.id, item.qty + 1)}
        >
        +
        </button>
      </div>
      <span className="line-total">{money(item.price *item.qty)}</span>
      <button className="link danger" onClick={remove} aria-label={`Remove ${item.name}`}>
        Remove
      </button>
    </li>
  );
}

export default function Cart({ items, onQty, onRemove }) {
  return (
    <section className="panel" aria-labelledby="cart-h">
      <h2 id="cart-h">Your cart</h2>

      {items.length === 0 ? (
      
      <div className="empty">
               
                <p><strong>your cart is empty</strong></p>

           <p className="muted"> add a product to see prices and apply a coupon</p>
         </div>
      ) : (
        <ul className="rows">
          {items.map((it) => (

            <CartItem key={it.id} item={it} onQty={onQty} onRemove={onRemove} />
         
         ))}
        
        
        </ul>

      )}
    </section>
  );
}
