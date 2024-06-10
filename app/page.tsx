import styles from "./page.module.css";
import { getCoins } from "../API/getCoins";
import { SearchBar } from "./components";

export default async function Home() {
  const coins = await getCoins()
  return (
    <main className={styles.main}>
      <SearchBar coins={coins}/>
    </main>
  );
}
