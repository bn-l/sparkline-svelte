import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [sveltekit(), svelteTesting()],
    test: {
        include: ["tests/**/*.{test,spec}.{js,ts}"],
        setupFiles: ["vitest-browser-svelte"],
        testTimeout: 10000,
        browser: {
            enabled: true,
            name: "chromium",
            provider: "playwright",
            // https://playwright.dev
            headless: false,
        },
    },
});
