/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const weekDays = [
  {
    day: "Segunda",
    morning: "Pão de queijo G",
    afternoon: "Forrozinho de coco",
  },
  {
    day: "Terça",
    morning: "Pão de queijo G",
    afternoon: "Pão de queijo médio c/ presunto",
  },
  {
    day: "Quarta",
    morning: "Pão de queijo G",
    afternoon: "Forrozinho de coco",
  },
  { day: "Quinta", morning: "Pão de queijo G", afternoon: "Salgado" },
  {
    day: "Sexta",
    morning: "Pão de queijo G",
    afternoon: "Pão de queijo médio c/ presunto",
  },
  { day: "Sábado", morning: "Por escala", afternoon: null },
] as const;

export const peopleByFloor = {
  "Andar de Cima": [
    "Alessandro",
    "Ana Claudia",
    "Ana Marcia",
    "Carlos Roberto",
    "Daniel Freire",
    "Felipe",
    "Gustavo Anchieta",
    "Henrique",
    "Jefferson",
    "Vander Carlos",
    "Evandro Assis",
    "Giovani",
    "Samuel",
    "Selminha",
    "Vantuir Oliveira",
    "Vitor",
    "Cris Cruz",
    "Cristiana Oliveira",
    "Adrian",
  ],
  "Andar de Baixo": [
    "André Aurelio",
    "Breno",
    "Carlos Henrique",
    "Celso",
    "Eduardo",
    "Fernando Silva",
    "Gustavo Aparecido",
    "João Henrique",
    "Kauã",
    "Leonardo Negrini",
    "Mateus Pereira",
    "Pedro Henrique(Cândido)",
    "Pedro Paulo de Assis",
    "Pedro Paulo - Avançado",
    "Thalles Terra",
    "Vitor Hugo",
    "William Siva",
    "Valesca Eliana",
    "Elza",
  ],
} as const;

export const allPeople = [
  ...peopleByFloor["Andar de Cima"],
  ...peopleByFloor["Andar de Baixo"],
] as const;

export type WeekDay = (typeof weekDays)[number]["day"];
export type Period = "Manhã" | "Tarde";
export type Person = (typeof allPeople)[number];
export type Floor = keyof typeof peopleByFloor;

export const attendanceRecordSchema = z.object({
  day: z.enum(["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]),
  period: z.enum(["Manhã", "Tarde"]),
  people: z.array(z.string()),
});

export const saturdayConfigSchema = z.object({
  andarCima: z.number().int().min(0),
  andarBaixo: z.number().int().min(0),
});

export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;
export type SaturdayConfig = z.infer<typeof saturdayConfigSchema>;

export function getFloorForPerson(person: string): Floor | undefined {
  if (peopleByFloor["Andar de Cima"].includes(person as any)) {
    return "Andar de Cima";
  }
  if (peopleByFloor["Andar de Baixo"].includes(person as any)) {
    return "Andar de Baixo";
  }
  return undefined;
}
