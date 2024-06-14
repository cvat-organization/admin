export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/sample",
        icon: "home-2.svg",
      },
      {
        id: 2,
        title: "Users",
        url: "/users",
        icon: "profile-2.svg",
        subItems: [
          {
            id: 1,
            title: "Search User",
            url: "/users/search",
          },
          {
            id: 2,
            title: "View User",
            url: "/users/view",
          },
          {
            id: 3,
            title: "View Daily User Activities",
            url: "/users/activities",
          },
          {
            id: 4,
            title: "View User Challenges",
            url: "/users/challenges",
          },
        ],
      },
      {
        id: 4,
        title: "Vendor",
        url: "/vendor/onboarding",
        icon: "vendor.svg",
        subItems: [
          {
            id: 1,
            title: "Search Vendor",
            url: "/vendor/search",
          },
          {
            id: 2,
            title: "Modify Vendor Details",
            url: "/vendor/modify",
          },
          {
            id: 3,
            title: "Create Vendor Details",
            url: "/vendor/create",
          },
          {
            id: 4,
            title: "Reset Vendor Password",
            url: "/vendor/reset-password",
          },
        ],
      },
      {
        id: 5,
        title: "Activity",
        url: "/activities",
        icon: "activity.svg",
        subItems: [
          {
            id: 1,
            title: "Search Activity",
            url: "/activities/search",
          },
          {
            id: 2,
            title: "View Activity",
            url: "/activities/view",
          },
        ],
      },
      {
        id: 6,
        title: "Challenge",
        url: "/challenges",
        icon: "challenge-icon.svg",
        subItems: [
          {
            id: 1,
            title: "Search Challenge",
            url: "/challenges/search",
          },
          {
            id: 2,
            title: "View Challenge",
            url: "/challenges/view",
          },
          {
            id: 3,
            title: "View Vendor who Created the Challenge",
            url: "/challenges/vendor",
          },
          {
            id: 4,
            title: "View Users Participated in Challenge",
            url: "/challenges/participants",
          },
        ],
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

