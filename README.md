# Sparkline

A lightweight and customizable Sparkline component for Svelte 5, based on [fnando/sparkline](https://github.com/fnando/sparkline), with various improvements and updates.

This library creates a small responsive graph (a sparkline) without axis labels for data visualization. It is ideal for displaying trends and patterns in data in a compact form--making it good for use in dashboards, reports, etc. The SVG output scales to fit its container for responsiveness on different screen sizes.

Changes to the data prop or any option will update the SVG reactively (with svelte 5 managing the SVG dom updates).

## Installation

Install the package via npm:

```bash
`npm install sparkline-svelte`
```

## Usage


### Basic Example

```svelte
<script>
    import Sparkline from "sparkline-svelte"; 
</script>

<Sparkline data={[5, 10, 15, 10, 5]} />
```

## Props

The `Sparkline` component accepts the following props (only the **`options.lineColor`** prop 
is needed to change all the colors automatically. The other options can be mostly ignored):

### `data` (required)

- **Type**: `number[] | { label: string; value: number }[]`
- **Description**: An array of numbers or objects containing `label` and `value` properties, representing the data points to plot. By supplying a `label`, you can provide any label for the values, and they will be displayed on the tooltip as `label: ${value}` when hovering over the sparkline.

### `options` (optional)

- **Type**: `Object`
- **Description**: An object to customize the appearance and behavior of the sparkline.

#### Options Properties:

- `lineColor`
    - **Type**: `string`
    - **Default**: `#FF476F`
    - **Description**: The color of the sparkline line. Setting this will automatically adjust related colors (`fillColor`, `cursorColor`, `tooltipFillColor`, `tooltipTextColor`) based on the provided `lineColor`.

- `fillColor`
    - **Type**: `string`
    - **Default**: A lighter shade based on `lineColor`
    - **Description**: The fill color under the sparkline.

- `cursorColor`    
    - **Type**: `string`
    - **Default**: A contrasting color based on `lineColor`
    - **Description**: The color of the cursor line when hovering over the sparkline.

- `strokeWidth`
    - **Type**: `number`
    - **Default**: `6`
    - **Description**: The width of the sparkline line.

- `spotRadius`
    - **Type**: `number`
    - **Default**: `2`
    - **Description**: The radius of the spots (data points) on the sparkline.

- `interactive`
    - **Type**: `boolean`
    - **Default**: `false`
    - **Description**: Enables cursor and tooltip on hover when set to `true`.

- `showTooltip`
    - **Type**: `boolean`
    - **Default**: `true`
    - **Description**: Shows tooltip with data point information on hover.


- `tooltipTextColor`
    
    - **Type**: `string`
    - **Default**: Based on `tooltipFillColor`
    - **Description**: The text color of the tooltip.

- `tooltipFillColor`
    - **Type**: `string`
    - **Default**: A contrasting color based on `fillColor`
    - **Description**: The background color of the tooltip.

- `tooltipFontSize`
    - **Type**: `string`
    - **Default**: `"0.875rem"`
    - **Description**: The font size of the tooltip text.

- `cursorWidth`
    - **Type**: `number`
    - **Default**: `2`
    - **Description**: The width of the cursor line.

- `svgClass`
    - **Type**: `string`
    - **Default**: `""`
    - **Description**: CSS class to apply to the SVG element.

- `toolTipClass`
    - **Type**: `string`
    - **Default**: `"tooltip-class"`
    - **Description**: CSS class to apply to the tooltip element.


For example:

```svelte
<Sparkline {data} options={{ lineColor: "#3498db" }} />
```

This will set the sparkline line to a blue color (`#3498db`), and the component will automatically adjust the fill, cursor, and tooltip colors based on this color.

## Examples

### Static Data Example

```svelte
<script>     
    import Sparkline from "sparkline-svelte";      
    let data = [         
        { label: "Jan", value: 10 },         
        { label: "Feb", value: 15 },         
        { label: "Mar", value: 12 },         
        { label: "Apr", value: 20 },         
        { label: "May", value: 18 }     
        ]; 
</script>  

<Sparkline {data} options={{ lineColor: "#27ae60", interactive: true }} />
```

In this example, by supplying a `label` for each data point, the tooltip will display the label and value as `label: ${value}` when hovering over the sparkline.

### Reactive Data Updates

```svelte
<script>     
    import Sparkline from "sparkline-svelte";      
    let data = $state([]);      
    // Simulate data updates     
    let interval;      
    $effect(() => {         
        interval = setInterval(() => {             
            let value = Math.floor(Math.random() * 100);             
            data.push(value);             

            // Keep only the last 10 data points             
            if (data.length > 10) {                 
                data.shift();             
            }         
        }, 1000);          
  
        return () => clearInterval(interval);     
    }); 
</script>  

<Sparkline {data} options={{ lineColor: "#e74c3c", interactive: true }} />
```

The graph will reactively update as the data prop is updated.

## License

[MIT](LICENSE)