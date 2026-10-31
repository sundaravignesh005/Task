import { useMemo, useReducer } from "react";
import { PRODUCTS } from "../data/products.js";
import { calculateCart } from "../pricing/calculateCart.js";

const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const toItems = (lines) => lines.map((l) => ({ price: byId[l.id].price, qty: l.qty }));

const initial = {
  lines: [], 
  couponInput: "",
  appliedCode: "" , 
  notice: null ,  // when we type the nothing mean get the  error   e
};


function recheckCoupon(state) {
  if (!state.appliedCode) return state;
  
  
  const r = calculateCart(toItems(state.lines), state.appliedCode);
  if (r.appliedCoupon) return state;
  return {  ...state,
    appliedCode: "",  notice: { type: "error", text: `${state.appliedCode} removed. ${r.message}` },
  };}

function reducer(state, action) {
  switch (action.type) {
  
    case "ADD": {
    
      const stock = byId[action.id].stock;
      
      const found = state.lines.find((l) => l.id === action.id);
      const lines = found
      
      ? state.lines.map((l) => l.id === action.id ? { ...l, qty: clamp(l.qty + 1, 1, stock) } : l
    
      )
    
              : [...state.lines, { id: action.id, qty: 1 }];
      return recheckCoupon({ ...state, lines });
    }
    
    case "SET_QTY": {

      const stock = byId[action.id].stock;
      
      const lines = state.lines.map((l) =>
        l.id === action.id ? { ...l, qty: clamp(action.qty, 1, stock) } : l
      );
      return recheckCoupon({ ...state, lines });
    }


  // to find the which oen will be liek teh use teh cases to do thsi one 
    
  case "REMOVE": {
  
    const lines = state.lines.filter((l) => l.id !== action.id);
      return recheckCoupon({ ...state, lines }); }

    case "COUPON_INPUT":
        return { ...state, couponInput: action.value };
    case "APPLY_COUPON": {
        if (state.lines.length === 0) return state;
       
        const r = calculateCart(toItems(state.lines), state.couponInput);
     
        if (!state.couponInput.trim()) {
      
          return { ...state, notice: { type: "error", text: "Enter a coupon code." } }; }
      if (r.appliedCoupon) {

        return {
             ...state,
            appliedCode: r.appliedCoupon,
           couponInput: "",
             notice: { type: "ok", text: r.message },
        };
      }

      return { ...state, notice: { type: "error", text: r.message } };

    }
    case "REMOVE_COUPON  ":
      return { ...state, appliedCode: " ", notice: null };
    default:
      return state;
  }
}

export function useCart() {
 
  const [state, dispatch] = useReducer(reducer, initial);

  const detailed = useMemo(
 
    () => state.lines.map((l) => ({ ...byId[l.id], qty: l.qty })),
 
    [state.lines]
  );

  const pricing = useMemo(
 
    () => calculateCart(toItems(state.lines), state.appliedCode),
 
 
    [state.lines, state.appliedCode]
 
  );

  const unitCount = state.lines.reduce((s, l) => s + l.qty, 0);
  
  
  const qtyOf = (id) => state.lines.find((l) => l.id === id)?.qty ?? 0;


  
  return { state, dispatch, items: detailed, pricing, unitCount, qtyOf };

}
