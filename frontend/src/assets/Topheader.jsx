import styles from "./topheader.module.css";
import { Home, User, Settings } from "lucide-react";

function Topheader() {
  return (
    <div>
      <header className={styles.topHeader}>
        <img src="/cabslogo.jpeg" alt="cabs" />
        <div>
          <User size={36} color="blue" strokeWidth={2} /> <h1>Welcome </h1>
        </div>
      </header>
    </div>
  );
}

export default Topheader;
