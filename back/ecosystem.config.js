module.exports = {
  apps: [
    {
      name: "gstock",
      script: "./dist/server.js",
      env: {
        NODE_ENV: "production",
        GS_PORT: 3333,
      },
    },
  ],
};
