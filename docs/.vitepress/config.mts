import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MERN Deployment",
  description:
    "Complete end-to-end guide for deploying MERN applications using Docker, VPS, Nginx, Cloudflare, and CI/CD.",
  head: [
    // Basic SEO
    [
      "meta",
      {
        name: "keywords",
        content:
          "MERN, Docker, VPS, Nginx, Cloudflare, CI/CD, GitHub Actions, MongoDB, Express, React, Node.js, Deployment Guide",
      },
    ],
    ["meta", { name: "author", content: "Codex" }],
    ["meta", { name: "robots", content: "index, follow" }],

    // Open Graph (Social Sharing)
    [
      "meta",
      { property: "og:title", content: "Deploy MERN App to VPS Using Docker" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "A complete guide to deploying MERN apps using Docker, VPS, Nginx, Cloudflare, and automated CI/CD pipelines.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://yourdomain.com" }],
    [
      "meta",
      { property: "og:image", content: "https://yourdomain.com/og-image.png" },
    ], // Replace with your image

    // Twitter Cards
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      { name: "twitter:title", content: "Deploy MERN App to VPS Using Docker" },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "A complete deployment guide for MERN stack applications.",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://yourdomain.com/og-image.png" },
    ], // Replace with your image

    // Theme + Icons
    ["meta", { name: "theme-color", content: "#0ea5e9" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    logo: "/logo.png",

    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/deploy/introduction" },
    ],

    sidebar: [
      {
        text: "🚀 Deployment Guide",
        items: [
          { text: "Introduction", link: "/deploy/introduction" },
          { text: "Prerequisites", link: "/deploy/prerequisites" },
          { text: "ESBuild", link: "/deploy/esbuild" },
          { text: "Dockerize the MERN App", link: "/deploy/dockerize" },
          { text: "Push to Docker Hub", link: "/deploy/docker-hub" },
          { text: "Prepare the VPS", link: "/deploy/vps-setup" },
          { text: "Docker Compose Setup", link: "/deploy/compose" },
          { text: "Cloudflare DNS Setup", link: "/deploy/cloudflare-dns" },
          { text: "Nginx Reverse Proxy", link: "/deploy/nginx" },
          { text: "CI/CD with GitHub Actions", link: "/deploy/cicd" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/JpMayor1" }],
  },
});
