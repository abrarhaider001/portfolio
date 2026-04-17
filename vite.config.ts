import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build" || mode === "production";

  return {
    // Prevents esbuild from scanning @tanstack/start-server-core before the Start
    // plugin injects virtual imports (#tanstack-router-entry, etc.). See:
    // https://github.com/TanStack/router/issues/5795
    optimizeDeps: {
      exclude: [
        "@tanstack/start-server-core",
        "@tanstack/start-client-core",
        "@tanstack/react-start",
        "@tanstack/react-start-server",
        "@tanstack/react-start-client",
      ],
    },
    ssr: {
      optimizeDeps: {
        exclude: [
          "@tanstack/start-server-core",
          "@tanstack/start-client-core",
          "@tanstack/react-start",
          "@tanstack/react-start-server",
          "@tanstack/react-start-client",
        ],
      },
    },
    plugins: [
      viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(),
      viteReact(),
      tailwindcss(),
      devtools(),
      nitro(
        isBuild
          ? {
              externals: {
                inline: ["react-reconciler", "its-fine"],
              },
            }
          : undefined
      ),
      contentCollections(),
      mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { dark: "github-dark", light: "github-light" },
              keepBackground: false,
            },
          ],
        ],
        providerImportSource: "@mdx-js/react",
      }),
    ],
  };
});
