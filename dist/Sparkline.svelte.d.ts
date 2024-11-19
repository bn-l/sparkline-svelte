type Datum = number | {
    label: string;
    value: number;
};
type Options = {
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
};
type Props = {
    data: Datum[];
    options?: Options;
};
declare const Sparkline: import("svelte").Component<Props, {}, "">;
type Sparkline = ReturnType<typeof Sparkline>;
export default Sparkline;
