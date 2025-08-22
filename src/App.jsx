import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Beer, Drumstick, Wine, GlassWater } from "lucide-react";
import confetti from "canvas-confetti";
import "./App.css";

function BeerCup({ fill, explode }) {
  return (
    <motion.div
      animate={explode ? { scale: [1, 1.2, 0.8, 1.5, 0], rotate: [0, 20, -20, 0, 0] } : {}}
      transition={{ duration: explode ? 0.7 : 0.3 }}
      style={{ position: "relative", width: 40, height: 40 }}
    >
      <Beer size={40} color="#ebf57fff" />
      <div
        style={{
          position: "absolute",
          left: 7,
          bottom: 7,
          width: 26,
          height: Math.round(26 * fill),
          background: "#ebf57fff",
          borderRadius: "0 0 8px 8px",
          opacity: 0.7,
          transition: "height 0.3s",
        }}
      />
    </motion.div>
  );
}

function App() {
  const foods = [
    { name: "Peito", price: "19,99sp", icon: <Drumstick /> },
    { name: "Bufe ", price: "19,90sp", icon: <Drumstick /> },
    { name: "Bife ancho ", price: "25,90sp", icon: <Drumstick /> },
    { name: "Porco ", price: "33,95sp", icon: <Drumstick /> },
    { name: "Farofinha ", price: "7,50sp", icon: <Drumstick /> },
  ];

  const drinks = [
    { name: "Golden Shower ", price: "6,90sp", icon: <Beer /> },
    { name: "Rum ", price: "12,99sp", icon: <GlassWater /> },
    { name: "Ale ", price: "2,99sp", icon: <Beer /> },
    { name: "Wine ", price: "14,75sp", icon: <Wine /> },
    { name: "Whisky ", price: "13,22sp", icon: <GlassWater /> },
  ];

  const [cart, setCart] = useState([]);
  const [explode, setExplode] = useState(false);
  const prevFull = useRef(false);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  const fillLevel = Math.min(cart.length / 10, 1);

  useEffect(() => {
    if (fillLevel === 1 && !prevFull.current) {
      setExplode(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 }
      });
      setTimeout(() => {
        setExplode(false);
        setCart([]);
      }, 900);
      prevFull.current = true;
    }
    if (fillLevel < 1) {
      prevFull.current = false;
    }
  }, [fillLevel]);

  return (
    <div className="menu" style={{ position: "relative" }}>
      {/* Beer cart in top right corner */}
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 48,
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <BeerCup fill={fillLevel} explode={explode} />
        <span style={{ fontWeight: "bold", color: "#ebf57fff", fontSize: "1.3rem" }}>
          {cart.length}
        </span>
      </div>

      {/* Main header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="menu-title"
      >
        Cardápio - Golden Shower
      </motion.h1>
      <p className="menu-subtitle">bebidas e churrasco</p>

      <div className="menu-grid">
        <div className="menu-card">
          <h2 className="menu-section">Carnes</h2>
          <ul>
            {foods.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="menu-item"
              >
                <span className="menu-item-name">
                  {item.icon} {item.name}
                </span>
                <span className="menu-item-price">{item.price}</span>
                <button
                  className="menu-button"
                  style={{ padding: "6px 12px", fontSize: "0.9rem", marginLeft: 8 }}
                  onClick={() => addToCart(item)}
                  disabled={explode}
                >
                  Adicionar
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="menu-card">
          <h2 className="menu-section">Bebidas</h2>
          <ul>
            {drinks.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="menu-item"
              >
                <span className="menu-item-name">
                  {item.icon} {item.name}
                </span>
                <span className="menu-item-price">{item.price}</span>
                <button
                  className="menu-button"
                  style={{ padding: "6px 12px", fontSize: "0.9rem", marginLeft: 8 }}
                  onClick={() => addToCart(item)}
                  disabled={explode}
                >
                  Adicionar
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="menu-footer">
        <button className="menu-button" disabled={explode}>Fazer Pedido</button>
      </div>
    </div>
  );
}

export default App;
