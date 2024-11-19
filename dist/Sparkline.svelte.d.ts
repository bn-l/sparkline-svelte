export type Datum = number | {
    label: string;
    value: number;
};
export interface DataPoint {
    x: number;
    y: number;
    value: number;
    index: number;
    label?: string;
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
type $$ComponentProps = Props & {
    cursorData?: DataPoint | null;
};
declare const Sparkline: import("svelte").Component<$$ComponentProps, {}, "cursorData">;
type Sparkline = ReturnType<typeof Sparkline>;
export default Sparkline;
