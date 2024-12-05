import { Button } from "@/components/commons/Button";
import { CostCheckerForm } from "@/components/pages/ShippingCost/CostCheckerForm";
import { useAuthCtx } from "@/contexts/authContext";
import styles from "./HomePage.module.sass";

export default function Home() {
  const { logout } = useAuthCtx();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading__wrapper}>
          <h1 className={styles.heading}>Shipping Cost Checker</h1>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
        <CostCheckerForm />
      </div>
    </div>
  );
}
