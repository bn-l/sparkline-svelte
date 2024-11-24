<svg
    id="sparkline-svg"
    class={dOptions?.svgClass}
    width={dOptions?.width}
    height={dOptions?.height}
    viewBox="0 0 {svgWidth} {svgHeight}"
    preserveAspectRatio="none"
    stroke-width={dOptions?.strokeWidth}
    aria-hidden="true"
    role="img"
    bind:clientWidth={svgWidth}
    bind:clientHeight={svgHeight}
    bind:this={svgEl}
    onmousemove={interactive ? onMouseMove : null}
    onmouseleave={interactive ? onMouseLeave : null}
    ontouchmove={interactive ? onTouchMove : null}
    ontouchend={interactive ? onTouchEnd : null}
    style="fill: none; touch-action: none;"
>
    <!-- Fill -->
    {#if !dOptions?.noFill}
        <path
            id="sparkline-fill-path"
            style="fill: {fillColor};"
            d={fillCoords}
            stroke={fillColor}
        />
    {/if}

    <!-- Graph Line -->
    <path
        id="sparkline-line-path"
        style="stroke: {lineColor};"
        d={lineCoords}
        fill="none"
        stroke-linecap="square"
        shape-rendering="geometricPrecision"
    />

    {#if interactive && !mouseOut}
        <!-- Cursor -->
        <line
            id="sparkline-cursor-line"
            style="stroke: {cursorColor};"
            x1={spotX}
            x2={spotX}
            y1="0"
            y2={svgHeight}
            stroke-width={dOptions.cursorWidth}
        />
        <!-- Tooltip -->
        {#if dOptions?.showTooltip}
            <foreignObject
                id="sparkline-tooltip-foreign-object"
                x={tooltipX}
                y={tooltipY}
                width={tooltipBorderBoxSize?.[0]?.inlineSize ?? 0}
                height={tooltipBorderBoxSize?.[0]?.blockSize ?? 0}
            >
                <div
                    id="sparkline-tooltip-text"
                    class="{dOptions?.toolTipClass ??
                        'tooltip-class'} tooltip-defaults"
                    style=" background-color: {tooltipFillColor}; color: {tooltipTextColor};  font-size: {dOptions?.tooltipFontSize}; border: 0rem solid {lineColor}; max-width: {svgWidth}px;"
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
        font-family: Arial, Helvetica, sans-serif;
    }

    /* Used for defaults */
    #sparkline-tooltip-text {
        width: -moz-max-content;
        width: max-content;
        height: -moz-max-content;
        height: max-content;
        display: inline-flex;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    #sparkline-svg {
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
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
        label?: string;
    }

    export interface Options {
        fetch?: (entry: any) => number;
        width?: string;
        height?: string;
        spotRadius?: number;
        cursorWidth?: number;
        interactive?: boolean;
        strokeWidth?: number;
        ariaLabel?: string;
        lineColor?: string;
        fillColor?: string;
        noFill?: boolean;
        invertFill?: boolean;
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
        height: "100%",
        width: "100%",
        strokeWidth: 6,
        spotRadius: 2,
        tooltipFontSize: "0.875rem",
        showTooltip: true,
        cursorWidth: 3,
    };
    let dOptions = $derived({ ...defaultOptions, ...options });

    const spotDiameter: number = $derived(dOptions.spotRadius! * 2);
    const interactive: boolean = $derived(Boolean(dOptions?.interactive));

    let svgWidth = $state(0);
    let svgHeight = $state(0);

    // prettier-ignore
    function getColor(base: Colord | string, changeAmount: number, invertColor: boolean) {
        base = typeof base === "string" ? colord(base) : base;
        return base.isDark() !== invertColor
            ? base.darken(changeAmount)
            : base.lighten(changeAmount);
    }

    // ------------------ COLOR CALC ------------------

    // prettier-ignore
    const { lineColor, fillColor, cursorColor, tooltipFillColor, tooltipTextColor } = $derived.by(() => {
        const lineColord = dOptions?.lineColor
        ? colord(dOptions.lineColor)
        : colord("#FF476F");
        const fillColor = dOptions?.fillColor ?? getColor(lineColord, 0.2, dOptions?.invertFill ?? false).toHex();
        const cursorColor = dOptions?.cursorColor ?? getColor(lineColord, 0.1, true).toHex();
        const tooltipFillColor =
            dOptions?.tooltipFillColor ?? getColor(fillColor, 0.1, false).toHex();
        const tooltipTextColor =
            dOptions?.tooltipTextColor ?? getColor(tooltipFillColor, 0.6, true).toHex();
        const lineColor = lineColord.toHex();

        // prettier-ignore
        return { lineColor, fillColor, cursorColor, tooltipFillColor, tooltipTextColor };
    });

    // ------------------ CALC COORDS ------------------

    let maxValue: number = $derived.by(() =>
        Math.max(
            ...data.map((entry) =>
                typeof entry === "number" ? entry : entry.value,
            ),
        ),
    );

    let datapoints: DataPoint[] = $derived.by(() => {
        if (data.length <= 1 || svgWidth === 0 || svgHeight === 0) return [];

        const xOffset = Math.max(spotDiameter, dOptions.cursorWidth!);
        const yOffset = dOptions.strokeWidth! + dOptions.spotRadius!;

        const width = svgWidth - xOffset * 2;
        const height = svgHeight - yOffset * 2;

        return data.map((entry, index) => {
            const value = typeof entry === "number" ? entry : entry.value;
            const label = typeof entry === "number" ? undefined : entry.label;

            let x = (index / (data.length - 1)) * width + xOffset;
            let y = svgHeight - (value / maxValue) * height - yOffset;
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
        return `${fillPath} V ${svgHeight} L ${datapoints[0].x} ${svgHeight} Z`;
    });

    //  ------------------ CURSOR + TOOLTIP ------------------

    let tooltipBorderBoxSize: ResizeObserverSize[] | null = $state(null);

    let mouseOut = $state(true);

    let clientX: number = $state(0);
    let svgEl: SVGElement;

    let currentDataPoint = $derived.by(() => {
        // NB: Only runs when when the mouse is in the element
        if (mouseOut || !interactive || !svgEl) return null;

        //         svgRect.left   clientX (x mouse pos)
        // --------------|-----------|
        const mouseSvgX = clientX - svgEl.getBoundingClientRect().left;

        let closestDataPoint: DataPoint | null = null;

        for (const datapoint of datapoints) {
            if (
                Math.abs(mouseSvgX - datapoint.x) <
                Math.abs(mouseSvgX - (closestDataPoint?.x ?? Infinity))
            ) {
                closestDataPoint = datapoint;
            }
        }

        return closestDataPoint;
    });

    let [spotX, spotY] = $derived.by(() => {
        if (mouseOut || !currentDataPoint) return [0, 0];
        return [currentDataPoint.x, currentDataPoint.y];
    });

    let [tooltipX, tooltipY] = $derived.by(() => {
        if (mouseOut || !currentDataPoint || !tooltipBorderBoxSize) {
            return [0, 0];
        }

        const tooltipWidth = tooltipBorderBoxSize[0].inlineSize;
        const tooltipHeight = tooltipBorderBoxSize[0].blockSize;
        const spotOffset = dOptions.spotRadius! * 1.1 + 10; // Offset above the spot

        // Initial position
        let x = currentDataPoint.x;
        let y = currentDataPoint.y - spotOffset;

        // Shift tooltip to the center and above the datapoint
        x = x - tooltipWidth / 2;
        y = y - tooltipHeight;

        // Keep within the SVG bounds
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        if (x + tooltipWidth > svgWidth) {
            x = svgWidth - tooltipWidth;
        }

        if (y + tooltipHeight > svgHeight) {
            y = svgHeight - tooltipHeight;
        }

        return [x, y];
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
