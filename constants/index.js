export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Accueil",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Recherche",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activités",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Post",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communautés",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Posts", icon: "/assets/reply.svg" },
  { value: "replies", label: "Réponses", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Posts", icon: "/assets/reply.svg" },
  { value: "members", label: "Membres", icon: "/assets/members.svg" },
  { value: "requests", label: "Demandes", icon: "/assets/request.svg" },
];
