import DeleteAccount from "../DeleteAccount/DeleteAccount";
import EditNickname from "../EditNickname/EditNickname";
import styles from "./MyAccount.module.css";

export default function MyAccount() {
  return (
    <section className={styles.container}>
      <EditNickname />
      <DeleteAccount />
    </section>
  );
}
