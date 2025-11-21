# ESBuild Configuration

This is an example ESBuild setup for bundling a Node.js backend written in TypeScript.

## `esbuild.config.ts`

```ts
import { build } from "esbuild";
import path from "path";
import fs from "fs";

await build({
  entryPoints: ["src/index.ts"],
  outfile: "bundle/index.js",
  platform: "node",
  target: "node20",
  format: "cjs",
  bundle: true,
  minify: true,
  sourcemap: true,
  legalComments: "none",
  define: { "process.env.NODE_ENV": '"production"' },

  // Alias "@" to src folder
  alias: {
    "@": path.resolve(process.cwd(), "src"),
  },

  // Do not bundle optional MongoDB native dependencies
  external: [
    "kerberos",
    "@mongodb-js/zstd",
    "@aws-sdk/credential-providers",
    "gcp-metadata",
    "snappy",
    "socks",
    "aws4",
    "mongodb-client-encryption",
    "fsevents",
  ],

  logLevel: "info",
});

// ---- Copy .env.production → bundle/.env ----
const srcEnv = path.resolve(process.cwd(), ".env.production");
const destEnv = path.resolve(process.cwd(), "bundle", ".env");

try {
  fs.copyFileSync(srcEnv, destEnv);
  console.log(`✅ Copied ${srcEnv} → ${destEnv}`);
} catch (err) {
  console.warn(`⚠️ Could not copy ${srcEnv}:`, err.message);
}
```

## Notes

- Output is bundled into `bundle/index.js`
- Aliases allow imports like `@/utils/...`
- External list prevents unnecessary native modules from breaking the build
- Copies `.env.production` automatically into the final bundle folder
