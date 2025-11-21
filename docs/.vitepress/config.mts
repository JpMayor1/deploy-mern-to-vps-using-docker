import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Deploy MERN App to VPS Using Docker",
  description:
    "Complete end-to-end guide for deploying MERN applications using Docker, VPS, Nginx, Cloudflare, and CI/CD.",

  themeConfig: {
    logo: "/logo.png",

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
