declare const Prev: import("svelte").Component<{
    data: number[] | {
        value: number;
    }[];
    options?: {
        fetch?: (entry: any) => number;
        onmousemove?: (event: MouseEvent, datapoint: {
            x: number;
            y: number;
            value: number;
            index: number;
        }) => void;
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
    };
}, {}, "">;
type Prev = ReturnType<typeof Prev>;
export default Prev;
