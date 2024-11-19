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
        onmousemove?: (event: MouseEvent, datapoint: DataPoint) => void;
        onmouseout?: (event: MouseEvent) => void;
        spotRadius?: number;
        cursorWidth?: number;
        interactive?: boolean;
        width?: number;
        height?: number;
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
        width: 100,
        height: 30,
        strokeWidth: 3,
        spotRadius: 2,
        lineColor: "#FF476F",
        spotColor: "#FF335F",
        fillColor: "#FF7593",
        cursorColor: "#752133",
    }
    options = {...defaultOptions, ...options};

    const spotRadius: number = options.spotRadius ?? 2;
    const spotDiameter: number = spotRadius * 2;
    const interactive: boolean = ('interactive' in options) ? options.interactive! : !!options.onmousemove;

    // SVG dimensions
    let svgWidth: number = options.width!;
    let svgHeight: number = options.height!;
    let strokeWidth: number = options.strokeWidth!;

    // Fetch function
    const fetch: (entry: any) => number = options.fetch ?? ((entry: any): number => {
        if (typeof entry === 'number') {
            return entry;
        } else if ('value' in entry) {
            return entry.value;
        } else {
            throw new Error('Invalid data entry');
        }
    });

    // Reactive computations
    let values: number[] = $derived.by(() => data.map(fetch));

    let maxValue: number = $derived.by(() => Math.max(...values));

    let datapoints: DataPoint[] = $derived.by(() => {
        if (values.length <= 1) return [];
        const width = svgWidth - spotDiameter * 2;
        const height = svgHeight - (strokeWidth * 2) - spotDiameter;
        return values.map((value, index) => {
            let x = (index / (values.length - 1)) * width + spotDiameter;
            let y = svgHeight - ((value / maxValue) * height) - (strokeWidth + spotRadius);
            return { x, y, value, index };
        });
    });

    let pathCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return '';
        }
        return 'M ' + datapoints.map(d => `${d.x} ${d.y}`).join(' L ');
    });

    let fillCoords: string = $derived.by(() => {
        if (datapoints.length <= 1) {
            return '';
        }
        return `${pathCoords} V ${svgHeight} L ${datapoints[0].x} ${svgHeight} Z`;
    });

    // Interactive elements
    let cursorX = $state(-1000);
    let spotX = $state(-1000);
    let spotY = $state(-1000);

    function onMouseMove(event: MouseEvent) {
        const svgRect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
        const mouseX = event.clientX - svgRect.left;

        const mouseRelativeX = (mouseX / svgRect.width) * svgWidth;

        let nextDataPoint = datapoints.find(entry => entry.x >= mouseRelativeX);

        if (!nextDataPoint) {
            nextDataPoint = datapoints[datapoints.length - 1];
        }

        const previousIndex = datapoints.indexOf(nextDataPoint) - 1;
        const previousDataPoint = previousIndex >= 0 ? datapoints[previousIndex] : undefined;
        let currentDataPoint: DataPoint;
        let halfway: number;

        if (previousDataPoint) {
            halfway = previousDataPoint.x + ((nextDataPoint.x - previousDataPoint.x) / 2);
            currentDataPoint = mouseRelativeX >= halfway ? nextDataPoint : previousDataPoint;
        } else {
            currentDataPoint = nextDataPoint;
        }

        const { x, y } = currentDataPoint;

        spotX = x;
        spotY = y;

        cursorX = x;

        if (options?.onmousemove) {
            options.onmousemove(event, currentDataPoint);
        }
    }

    function onMouseOut(event: MouseEvent) {
        cursorX = -1000;
        spotX = -1000;
        spotY = -1000;

        if (options?.onmouseout) {
            options.onmouseout(event);
        }
    }
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<svg
    class="sparkline"
    width="100%"
    height="100%"
    viewBox="0 0 {svgWidth} {svgHeight}"
    preserveAspectRatio="none"
    stroke-width="{strokeWidth}"
    aria-hidden="true"
    onmousemove={interactive ? onMouseMove : null}
    onmouseout={interactive ? onMouseOut : null}
    style="fill: none;"
>
    <path style="fill: {options.fillColor}" d="{fillCoords}" stroke="none" />
    <path style="stroke: {options.lineColor}" d="{pathCoords}" fill="none" />

    {#if interactive}
        <line
            style="stroke: {options.cursorColor};"
            x1="{cursorX}"
            x2="{cursorX}"
            y1="0"
            y2="{svgHeight}"
            stroke-width="{options.cursorWidth ?? 2}"
        />

        <circle
            style="stroke: {options.spotColor}; fill: {options.spotColor}"
            cx="{spotX}"
            cy="{spotY}"
            r="{spotRadius}"
        />
    {/if}
</svg>

<style>


</style>
