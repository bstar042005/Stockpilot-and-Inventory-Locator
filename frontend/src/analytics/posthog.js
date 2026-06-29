import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,

  autocapture: true,
  capture_pageview: true,
  capture_pageleave: true,

  persistence: "localStorage",

  person_profiles: "identified_only",
});

export default posthog;