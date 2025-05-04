export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  transform: {},
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/test/**/*.test.jsx"], // 👈 this matches your folder structure
};
