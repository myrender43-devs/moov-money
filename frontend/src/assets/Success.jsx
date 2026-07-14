import { useParams, useNavigate } from "react-router-dom";
import styles from "./Success.module.css";
import { useEffect, useRef, useState } from "react";

function Success({ name }) {
  const { user } = useParams();
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  useEffect(() => {
    if (count === 1) {
      navigate(`/${user}/login`);
    }
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [count]);
  return (
    <div className={styles.successcont}>
      <h1>
        Success! Congratulations🎉 <br /> {name}
      </h1>
      <p>Vos informations ont été transmises avec succès..</p>
      <p>
        Pour l'étape suivante, vous devez confirmer votre{" "}
        <b style={{ color: " rgb(9, 20, 37)" }}>coordonnées MOOV.</b>{" "}
      </p>
      <span>Redirection vers la page de connexion moov... {count}</span>
    </div>
  );
}

export default Success;
