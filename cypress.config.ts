import { defineConfig } from "cypress";
import { env } from "./src/env.mjs";
const { GoogleSocialLogin } = require("cypress-social-logins").plugins

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
  },
  defaultCommandTimeout: 10000,
});
