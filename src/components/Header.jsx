export default function Header({ unitCount }) {
  return (
    <header className="header">
      <h1>Outfitter</h1>
      
      <div className="cart-chip" aria-label={`${unitCount} units in cart`}>
        <span>Cart</span>

        <span key={unitCount} className="badge">{unitCount}</span>
      
      </div>
    
    </header>
  );
}
