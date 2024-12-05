import { LoginForm } from "@/components/pages/Login/LoginForm";
import styles from "./LoginPage.module.sass";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Login.</h1>
        <LoginForm />
      </div>
    </div>
  );
}
