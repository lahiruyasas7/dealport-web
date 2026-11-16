import { ActiveUsersCardProps } from "@/components/dashboard/active-users-card";

export const activeUsersMock: Omit<ActiveUsersCardProps, "onViewInsight"> = {
  activeUsers: 21500,
  perMinute: [
    35, 17, 22, 9, 28, 22, 17, 31, 6, 14, 22, 9, 28, 4, 19, 25, 14, 28, 22, 6,
    22, 11, 28, 35, 14, 22, 6, 25, 35,
  ],
  countries: [
    {
      code: "us",
      country: "US",
      sales: 30000,
      change: 25.8,
      share: 42,
      flagSrc: "/flags/us.svg",
    },
    {
      code: "br",
      country: "Brazil",
      sales: 30000,
      change: -15.8,
      share: 30,
      flagSrc: "/flags/br.svg",
    },
    {
      code: "au",
      country: "Australia",
      sales: 25000,
      change: 35.8,
      share: 50,
      flagSrc: "/flags/au.svg",
    },
  ],
};
