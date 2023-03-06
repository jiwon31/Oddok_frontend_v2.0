import { useRef, useEffect } from "react";
import { SideNavBar, MyGoal, StudyTime, MyRoom, MyAccount } from "components/mypage";
import styles from "./MyPage.module.css";

export default function MyPage() {
  const indexRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const indexNodes = [...indexRef.current!.children].filter((e) => e.children.length === 0);
    indexNodes.map((node, i) =>
      node.addEventListener("click", () => {
        targetRef.current!.children[i]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }),
    );
  }, []);

  return (
    <div className={styles.container}>
      <SideNavBar indexRef={indexRef} />
      <main ref={targetRef}>
        <MyGoal />
        <StudyTime />
        <MyRoom />
        <MyAccount />
      </main>
    </div>
  );
}
