"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function Card({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="card-glass p-6 md:p-7"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <h2 className="font-display text-3xl mb-5">{title}</h2>
      {children}
    </div>
  );
}

export function Calculators() {
  const t = useTranslations("tools");
  const [bmiH, setBmiH] = useState(175);
  const [bmiW, setBmiW] = useState(75);
  const [oneRmW, setOneRmW] = useState(100);
  const [oneRmR, setOneRmR] = useState(5);
  const [macroW, setMacroW] = useState(75);
  const [macroGoal, setMacroGoal] = useState<"cut" | "maintain" | "bulk">(
    "maintain",
  );

  const bmi = useMemo(() => {
    const m = bmiH / 100;
    return bmiW / (m * m);
  }, [bmiH, bmiW]);

  const oneRm = useMemo(
    () => oneRmW * (1 + oneRmR / 30),
    [oneRmW, oneRmR],
  );

  const macros = useMemo(() => {
    const calories =
      macroGoal === "cut"
        ? macroW * 28
        : macroGoal === "bulk"
          ? macroW * 36
          : macroW * 32;
    const protein = Math.round(macroW * 2);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
    return { calories: Math.round(calories), protein, fat, carbs };
  }, [macroW, macroGoal]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card title={t("bmi")} delay={0}>
        <label className="label-forge">{t("height")}</label>
        <input
          type="number"
          className="input-forge mb-4"
          value={bmiH}
          onChange={(e) => setBmiH(Number(e.target.value))}
        />
        <label className="label-forge">{t("weight")}</label>
        <input
          type="number"
          className="input-forge mb-4"
          value={bmiW}
          onChange={(e) => setBmiW(Number(e.target.value))}
        />
        <p className="font-display text-5xl text-accent">{bmi.toFixed(1)}</p>
        <p className="text-sm text-muted mt-2">{t("bmiNote")}</p>
      </Card>

      <Card title={t("oneRm")} delay={80}>
        <label className="label-forge">{t("weightLifted")}</label>
        <input
          type="number"
          className="input-forge mb-4"
          value={oneRmW}
          onChange={(e) => setOneRmW(Number(e.target.value))}
        />
        <label className="label-forge">{t("reps")}</label>
        <input
          type="number"
          className="input-forge mb-4"
          value={oneRmR}
          onChange={(e) => setOneRmR(Number(e.target.value))}
        />
        <p className="font-display text-5xl text-accent">
          {oneRm.toFixed(1)}
          <span className="text-lg text-muted font-sans ml-2">kg</span>
        </p>
        <p className="text-sm text-muted mt-2">{t("oneRmNote")}</p>
      </Card>

      <Card title={t("macros")} delay={160}>
        <label className="label-forge">{t("bodyweight")}</label>
        <input
          type="number"
          className="input-forge mb-4"
          value={macroW}
          onChange={(e) => setMacroW(Number(e.target.value))}
        />
        <label className="label-forge">{t("goal")}</label>
        <select
          className="input-forge mb-4"
          value={macroGoal}
          onChange={(e) =>
            setMacroGoal(e.target.value as "cut" | "maintain" | "bulk")
          }
        >
          <option value="cut">{t("cut")}</option>
          <option value="maintain">{t("maintain")}</option>
          <option value="bulk">{t("bulk")}</option>
        </select>
        <p className="font-display text-4xl text-accent">
          {macros.calories} {t("kcal")}
        </p>
        <p className="mt-3 text-muted text-sm">
          {t("macrosLine", {
            protein: macros.protein,
            carbs: macros.carbs,
            fat: macros.fat,
          })}
        </p>
      </Card>
    </div>
  );
}
