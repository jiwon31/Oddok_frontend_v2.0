import { useEffect, useState } from "react";
import { CategoryOption } from "types/search-option";
import styles from "./TabMenu.module.css";

const items: Record<string, CategoryOption> = {
  전체: "ALL",
  공무원: "OFFICIAL",
  수능내신: "SCHOOL",
  자격증: "CERTIFICATE",
  취업: "EMPLOYEE",
  개인: "ETC",
};
type TabMenuProps = {
  defaultValue: CategoryOption | null;
  setCurrentCategory: (value: CategoryOption | null) => void;
};

export default function TabMenu({ defaultValue, setCurrentCategory }: TabMenuProps) {
  const [current, setCurrent] = useState<CategoryOption>(defaultValue ?? "ALL");

  useEffect(() => setCurrent(defaultValue ?? "ALL"), [defaultValue]);

  const filterCategory = (key: CategoryOption) => {
    setCurrent(key);
    setCurrentCategory(key === "ALL" ? null : key);
  };

  return (
    <nav className={styles.tab_menu}>
      {Object.entries<CategoryOption>(items).map(([name, value]) => (
        <div
          key={value}
          className={`${styles.container} ${current === value && styles.active}`}
          onClick={() => filterCategory(value)}
        >
          {name}
        </div>
      ))}
    </nav>
  );
}
