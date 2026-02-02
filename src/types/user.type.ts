import type { User } from "better-auth";

export type UserType = User & {
  phone?: string;
  password?: string;
  role: "user" | "admin";
  region_city: string;
  education: string;
  specialty: string;
  workplace: string;
  jobTitle: string;
};
