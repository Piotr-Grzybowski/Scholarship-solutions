export const routes = {
  "/users/": [
    { rel: "self", method: "GET", href: "/users" },
    { rel: "get single user", method: "GET", href: "/user/:id/" },
    { rel: "self", method: "POST", href: "/users" },
    {
      rel: "delete single user",
      method: "DELETE",
      href: "/users/:id",
    },
    { rel: "edit single user", method: "PUT", href: "/users/:id" },
  ],
  "/users/:id": [
    { rel: "self", method: "GET", href: "/user/:id" },
    { rel: "self", method: "DELETE", href: "/user/:id" },
    { rel: "self", method: "PUT", href: "/user/:id" },

    {
      rel: "get user's channels list",
      method: "GET",
      href: "/user/:id/channels",
    },
    {
      rel: "add channel to the list",
      method: "POST",
      href: "/user/:id/channels",
    },
    { rel: "get single channel", method: "GET", href: "/user/:id/:channelId" },
    {
      rel: "edit single channel",
      method: "PUT",
      href: "/user/:id/:channelId",
    },
    {
      rel: "delete single channel",
      method: "DELETE",
      href: "/user/:id/:channelId",
    },
  ],
  "/users/:id/channels/": [
    { rel: "self", method: "GET", href: "/user/:id/channels" },
    { rel: "self", method: "POST", href: "/user/:id/channels" },
    {
      rel: "get single channel",
      method: "GET",
      href: "/user/:id/channels/:channelId",
    },
    {
      rel: "edit single channel",
      method: "PUT",
      href: "/user/:id/channels/:channelId",
    },
    {
      rel: "delete single channel",
      method: "DELETE",
      href: "/user/:id/:channelId",
    },
  ],
  "/users/:id/channels/:channelId": [
    { rel: "self", method: "GET", href: "/user/:id/:channelId" },
    { rel: "self", method: "PUT", href: "/user/:id/:channelId" },
    { rel: "self", method: "DELETE", href: "/user/:id/:channelId" },
  ],
};
