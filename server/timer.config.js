module.exports = {
  apps: [
    {
      name: "timer",
      script: "index.js",
      instances: "max",
      max_memory_restart: "256M",
    },
  ],
};
