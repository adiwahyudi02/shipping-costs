import { CheckResults } from "@/types/cost";
import styles from "./CheckResult.module.sass";
import { formatRupiah } from "@/utils/currency";

interface CheckResultProps {
  data: CheckResults;
}

export const CheckResult = ({ data }: CheckResultProps) => {
  return (
    <div className={styles.checkResult}>
      {data.map((courier) => (
        <div key={courier.code}>
          <div className={styles.checkResult__courier__wrapper}>
            <p className={styles.checkResult__courier__name}>{courier.name}</p>
            <p className={styles.checkResult__courier__services}>
              {courier.costs.length} services
            </p>
          </div>
          {courier.costs.map((cost) => (
            <div
              key={cost.service}
              className={styles.checkResult__cost__wrapper}
            >
              <div className={styles.checkResult__cost__detail}>
                <div>
                  <p className={styles.checkResult__cost__detail__name}>
                    {cost.description} {cost.service}
                  </p>
                  <p>{cost.cost[0]?.etd} Days</p>
                </div>
                <p className={styles.checkResult__cost__detail__price}>
                  {formatRupiah(cost.cost[0]?.value)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
