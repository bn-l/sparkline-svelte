import { fireEvent, render, screen } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import ResizeObserver from "resize-observer-polyfill";
import { describe, expect, test, beforeEach, afterEach, vi, afterAll } from "vitest";
import Sparkline from "./Sparkline.svelte";
import { mockResizeObserver } from "jsdom-testing-mocks";
import { configMocks } from "jsdom-testing-mocks";

// Configure the mocks with Vitest's afterEach
configMocks({ afterEach, afterAll });

describe("Sparkline", () => {
    let resizeObserver;

    beforeEach(() => {
        vi.useFakeTimers({
            toFake: [
                'setTimeout',
                'clearTimeout',
                'setInterval',
                'clearInterval',
                'setImmediate',
                'clearImmediate',
                'Date',
                'performance',
                'requestAnimationFrame',
                'cancelAnimationFrame',
            ],
        });
        resizeObserver = mockResizeObserver();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    //
    // Basic rendering tests
    describe("rendering", () => {
        test("renders with basic numeric data", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3, 4, 5],
                },
            });
            // SVG should be accessible
            const svg = screen.getByRole("img", { hidden: true });
            expect(svg).toBeInTheDocument();

            // Should contain path elements for line and fill
            expect(container.querySelectorAll("path")).toHaveLength(2);
        });

        test("renders with object data", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [
                        { label: "A", value: 1 },
                        { label: "B", value: 2 },
                    ],
                },
            });

            const svg = screen.getByRole("img", { hidden: true });
            expect(svg).toBeDefined();
        });
    });

    // Interactive features tests
    describe("interactive features", () => {
        test("shows tooltip on hover when interactive", async () => {
            const user = userEvent.setup();
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        interactive: true,
                        showTooltip: true,
                    },
                },
            });

            const svg = screen.getByRole("img", { hidden: true });

            // Move mouse over the SVG
            await user.hover(svg);

            // Check if tooltip appears
            const tooltip = container.querySelector("#sparkline-tooltip-text");
            expect(tooltip).toBeInTheDocument();
        });

        test("hides tooltip on mouse leave", async () => {
            const user = userEvent.setup();
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        interactive: true,
                        showTooltip: true,
                    },
                },
            });

            const svg = screen.getByRole("img", { hidden: true });

            // Move mouse over and out
            await user.hover(svg);
            await user.unhover(svg);

            // Check if tooltip is hidden
            const tooltip = container.querySelector("#sparkline-tooltip-text");
            expect(tooltip).not.toBeInTheDocument();
        });
    });

    // Styling options tests
    describe("styling options", () => {
        test("applies custom colors", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        lineColor: "#ff0000",
                        fillColor: "#00ff00",
                        cursorColor: "#0000ff",
                    },
                },
            });

            const fillPath = container.querySelector("#sparkline-fill-path");
            const linePath = container.querySelector("#sparkline-line-path");

            expect(fillPath).toHaveStyle({ fill: "#00ff00" }); // Fill path
            expect(linePath).toHaveStyle({ stroke: "#ff0000" }); // Line path
        }); 

        test("applies custom stroke width", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: {
                        strokeWidth: 10,
                    },
                },
            });

            const svg = screen.getByRole("img", { hidden: true });
            expect(svg).toHaveAttribute("stroke-width", "10");
        });
    });

    // Data binding tests
    describe("data updates", () => {
        test.only("updates when data changes", async () => {
            const props = $state({ data: [1, 2, 3] });
            const { container } = $derived(render(Sparkline, { props }));
            

            const initialPath = container
                .querySelector("#sparkline-line-path")
                ?.getAttribute("d");

            console.log(initialPath);

            props.data = [4, 5, 6];

            const updatedPath = container
                .querySelector("path")
                ?.getAttribute("d");
            expect(updatedPath).not.toBe(initialPath);
        });
    });

    // Cursor data binding tests
    describe("cursor data binding", () => {
        test("emits cursor data on hover", async () => {
            const user = userEvent.setup();
            let cursorData = $state(null);

            render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                    options: { interactive: true },
                    cursorData,
                },
            });

            const svg = screen.getByRole("img", { hidden: true });

            // Move mouse over SVG
            await user.hover(svg);

            // Check if cursorData was updated
            expect(cursorData).not.toBeNull();
        });
    });

    describe("path coordinates", () => {
        test("renders correct path coordinates", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [0, 50, 100], // Using values that will create predictable coordinates
                    options: {
                        svgWidth: "100", // Fixed width for predictable math
                        svgHeight: "100", // Fixed height for predictable math
                    },
                },
            });

            // Get the line path (second path element - first is fill)
            const linePath = container.querySelectorAll("path")[1];
            const pathData = linePath.getAttribute("d");

            // The path should contain these coordinates (M = move to, L = line to)
            // With height 100 and values [0, 50, 100], y coordinates should be [100, 50, 0]
            // With width 100 and 3 points, x coordinates should be [0, 50, 100]
            expect(pathData).toMatch(
                /M\s*0[\s,]*100\s*L\s*50[\s,]*50\s*L\s*100[\s,]*0/,
            );
        });

        test("updates path when data changes", async () => {
            const { container, component } = render(Sparkline, {
                props: {
                    data: [0, 50],
                    options: {
                        svgWidth: "100",
                        svgHeight: "100",
                    },
                },
            });

            const initialPath = container
                .querySelectorAll("path")[1]
                .getAttribute("d");

            // @ts-expect-error testing
            await component.$set({ data: [0, 100] });

            const updatedPath = container
                .querySelectorAll("path")[1]
                .getAttribute("d");
            expect(updatedPath).not.toBe(initialPath);
        });
    });

    describe("graph bounds", () => {
        test("highest value reaches top of graph", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [0, 50, 100],
                    options: {
                        svgWidth: "100",
                        svgHeight: "100",
                        strokeWidth: 2,
                    },
                },
            });

            const linePath = container.querySelectorAll("path")[1];
            const pathData = linePath.getAttribute("d");

            // The highest point (100) should be at the top of the graph
            // Accounting for strokeWidth/2 padding
            expect(pathData).toContain("0"); // Y coordinate for highest point should be near 0
        });

        test("lowest value reaches bottom of graph", () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [0, 50, 100],
                    options: {
                        svgWidth: "100",
                        svgHeight: "100",
                        strokeWidth: 2,
                    },
                },
            });

            const linePath = container.querySelectorAll("path")[1];
            const pathData = linePath.getAttribute("d");

            // The lowest point (0) should be at the bottom of the graph
            // Accounting for strokeWidth/2 padding
            expect(pathData).toContain("100"); // Y coordinate for lowest point should be near 100
        });
    });

    describe("responsive behavior", () => {
        test("updates dimensions when container resizes", async () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [1, 2, 3],
                },
            });

            const svg = screen.getByRole("img", { hidden: true });
            
            // Mock initial size
            resizeObserver.mockElementSize(svg, {
                contentBoxSize: { inlineSize: 200, blockSize: 100 }
            });

            act(() => {
                resizeObserver.resize();
            });

            const initialPath = container.querySelector("path").getAttribute("d");

            // Mock a resize to a larger size
            resizeObserver.mockElementSize(svg, {
                contentBoxSize: { inlineSize: 400, blockSize: 200 }
            });

            act(() => {
                resizeObserver.resize(svg);
            });

            const updatedPath = container.querySelector("path").getAttribute("d");
            expect(updatedPath).not.toBe(initialPath);
        });

        test("maintains aspect ratio when resized", async () => {
            const { container } = render(Sparkline, {
                props: {
                    data: [0, 50, 100],
                },
            });

            const svg = screen.getByRole("img", { hidden: true });
            
            // Mock initial size
            resizeObserver.mockElementSize(svg, {
                contentBoxSize: { inlineSize: 200, blockSize: 100 }
            });

            act(() => {
                resizeObserver.resize();
            });

            const initialPath = container.querySelector("path").getAttribute("d");
            const initialPoints = initialPath.split(" ").filter(p => p !== "M" && p !== "L");

            // Mock a resize that doubles the size
            resizeObserver.mockElementSize(svg, {
                contentBoxSize: { inlineSize: 400, blockSize: 200 }
            });

            act(() => {
                resizeObserver.resize(svg);
            });

            const updatedPath = container.querySelector("path").getAttribute("d");
            const updatedPoints = updatedPath.split(" ").filter(p => p !== "M" && p !== "L");

            // Check that points scaled proportionally
            expect(updatedPoints.length).toBe(initialPoints.length);
            expect(Number(updatedPoints[0])).toBeCloseTo(Number(initialPoints[0]) * 2);
            expect(Number(updatedPoints[1])).toBeCloseTo(Number(initialPoints[1]) * 2);
        });
    });
});
