"use client";

import { useEffect } from "react";
import { DataSeeder } from "@/lib/data/Seeder";

export default function InitSeed() {
  useEffect(() => {
    DataSeeder.seedData();
  }, []);
  return null;
}
