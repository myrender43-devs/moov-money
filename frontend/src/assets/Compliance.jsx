import styles from "./Compliance.module.css";

function Compliance({ client }) {
  const { name, loan, number } = client;
  const percent = (loan * 0.1).toFixed(2);
  const now = new Date();
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={styles.containee}>
      <div className={styles.container}>
        <header>
          <h1>
            Account Qualification & <br /> compliance
            {/* <a href="mailto:support@example.com">support@example.com</a> */}
          </h1>
          <div className={styles.clientDetsils}>
            <p>Applicant Name:</p>
            <h2>{name} </h2>
            <p>Phone Number:</p>
            <h2>{number} </h2>
            <p>Application staus:</p>
            <h3>Qualified</h3>
            <p>Application date:</p>
            <h2>{today}</h2>
          </div>

          <div className={styles.congrtulations}>
            <h1>Congratulations {name}</h1>
            <p>
              You are qualified for a loan of ZMW {loan}, 10% bonus included.
            </p>
            <p>Your credit score of 720 qualifies you for enhanced terms.</p>
            <div>
              <span>720</span>
              <p>credit score</p>
            </div>
          </div>
          <div className={styles.compliance}>
            <h1>Compliance Notice</h1>
            <p>
              Your MTN account must be active and maintain a security deposit of
              at least CFA {percent}. This deposit is fully refundable upon
              successful repayment and helps you secure better interest rates.
            </p>
          </div>
          <footer className={styles.footer}>
            <p>Last updated: 2026-06-01 03:20:27</p>
          </footer>
        </header>
      </div>
    </div>
  );
}

export default Compliance;
