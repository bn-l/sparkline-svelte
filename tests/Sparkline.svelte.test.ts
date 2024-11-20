/// <reference types="@vitest/browser/providers/playwright" />
/* eslint-disable prefer-const */
import { flushSync } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";
import Sparkline from "../src/lib/Sparkline.svelte";

describe("Sparkline", () => {
    // Basic rendering tests
    describe("rendering", () => {
        //
        test("renders with basic numeric data", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [1, 2, 3, 4, 5],
            });

            // SVG should be accessible
            const svg = rendered.getByRole("img", { includeHidden: true });

            await expect.element(svg).toBeInTheDocument();

            // Should contain path elements for line and fill
            await expect
                .element(svg)
                .toContainElement(
                    rendered.container.querySelector("#sparkline-fill-path"),
                );
        });

        test("renders with object data", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [
                    { label: "A", value: 1 },
                    { label: "B", value: 2 },
                ],
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await expect.element(svg).toBeInTheDocument();
        });
    });

    // Interactive features tests
    describe("interactive features", () => {
        //
        test("shows tooltip on hover when interactive", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [1, 2, 3],
                options: {
                    interactive: true,
                    showTooltip: true,
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await expect.element(svg).toBeInTheDocument();
            await svg.hover();

            const tooltip = rendered.container.querySelector(
                "#sparkline-tooltip-foreign-object",
            );

            expect(tooltip).not.toBeNull();

            await expect.element(tooltip!).toBeInTheDocument();
        });

        test("hides tooltip on mouse leave", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [1, 2, 3],
                options: {
                    interactive: true,
                    showTooltip: true,
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });

            // Move mouse over and out
            await svg.hover();
            await svg.unhover();

            // Check if tooltip is hidden
            await expect
                .element(rendered.container)
                .not.toContainElement(
                    rendered.container.querySelector(
                        "#sparkline-tooltip-foreign-object",
                    ),
                );
        });

        test("shows cursor on hover when interactive", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [1, 2, 3],
                options: {
                    interactive: true,
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await svg.hover();

            const cursorLine = rendered.container.querySelector(
                "#sparkline-cursor-line",
            );

            expect(cursorLine).not.toBeNull();

            await expect.element(cursorLine!).toBeInTheDocument();
        });

        test("hides cursor on mouse leave", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [1, 2, 3],
                options: {
                    interactive: true,
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });

            await svg.hover();
            const cursor = rendered.container.querySelector(
                "#sparkline-cursor-line",
            );

            expect(cursor).not.toBeNull();

            await expect.element(cursor!).toBeInTheDocument();

            await svg.unhover();

            await expect.element(cursor!).not.toBeInTheDocument();
        });

        test("Cursor moves as mouse moves", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        interactive: true,
                        svgWidth: "100px",
                        svgHeight: "100px",
                    },
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await svg.hover();

            const cursor = rendered.container.querySelector(
                "#sparkline-cursor-line",
            );
            // await expect.element(cursor).toBeInTheDocument();

            // Simulate mouse move
            await svg.hover({ position: { x: 0, y: 0 } });
            const cursorPos1x1 = cursor?.getAttribute("x1");

            await svg.hover({ position: { x: 50, y: 50 } });
            const cursorPos2x1 = cursor?.getAttribute("x1");

            expect(cursorPos1x1).not.toBe(cursorPos2x1);
        });

        test("Cursor goes to right position", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        interactive: true,
                        svgWidth: "100px",
                        svgHeight: "100px",
                    },
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await svg.hover();

            const cursor = rendered.container.querySelector(
                "#sparkline-cursor-line",
            );

            expect(cursor).not.toBeNull();

            await expect.element(cursor!).toBeInTheDocument();

            // Simulate mouse move
            await svg.hover({
                clientX: 50,
                clientY: 50,
            });

            // Check cursor position
            await expect.element(cursor!).toHaveAttribute("x1", "50");
            await expect.element(cursor!).toHaveAttribute("x2", "50");
            await expect.element(cursor!).toHaveAttribute("y1", "0");
            await expect.element(cursor!).toHaveAttribute("y2", "100");
        });
    });

    describe("responsive behavior", () => {
        //
        test("SVG expands to fit container", async () => {
            // Container with specific dimensions
            const container = document.createElement("div");
            container.style.width = "100px";
            container.style.height = "100px";
            document.body.appendChild(container);

            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        interactive: true,
                    },
                },
                target: container,
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            await expect.element(svg).toBeInTheDocument();

            const initialViewBox = svg.element().getAttribute("viewBox");

            expect(initialViewBox).toBeDefined();
            expect(initialViewBox).toBe("0 0 100 100");

            svg.element().setAttribute("width", "400px");
            svg.element().setAttribute("height", "200px");

            // Wait for resize to process
            await new Promise((resolve) => setTimeout(resolve, 100));

            const laterViewBox = svg.element().getAttribute("viewBox");
            expect(laterViewBox).toBeDefined();
            expect(laterViewBox).toBe("0 0 400 200");

            expect(laterViewBox).not.toBe(initialViewBox);

            document.body.removeChild(container);
        });
    });

    describe("line and fill positioning", () => {
        test("positions line and fill correctly for basic data", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [0, 50, 100],
                options: {
                    svgWidth: "100px",
                    svgHeight: "100px",
                },
            });

            const svg = rendered.getByRole("img", { includeHidden: true });
            const linePath = rendered.container.querySelector(
                "#sparkline-line-path",
            );
            const fillPath = rendered.container.querySelector(
                "#sparkline-fill-path",
            );

            // Line should start at bottom left and end at top right
            expect(linePath).toHaveAttribute("d", "M 4 92 L 50 50 L 96 8");

            // Fill should follow the same line but close the path at the bottom
            expect(fillPath).toHaveAttribute(
                "d",
                "M 4 95 L 50 53 L 96 11 V 100 L 4 100 Z",
            );
        });

        test("updates line and fill positions when data changes", async () => {
            let data = $state([0, 50, 100]);

            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                props: {
                    data,
                    options: {
                        svgWidth: "100px",
                        svgHeight: "100px",
                    },
                },
            });

            const linePath = rendered.container.querySelector(
                "#sparkline-line-path",
            );
            const fillPath = rendered.container.querySelector(
                "#sparkline-fill-path",
            );

            // Initial positions
            expect(linePath).toHaveAttribute("d", "M 4 92 L 50 50 L 96 8");

            // Change data
            data[0] = 100;
            data[2] = 0;

            await new Promise((resolve) => setTimeout(resolve, 100));

            // Line should now go from top left to bottom right
            expect(linePath).toHaveAttribute("d", "M 4 8 L 50 50 L 96 92");

            // Fill should follow the updated line
            expect(fillPath).toHaveAttribute(
                "d",
                "M 4 11 L 50 53 L 96 95 V 100 L 4 100 Z",
            );
        });

        test("handles data with same values correctly", async () => {
            // @ts-expect-error "vitest-browser-svelte" is using svelte 4 types
            const rendered = render(Sparkline, {
                data: [50, 50, 50],
                options: {
                    svgWidth: "100px",
                    svgHeight: "100px",
                },
            });

            const linePath = rendered.container.querySelector(
                "#sparkline-line-path",
            );
            const fillPath = rendered.container.querySelector(
                "#sparkline-fill-path",
            );

            // Line should be horizontal in the middle
            expect(linePath).toHaveAttribute("d", "M 4 8 L 50 8 L 96 8");

            // Fill should create a rectangle
            expect(fillPath).toHaveAttribute(
                "d",
                "M 4 11 L 50 11 L 96 11 V 100 L 4 100 Z",
            );
        });
    });
});
