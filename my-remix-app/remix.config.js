/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
    serverBuildPath: "build/index.js",
    ignoredRouteFiles: ["**/*.test.{js,jsx,ts,tsx}"],
    devServerPort: 8002,
};