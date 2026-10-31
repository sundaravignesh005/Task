
export default function CouponBox({ disabled, input, applied, notice, onInput, onApply, onRemove }) {
  
  return (
   <section className="panel" aria-labelledby="coupon-h">
      
      <h2 id="coupon-h">Coupon</h2>
      
      {applied ? (  
    
    <div className="applied">
    
    <span className="tag">{applied}</span>
    
          <button className="link danger" onClick={onRemove}>Remove</button>
    
        </div>
      ) : (
    
    <div className="coupon-row">
    
          <input
            value={input}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !disabled && onApply()}
            placeholder="Enter code"
            aria-label="Coupon code"
            disabled={disabled}  />   <button className="btn" disabled={disabled} onClick={onApply}>
            Apply
          </button>
        </div>
      )}
      {disabled && !applied && <p className="muted"> Add items to use a coupon </p>}
      {notice && (
        <p key={notice.text} className={`notice ${notice.type}`} role="status">
          {notice.text}
        </p>
      )}
    </section>
  );
}
