import { url } from "inspector";

export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home-2.svg",
      },
      {
        id: 2,
        title: "Users",
        url: "/users/view",
        icon: "profile-2.svg",

      },
      {
        id: 4,
        title: "Vendor",
        url: "/vendor/onboarding",
        icon: "vendor.svg",
      },
      {
        id: 5,
        title: "Activity",
        url: "/activities",
        icon: "activity.svg",
      },
      {
        id: 6,
        title: "Challenge",
        url: "/challenges",
        icon: "challenge-icon.svg"
      },
      {
        id: 7,
        title: "Settings",
        url: "/settings",
        icon: "settings-icon.svg",
      },
    ],
  },
];
