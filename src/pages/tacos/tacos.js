import React from "react";
import {
  Link
} from "react-router-dom";

function Tacos({ routes }) {
    return (
      <div>
        
        <h2>Tacos</h2>
        <ul>
          <li>
            <Link to="/tacos/bus">Bus</Link>
          </li>
          <li>
            <Link to="/tacos/cart">Cart</Link>
          </li>
        </ul>
      </div>
    );
}

export default Tacos;