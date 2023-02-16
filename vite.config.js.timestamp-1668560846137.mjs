// vite.config.js
import { createVuePlugin } from "vite-plugin-vue2";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
var __vite_injected_original_dirname = "E:\\project\\\u4EE3\u7801\u5E93\\panda-website";
var vite_config_default = {
  envDir: "./viteEnv",
  plugins: [
    createVuePlugin(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"]
    })
  ],
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8088,
    open: "index.html",
    https: false,
    hot: true,
    disableHostCheck: true,
    force: true,
    proxy: {
      "/api": {
        target: "https://ctc.panda.org.cn/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
    hmr: {},
    watch: {}
  },
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/mixin.scss";'
      }
    }
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXFx1NEVFM1x1NzgwMVx1NUU5M1xcXFxwYW5kYS13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXFx1NEVFM1x1NzgwMVx1NUU5M1xcXFxwYW5kYS13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0LyVFNCVCQiVBMyVFNyVBMCU4MSVFNSVCQSU5My9wYW5kYS13ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgY3JlYXRlVnVlUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tdnVlMidcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50J1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZW52RGlyOicuL3ZpdGVFbnYnLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGNyZWF0ZVZ1ZVBsdWdpbigpLFxyXG4gICAgZXNsaW50UGx1Z2luKHtcclxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi5qcycsICdzcmMvKiovKi52dWUnLCAnc3JjLyouanMnLCAnc3JjLyoudnVlJ11cclxuICAgIH0pXSxcclxuICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTY3MERcdTUyQTFcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcclxuICBwdWJsaWNEaXI6ICdwdWJsaWMnLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAvLyBcdTdBRUZcdTUzRTNcdTUzRjdcclxuICAgIHBvcnQ6IDgwODgsXHJcbiAgICBvcGVuOidpbmRleC5odG1sJyxcclxuICAgIGh0dHBzOiBmYWxzZSxcclxuICAgIGhvdDogdHJ1ZSxcclxuICAgIGRpc2FibGVIb3N0Q2hlY2s6IHRydWUsXHJcbiAgICAvLyBcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZSBcdTVGM0FcdTUyMzZcdTRGN0ZcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkFcclxuICAgIGZvcmNlOiB0cnVlLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9jdGMucGFuZGEub3JnLmNuL2FwaS8nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICB9LFxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBcdTc5ODFcdTc1MjhcdTYyMTZcdTkxNERcdTdGNkUgSE1SIFx1OEZERVx1NjNBNVxyXG4gICAgaG1yOiB7fSxcclxuICAgIC8vIFx1NEYyMFx1OTAxMlx1N0VEOSBjaG9raWRhciBcdTc2ODRcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdTc2RDFcdTg5QzZcdTU2NjhcdTkwMDlcdTk4NzlcclxuICAgIHdhdGNoOiB7fVxyXG4gIH0sXHJcbiAgLy8gXHU2Nzg0XHU1RUZBXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ21vZHVsZXMnLFxyXG4gICAgLy8gXHU2MzA3XHU1QjlBXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIC8vIFx1NjMwN1x1NUI5QVx1NzUxRlx1NjIxMFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NzY4NFx1NUI1OFx1NjUzRVx1OERFRlx1NUY4NFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOntcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvYXNzZXRzL2Nzcy9taXhpbi5zY3NzXCI7J1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1MsU0FBUyx1QkFBdUI7QUFDdFUsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sa0JBQWtCO0FBRnpCLElBQU0sbUNBQW1DO0FBR3pDLElBQU8sc0JBQVE7QUFBQSxFQUNiLFFBQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxJQUNQLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYLFNBQVMsQ0FBQyxlQUFlLGdCQUFnQixZQUFZLFdBQVc7QUFBQSxJQUNsRSxDQUFDO0FBQUEsRUFBQztBQUFBLEVBRUosV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUVOLE1BQU07QUFBQSxJQUNOLE1BQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLEtBQUs7QUFBQSxJQUNMLGtCQUFrQjtBQUFBLElBRWxCLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBRUY7QUFBQSxJQUVBLEtBQUssQ0FBQztBQUFBLElBRU4sT0FBTyxDQUFDO0FBQUEsRUFDVjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBRVIsUUFBUTtBQUFBLElBRVIsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQW9CO0FBQUEsTUFDbEIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
