// Home page
"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Homebanner1 from "@/components/Homebanner1/Homebanner1";
import Homebanner2 from "@/components/Homebanner2/Homebanner2";

export default function Home() {
  return (
    <main className={styles.main}>
      
    <Homebanner1/>
    
    <Homebanner2/>
    </main>
  );
}
