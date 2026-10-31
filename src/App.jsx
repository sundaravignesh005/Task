import { PRODUCTS } from "./data/products.js";
import { useCart } from "./hooks/useCart.js";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import CouponBox from "./components/CouponBox.jsx";
import Breakdown from "./components/Breakdown.jsx";

export default function App() {
  const { state, dispatch, items, pricing, unitCount, qtyOf } = useCart();
  const empty = items.length === 0;

  return (
    <>
      <Header unitCount={unitCount} />
      <main className="layout">
        <ProductList
          products={PRODUCTS}
          qtyOf={qtyOf}
          onAdd={(id) => dispatch({ type: "ADD", id })} />
        <aside className="side">
          
          <Cart
            items={items}
      onQty={(id, qty) => dispatch({ type: "SET_QTY", id, qty })}
        onRemove={(id) => dispatch({ type: "REMOVE", id })}/>

          <CouponBox
            
            disabled={empty}
            input={state.couponInput}
            applied={state.appliedCode}
            notice={state.notice}
            onInput={(value) => dispatch({ type: "COUPON_INPUT", value })}
            onApply={() => dispatch({ type: "APPLY_COUPON" })}    
            
              onRemove={() => dispatch({ type: "REMOVE_COUPON" })}/>

          <Breakdown pricing={pricing} empty={empty} />
        </aside>
      </main>
    </>
  );
}
