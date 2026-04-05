import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";

const NETLIFY_BUILD_HOOK = process.env.NEXT_PUBLIC_NETLIFY_BUILD_HOOK || "";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  cmsCallback: (cms) => {
    if (NETLIFY_BUILD_HOOK) {
      cms.plugins.add({
        __type: "screen",
        name: "Deploy to Production",
        layout: "fullscreen",
        Component: () => {
          const React = require("react");
          const [status, setStatus] = React.useState("idle");

          const triggerDeploy = async () => {
            setStatus("deploying");
            try {
              const res = await fetch(NETLIFY_BUILD_HOOK, { method: "POST" });
              if (res.ok) {
                setStatus("success");
              } else {
                setStatus("error");
              }
            } catch {
              setStatus("error");
            }
          };

          return React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                padding: "40px",
                fontFamily: "Inter, system-ui, sans-serif",
              },
            },
            React.createElement("h2", { style: { fontSize: "24px", fontWeight: 600, margin: 0 } }, "Deploy to Production"),
            React.createElement(
              "p",
              { style: { color: "#666", maxWidth: "400px", textAlign: "center", lineHeight: 1.5 } },
              "Make all your content changes first, then click deploy to publish everything at once."
            ),
            React.createElement(
              "button",
              {
                onClick: triggerDeploy,
                disabled: status === "deploying",
                style: {
                  padding: "12px 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: status === "deploying" ? "#999" : "#0070f3",
                  border: "none",
                  borderRadius: "8px",
                  cursor: status === "deploying" ? "not-allowed" : "pointer",
                  marginTop: "8px",
                },
              },
              status === "idle" ? "Deploy Now" : status === "deploying" ? "Deploying..." : status === "success" ? "Deploy Triggered!" : "Error - Try Again"
            ),
            status === "success" &&
              React.createElement(
                "p",
                { style: { color: "#16a34a", fontSize: "14px" } },
                "Build started. Your site will be live in 1-2 minutes."
              ),
            status === "error" &&
              React.createElement(
                "p",
                { style: { color: "#dc2626", fontSize: "14px" } },
                "Failed to trigger deploy. Check your build hook URL."
              )
          );
        },
      });
    }
    return cms;
  },
  schema: {
    collections: [Page, Post, Author, Tag, Global],
  },
});

export default config;
