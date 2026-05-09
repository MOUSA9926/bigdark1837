import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import Home from "./pages/Home";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </motion.div>
      )}
    </BrowserRouter>
  );
}
