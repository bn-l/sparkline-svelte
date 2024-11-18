<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<svg
    class="sparkline"
    width="100%"
    height="100%"
    viewBox="0 0 {actualWidth} {actualHeight}"
    preserveAspectRatio="none"
    stroke-width={strokeWidth}
    aria-hidden="true"
    bind:clientWidth={actualWidth}
    bind:clientHeight={actualHeight}
    bind:this={svgEl}
    onmousemove={interactive ? onMouseMove : null}
    onmouseleave={interactive ? onMouseOut : null}
    style="fill: none;"
>
    <path
        style="fill: {options.fillColor}; d: path('{fillCoords}');"
        stroke="none"
    />
    <path
        style="stroke: {options.lineColor}; d: path('{pathCoords}');"
        fill="none"
    />

    {#if interactive}
        <line
            style="stroke: {options.cursorColor};"
            x1={spotX}
            x2={spotX}
            y1="0"
            y2={actualHeight}
            stroke-width={options.cursorWidth ?? 2}
        />

        <circle
            style="stroke: {options.spotColor}; fill: {options.spotColor}; display: {mouseOut
                ? 'none'
                : 'block'};"
            cx={spotX}
            cy={spotY}
            r={spotRadius}
        />
    {/if}
</svg>

<style>
    path {
        transition: d 0.5s ease-in-out;
    }
    circle {
        transition:
            cx 0.5s ease-in-out,
            cy 0.5s ease-in-out;
    }
</style>

<script lang="ts">
    interface DataEntry {
        value: number;
    }

    interface DataPoint {
        x: number;
        y: number;
        value: number;
        index: number;
    }

    interface Options {
        fetch?: (entry: any) => number;
        spotRadius?: number;
        cursorWidth?: number;
        interactive?: boolean;
        strokeWidth?: number;
        ariaLabel?: string;
        lineColor?: string;
        fillColor?: string;
        spotColor?: string;
        cursorColor?: string;
    }

    interface Props {
        data: number[] | DataEntry[];
        options?: Options;
    }

    let { data, options }: Props = $props();

    const defaultOptions: Partial<Options> = {
        strokeWidth: 6,
        spotRadius: 2,
        lineColor: "#FF476F",
        spotColor: "#FF335F",
        fillColor: "#FF7593",
        cursorColor: "#752133",
    };
    options = { ...defaultOptions, ...options };

    const spotRadius: number = options.spotRadius ?? 2;
    const spotDiameter: number = spotRadius * 2;
    const interactive: boolean = Boolean(options?.interactive);

    let strokeWidth: number = options.strokeWidth!;

    // Fetch function
    const fetch: (entry: any) => number =
        options.fetch ??
        ((entry: any): number => {
            if (typeof entry === "number") {
                return entry;
            } else if ("value" in entry) {
                return entry.value;
            } else {
                throw new Error("Invalid data entry");
            }
        });

    // Reactive computations
    let values: number[] = $derived.by(() => data.map(fetch));

    let maxValue: number = $derived.by(() => Math.max(...values));

    let actualWidth = $state(0);
    let actualHeight = $state(0);

    let datapoints: DataPoint[] = $derived.by(() => {
        if (values.length <= 1 || actualWidth === 0 || actualHeight === 0)
            return [];
        const width = actualWidth - spotDiameter * 2;
        const height = actualHeight - strokeWidth * 2 - spotDiameter;
        return values.map((value, index) => {
            let x = (index / (values.length - 1)) * width + spotDiameter;
            let y =
                actualHeight -
                (value / maxValue) * height -
                (strokeWidth + spotRadius);
            return { x, y, value, index };
        });
    });

    let pathCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return "";
        }
        return "M " + datapoints.map((d) => `${d.x} ${d.y}`).join(" L ");
    });

    let fillCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return "";
        }
        return `${pathCoords} V ${actualHeight} L ${datapoints[0].x} ${actualHeight} Z`;
    });

    // Interactive elements
    let mouseOut = $state(true);

    let clientX: number = $state(0);
    let svgEl: SVGElement;

    let [spotX, spotY] = $derived.by(() => {
        if (mouseOut) return [0, 0];

        const svgRect = svgEl.getBoundingClientRect();
        const mouseX = clientX - svgRect.left;
        const mouseRelativeX = (mouseX / svgRect.width) * actualWidth;

        let nextDataPoint =
            datapoints.find((entry) => entry.x >= mouseRelativeX) ??
            datapoints[datapoints.length - 1];

        const previousIndex = datapoints.indexOf(nextDataPoint) - 1;
        const previousDataPoint = datapoints[previousIndex];

        let currentDataPoint: DataPoint;
        let halfway: number;

        if (previousDataPoint) {
            halfway =
                previousDataPoint.x +
                (nextDataPoint.x - previousDataPoint.x) / 2;
            currentDataPoint =
                mouseRelativeX >= halfway ? nextDataPoint : previousDataPoint;
        } else {
            currentDataPoint = nextDataPoint;
        }

        return [currentDataPoint.x, currentDataPoint.y];
    });

    // $inspect(mouseOut);

    function onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        mouseOut = false;
        clientX = event.clientX;
    }

    function onMouseOut(event: MouseEvent) {
        console.log("mouse out");
        event.stopPropagation();
        mouseOut = true;
    }
</script>
