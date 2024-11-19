<svg
    class={dOptions?.svgClass}
    width="100%"
    height="100%"
    viewBox="0 0 {actualWidth} {actualHeight}"
    preserveAspectRatio="none"
    stroke-width={dOptions?.strokeWidth}
    aria-hidden="true"
    bind:clientWidth={actualWidth}
    bind:clientHeight={actualHeight}
    bind:this={svgEl}
    onmousemove={interactive ? onMouseMove : null}
    onmouseleave={interactive ? onMouseLeave : null}
    ontouchmove={interactive ? onTouchMove : null}
    ontouchend={interactive ? onTouchEnd : null}
    style="fill: none; touch-action: none;"
>
    <!-- Fill -->
    <path
        style="fill: {fillColor}; d: path('{fillCoords}');"
        stroke={fillColor}
    />

    <!-- Graph Line -->
    <path
        style="stroke: {lineColor}; d: path('{lineCoords}');"
        fill="none"
        stroke-linecap="square"
    />

    {#if interactive && !mouseOut}
        <!-- Cursor -->
        <line
            style="stroke: {cursorColor};"
            x1={spotX}
            x2={spotX}
            y1="0"
            y2={actualHeight}
            stroke-width={dOptions.cursorWidth}
        />
        <!-- Tooltip -->
        {#if dOptions?.showTooltip}
            <foreignObject
                x={tooltipRectX}
                y={tooltipRectY}
                width={tooltipBorderBoxSize?.[0]?.inlineSize ?? 0}
                height={tooltipBorderBoxSize?.[0]?.blockSize ?? 0}
            >
                <div
                    class={dOptions?.toolTipClass ?? "tooltip-class"}
                    style="width: max-content; height: max-content; display: inline-flex; background-color: {tooltipFillColor}; color: {tooltipTextColor}; user-select: none; font-size: {dOptions?.tooltipFontSize}; border: 0rem solid {lineColor}; max-width: {actualWidth}px;"
                    bind:borderBoxSize={tooltipBorderBoxSize}
                >
                    {currentDataPoint?.label
                        ? `${currentDataPoint?.label}: ${currentDataPoint.value}`
                        : `${currentDataPoint?.value}`}
                </div>
            </foreignObject>
        {/if}
    {/if}
</svg>

<style>
    .tooltip-class {
        padding: 0.1em 0.4rem;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        font-weight: 600;
        text-align: center;
    }

    path {
        transition: d 0ms;
        /* stroke-linecap: round; */
        stroke-linejoin: round;
    }
</style>

<script module lang="ts">
    export type Datum = number | { label: string; value: number };

    export interface DataPoint {
        x: number;
        y: number;
        value: number;
        index: number;
        label?: string; // Make label optional
    }

    export interface Options {
        fetch?: (entry: any) => number;
        spotRadius?: number;
        cursorWidth?: number;
        interactive?: boolean;
        strokeWidth?: number;
        ariaLabel?: string;
        lineColor?: string;
        fillColor?: string;
        cursorColor?: string;
        showTooltip?: boolean;
        tooltipTextColor?: string;
        tooltipFillColor?: string;
        tooltipFontSize?: string;
        svgClass?: string;
        toolTipClass?: string;
    }

    export interface Props {
        data: Datum[];
        options?: Options;
    }
</script>

<script lang="ts">
    import { colord, type Colord } from "colord";

    //  ------------------ SET UP ------------------

    let {
        data,
        options,
        cursorData = $bindable(null),
    }: Props & { cursorData?: DataPoint | null } = $props();

    const defaultOptions: Partial<Options> = {
        strokeWidth: 6,
        spotRadius: 2,
        tooltipFontSize: "0.875rem",
        showTooltip: true,
        cursorWidth: 3,
    };
    let dOptions = $derived({ ...defaultOptions, ...options });

    // prettier-ignore
    function getColor(base: Colord | string, changeAmount: number, invertColor: boolean) {
        base = typeof base === "string" ? colord(base) : base;
        return base.isDark() !== invertColor
            ? base.darken(changeAmount)
            : base.lighten(changeAmount);
    }

    // prettier-ignore
    const { lineColor, fillColor, cursorColor, tooltipFillColor, tooltipTextColor } = $derived.by(() => {
        const lineColord = dOptions?.lineColor
        ? colord(dOptions.lineColor)
        : colord("#FF476F");
        const fillColor = dOptions?.fillColor ?? getColor(lineColord, 0.2, false).toHex();
        const cursorColor = dOptions?.cursorColor ?? getColor(lineColord, 0.1, true).toHex();
        const tooltipFillColor =
            dOptions?.tooltipFillColor ?? getColor(fillColor, 0.1, false).toHex();
        const tooltipTextColor =
            dOptions?.tooltipTextColor ?? getColor(tooltipFillColor, 0.6, true).toHex();
        const lineColor = lineColord.toHex();

        // prettier-ignore
        return { lineColor, fillColor, cursorColor, tooltipFillColor, tooltipTextColor };
    });

    const spotDiameter: number = $derived(dOptions.spotRadius! * 2);
    const interactive: boolean = $derived(Boolean(dOptions?.interactive));

    // Update maxValue calculation to handle both numbers and objects
    let maxValue: number = $derived.by(() =>
        Math.max(
            ...data.map((entry) =>
                typeof entry === "number" ? entry : entry.value,
            ),
        ),
    );

    let actualWidth = $state(0);
    let actualHeight = $state(0);

    let datapoints: DataPoint[] = $derived.by(() => {
        if (data.length <= 1 || actualWidth === 0 || actualHeight === 0)
            return [];

        const width = actualWidth - spotDiameter * 2;
        const height = actualHeight - dOptions.strokeWidth! * 2 - spotDiameter;

        return data.map((entry, index) => {
            const value = typeof entry === "number" ? entry : entry.value;
            const label =
                typeof entry === "number" ? String(entry) : entry.label;

            let x = (index / (data.length - 1)) * width + spotDiameter;
            let y =
                actualHeight -
                (value / maxValue) * height -
                (dOptions.strokeWidth! + dOptions.spotRadius!);
            return { x, y, value, label, index };
        });
    });

    let lineCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return "";
        }
        return "M " + datapoints.map((d) => `${d.x} ${d.y}`).join(" L ");
    });

    let fillCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return "";
        }

        // Create a new array of coordinates with adjusted y values
        const adjustedPoints = datapoints.map((d) => ({
            x: d.x,
            y: d.y + dOptions.strokeWidth! / 2, // Add half strokeWidth to lower the fill
        }));

        // Create the fill path using the adjusted points
        const fillPath =
            "M " + adjustedPoints.map((d) => `${d.x} ${d.y}`).join(" L ");
        return `${fillPath} V ${actualHeight} L ${datapoints[0].x} ${actualHeight} Z`;
    });

    //  ------------------ CURSOR + TOOLTIP ------------------

    let tooltipBorderBoxSize: ResizeObserverSize[] | null = $state(null);

    let mouseOut = $state(true);

    let clientX: number = $state(0);
    let svgEl: SVGElement;

    let currentDataPoint = $derived.by(() => {
        if (mouseOut || !interactive || !svgEl) return null;

        const svgRect = svgEl.getBoundingClientRect();
        const mouseX = clientX - svgRect.left;
        const mouseRelativeX = (mouseX / svgRect.width) * actualWidth;

        let nextDataPoint =
            datapoints.find((entry) => entry.x >= mouseRelativeX) ??
            datapoints[datapoints.length - 1];

        const previousIndex = datapoints.indexOf(nextDataPoint) - 1;
        const previousDataPoint = datapoints[previousIndex];

        let currentDataPoint;
        let halfway;

        if (previousDataPoint) {
            halfway =
                previousDataPoint.x +
                (nextDataPoint.x - previousDataPoint.x) / 2;
            currentDataPoint =
                mouseRelativeX >= halfway ? nextDataPoint : previousDataPoint;
        } else {
            currentDataPoint = nextDataPoint;
        }

        return currentDataPoint;
    });

    let [spotX, spotY] = $derived.by(() => {
        if (mouseOut || !currentDataPoint) return [0, 0];
        return [currentDataPoint.x, currentDataPoint.y];
    });

    let [tooltipRectX, tooltipRectY] = $derived.by(() => {
        if (mouseOut || !currentDataPoint || !tooltipBorderBoxSize) {
            return [0, 0];
        }

        // Initial tooltip position
        let tooltipX = currentDataPoint.x;
        let tooltipY = currentDataPoint.y - dOptions.spotRadius! - 10; // Offset above the point

        // Adjust for tooltip dimensions
        let tooltipRectX = tooltipX - tooltipBorderBoxSize[0].inlineSize / 2;
        let tooltipRectY = tooltipY - tooltipBorderBoxSize[0].blockSize;

        // Keep the tooltip within the SVG bounds
        if (tooltipRectX < 0) {
            tooltipRectX = 0;
        }
        if (tooltipRectX + tooltipBorderBoxSize[0].inlineSize > actualWidth) {
            tooltipRectX = actualWidth - tooltipBorderBoxSize[0].inlineSize;
        }
        if (tooltipRectY < 0) {
            tooltipRectY = 0;
        }

        return [tooltipRectX, tooltipRectY];
    });

    $effect(() => {
        if (currentDataPoint !== null) {
            cursorData = currentDataPoint;
        } else {
            cursorData = null;
        }
    });

    function onMouseMove(event: MouseEvent) {
        mouseOut = false;
        clientX = event.clientX;
    }

    function onTouchMove(event: TouchEvent) {
        // event.preventDefault();
        mouseOut = false;
        clientX = event.touches[0].clientX;
    }

    function onTouchEnd(event: TouchEvent) {
        // event.preventDefault();
        mouseOut = true;
    }

    function onMouseLeave(event: MouseEvent) {
        mouseOut = true;
    }
</script>
