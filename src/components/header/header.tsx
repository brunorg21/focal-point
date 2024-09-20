import Image from "next/image";
import logo from "../../assets/logo.svg";
import companyName from "../../assets/company-name.svg";
import styles from "./header.module.scss";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <Image alt="Logo" src={logo} width={33} height={33} />
        <Image
          alt="Company name"
          src={companyName}
          width={106.4}
          height={15.5}
        />
      </div>

      <span className={styles.message}>Bem-vindo de volta, Marcus</span>
      <span className={styles.date}>
        {new Date()
          .toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
          })
          .replace(/^\w/, (c) => c.toUpperCase())}
      </span>
    </div>
  );
}
