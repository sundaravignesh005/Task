

import {money} from "../format.js";

function Line({ label, value, negative, strong, note }) {
      return (
  
    <div className={`line ${strong ? "line-total-row" : ""}`}>
      <dt>

        {label}

        {note && <small className="muted"> {note}</small>}

      </dt>




      <dd key={value} className="flash">
      
      
        {negative && value>0 ? "−" :""}
      

        {money(value)}
      

      </dd>
    
    </div>
  );
}

export default function Breakdown({ pricing, empty }) {
  const p = pricing;
  return (
    <section className="panel" aria-labelledby="bd-h">
      
      <h2 id="bd-h">Price breakdown</h2>

      <dl className="breakdown">



        
        <Line label="Subtotal" value={p.subtotal} />


        <Line label="Discount" value={p.discount} negative />


        <Line

          label="Shipping"

          value={p.shipping}
          
          note={empty ? "" : p.shipping === 0 ? "(free)" : ""}
        />
        <Line label="GST    (18%)" value={p.gst} />

        <Line label="Total" value={p.total} strong />
      </dl>
    </section>
  );
}
