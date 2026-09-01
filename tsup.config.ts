import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "common/index": "src/common/index.ts",
    "master/index": "src/master/index.ts",
    "property/index": "src/property/index.ts",
    "content/index": "src/content/index.ts",
    "marketplace/index": "src/marketplace/index.ts",
    "search/index": "src/search/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
});
