
Instructions:

I want to change the following library (sparlines) to be a svelte 5 component.
The component should have the following features:
- Take the date as a prop and inside the component it should update reactively by creating svg inside the component and updating its attribtutes reactively.
- Take an options prop with all the options.

The component should also fill the height and width of its container (without javascript, svg/css should be able to do this).

----------------------------------

This is the api documentation:

API
sparkline(svg, values, options = {})
svg: This is a <svg> reference that must contain three required attributes (width, height, and stroke-width). These attributes are used to calculate the drawing area.
values: You can either provide an array of numbers or an array of objects that respond to .value. If you have a different data structure, see options.fetch.
options: This optional argument allows you to further customize the sparkline. The available options are:
fetch: Use this function to return the value if you have a different data structure that's not natively supported by sparkline.
onmousemove: By setting this callback function, you'll enable the interactive mode (unless you set options.interactive to false). The callback signature is callback(event, datapoint), where datapoint is an object containing the value, x/y coordinates, and the item index.
onmouseout: This callback function is called every time the mouse leaves the SVG area. You can use it to hide things like tooltips.
spotRadius: Set the spot radius. The default is 2.
cursorWidth: Set the cursor width. The default is 2.
interactive: When true, this enables the interactive mode. You don't have to set this option if you're providing a onmousemove callback.
Usage
This is the minimum working example:

<!-- width, height and stroke-width attributes must be defined on the target SVG -->
<svg class="sparkline" width="100" height="30" stroke-width="3"></svg>

<script>
  sparkline(document.querySelector(".sparkline"), [1, 5, 2, 4, 8, 3, 7]);
</script>
You can change the colors by either setting the attributes directly to the SVG element or using CSS, like the following:

/* just the line */
.sparkline {
  stroke: red;
  fill: none;
}

/* line with highlight area */
.sparkline {
  stroke: red;
  fill: rgba(255, 0, 0, .3);
}

/* change the spot color */
.sparkline--spot {
  stroke: blue;
  fill: blue;
}

/* change the cursor color */
.sparkline--cursor {
  stroke: orange;
}

/* style fill area and line colors using specific class name */
.sparkline--fill {
  fill: rgba(255, 0, 0, .3);
}

.sparkline--line {
  stroke: red;
}

----------------------------------

This is entirety of the "sparklines" source code:

function getY(max, height, diff, value) {
  return parseFloat((height - (value * height / max) + diff).toFixed(2));
}

function removeChildren(svg) {
  [...svg.querySelectorAll("*")].forEach(element => svg.removeChild(element));
}

function defaultFetch(entry) {
  return entry.value;
}

function buildElement(tag, attrs) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (let name in attrs) {
    element.setAttribute(name, attrs[name]);
  }

  return element;
}

export function sparkline(svg, entries, options) {
  removeChildren(svg);

  if (entries.length <= 1) {
    return;
  }

  options = options || {};

  if (typeof(entries[0]) === "number") {
    entries = entries.map(entry => {
      return {value: entry};
    });
  }

  // This function will be called whenever the mouse moves
  // over the SVG. You can use it to render something like a
  // tooltip.
  const onmousemove = options.onmousemove;

  // This function will be called whenever the mouse leaves
  // the SVG area. You can use it to hide the tooltip.
  const onmouseout = options.onmouseout;

  // Should we run in interactive mode? If yes, this will handle the
  // cursor and spot position when moving the mouse.
  const interactive = ("interactive" in options) ? options.interactive : !!onmousemove;

  // Define how big should be the spot area.
  const spotRadius = options.spotRadius || 2;
  const spotDiameter = spotRadius * 2;

  // Define how wide should be the cursor area.
  const cursorWidth = options.cursorWidth || 2;

  // Get the stroke width; this is used to compute the
  // rendering offset.
  const strokeWidth = parseFloat(svg.attributes["stroke-width"].value);

  // By default, data must be formatted as an array of numbers or
  // an array of objects with the value key (like `[{value: 1}]`).
  // You can set a custom function to return data for a different
  // data structure.
  const fetch = options.fetch || defaultFetch;

  // Retrieve only values, easing the find for the maximum value.
  const values = entries.map(entry => fetch(entry));

  // The rendering width will account for the spot size.
  const width = parseFloat(svg.attributes.width.value) - spotDiameter * 2;

  // Get the SVG element's full height.
  // This is used
  const fullHeight = parseFloat(svg.attributes.height.value);

  // The rendering height accounts for stroke width and spot size.
  const height = fullHeight - (strokeWidth * 2) - spotDiameter;

  // The maximum value. This is used to calculate the Y coord of
  // each sparkline datapoint.
  const max = Math.max(...values);

  // Some arbitrary value to remove the cursor and spot out of
  // the viewing canvas.
  const offscreen = -1000;

  // Cache the last item index.
  const lastItemIndex = values.length - 1;

  // Calculate the X coord base step.
  const offset = width / lastItemIndex;

  // Hold all datapoints, which is whatever we got as the entry plus
  // x/y coords and the index.
  const datapoints = [];

  // Hold the line coordinates.
  const pathY = getY(max, height, strokeWidth + spotRadius, values[0]);
  let pathCoords = `M${spotDiameter} ${pathY}`;

  values.forEach((value, index) => {
    const x = index * offset + spotDiameter;
    const y = getY(max, height, strokeWidth + spotRadius, value);

    datapoints.push(Object.assign({}, entries[index], {
      index: index,
      x: x,
      y: y
    }));

    pathCoords += ` L ${x} ${y}`;
  });

  const path = buildElement("path", {
    class: "sparkline--line",
    d: pathCoords,
    fill: "none"
  });

  let fillCoords = `${pathCoords} V ${fullHeight} L ${spotDiameter} ${fullHeight} Z`;

  const fill = buildElement("path", {
    class: "sparkline--fill",
    d: fillCoords,
    stroke: "none"
  });

  svg.appendChild(fill);
  svg.appendChild(path);

  if (!interactive) {
    return;
  }

  const cursor = buildElement("line", {
    class: "sparkline--cursor",
    x1: offscreen,
    x2: offscreen,
    y1: 0,
    y2: fullHeight,
    "stroke-width": cursorWidth
  });

  const spot = buildElement("circle", {
    class: "sparkline--spot",
    cx: offscreen,
    cy: offscreen,
    r: spotRadius
  });

  svg.appendChild(cursor);
  svg.appendChild(spot);

  const interactionLayer = buildElement("rect", {
    width: svg.attributes.width.value,
    height: svg.attributes.height.value,
    style: "fill: transparent; stroke: transparent",
    class: "sparkline--interaction-layer",
  });
  svg.appendChild(interactionLayer);

  interactionLayer.addEventListener("mouseout", event => {
    cursor.setAttribute("x1", offscreen);
    cursor.setAttribute("x2", offscreen);

    spot.setAttribute("cx", offscreen);

    if (onmouseout) {
      onmouseout(event);
    }
  });

  interactionLayer.addEventListener("mousemove", event => {
    const mouseX = event.offsetX;

    let nextDataPoint = datapoints.find(entry => {
      return entry.x >= mouseX;
    });

    if (!nextDataPoint) {
      nextDataPoint = datapoints[lastItemIndex];
    }

    let previousDataPoint = datapoints[datapoints.indexOf(nextDataPoint) - 1];
    let currentDataPoint;
    let halfway;

    if (previousDataPoint) {
      halfway = previousDataPoint.x + ((nextDataPoint.x - previousDataPoint.x) / 2);
      currentDataPoint = mouseX >= halfway ? nextDataPoint : previousDataPoint;
    } else {
      currentDataPoint = nextDataPoint;
    }

    const x = currentDataPoint.x;
    const y = currentDataPoint.y;

    spot.setAttribute("cx", x);
    spot.setAttribute("cy", y);

    cursor.setAttribute("x1", x);
    cursor.setAttribute("x2", x);

    if (onmousemove) {
      onmousemove(event, currentDataPoint);
    }
  });
}

export default sparkline;

----------------------------------

For your own reference (and so you do NOT use svelte 4 syntax by mistake) here are snippets from the svelte 5 docs:

# $state • Docs • Svelte
The `$state` rune allows you to create _reactive state_, which means that your UI _reacts_ when it changes.

```
<script>
    let count = $state(0);
</script>

<button onclick={() => count++}>
    clicks: {count}
</button>
```


Unlike other frameworks you may have encountered, there is no API for interacting with state — `count` is just a number, rather than an object or a function, and you can update it like you would update any other variable.

### Deep state[](#Deep-state)

If `$state` is used with an array or a simple object, the result is a deeply reactive _state proxy_. [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) allow Svelte to run code when you read or write properties, including via methods like `array.push(...)`, triggering granular updates.

> Classes like `Set` and `Map` will not be proxied, but Svelte provides reactive implementations for various built-ins like these that can be imported from [`svelte/reactivity`](https://svelte.dev/docs/svelte/svelte-reactivity).

State is proxified recursively until Svelte finds something other than an array or simple object. In a case like this...

```
let todos = $state([
    {
        done: false,
        text: 'add more todos'
    }
]);
```


...modifying an individual todo’s property will trigger updates to anything in your UI that depends on that specific property:

```
todos[0].done = !todos[0].done;
```


If you push a new object to the array, it will also be proxified:

```
todos.push({
    done: false,
    text: 'eat lunch'
});
```


> When you update properties of proxies, the original object is _not_ mutated.

### Classes[](#Classes)

You can also use `$state` in class fields (whether public or private):

```
class Todo {
    done = $state(false);
    text = $state();

    constructor(text) {
        this.text = text;
    }

    reset() {
        this.text = '';
        this.done = false;
    }
}
```


> The compiler transforms `done` and `text` into `get` / `set` methods on the class prototype referencing private fields.

$state.raw[](#$state.raw)


In cases where you don’t want objects and arrays to be deeply reactive you can use `$state.raw`.

State declared with `$state.raw` cannot be mutated; it can only be _reassigned_. In other words, rather than assigning to a property of an object, or using an array method like `push`, replace the object or array altogether if you’d like to update it:

```
let person = $state.raw({
    name: 'Heraclitus',
    age: 49
});

// this will have no effect
person.age += 1;

// this will work, because we're creating a new person
person = {
    name: 'Heraclitus',
    age: 50
};
```


This can improve performance with large arrays and objects that you weren’t planning to mutate anyway, since it avoids the cost of making them reactive. Note that raw state can _contain_ reactive state (for example, a raw array of reactive objects).

$state.snapshot[](#$state.snapshot)


To take a static snapshot of a deeply reactive `$state` proxy, use `$state.snapshot`:

```
<script>
    let counter = $state({ count: 0 });

    function onclick() {
        // Will log `{ count: ... }` rather than `Proxy { ... }`
        console.log($state.snapshot(counter));
    }
</script>
```


This is handy when you want to pass some state to an external library or API that doesn’t expect a proxy, such as `structuredClone`.

# $derived • Docs • Svelte
Derived state is declared with the `$derived` rune:

```
<script>
    let count = $state(0);
    let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
    {doubled}
</button>

<p>{count} doubled is {doubled}</p>
```


The expression inside `$derived(...)` should be free of side-effects. Svelte will disallow state changes (e.g. `count++`) inside derived expressions.

As with `$state`, you can mark class fields as `$derived`.

> Code in Svelte components is only executed once at creation. Without the `$derived` rune, `doubled` would maintain its original value even when `count` changes.

$derived.by[](#$derived.by)


Sometimes you need to create complex derivations that don’t fit inside a short expression. In these cases, you can use `$derived.by` which accepts a function as its argument.

```
<script>
    let numbers = $state([1, 2, 3]);
    let total = $derived.by(() => {
        let total = 0;
        for (const n of numbers) {
            total += n;
        }
        return total;
    });
</script>

<button onclick={() => numbers.push(numbers.length + 1)}>
    {numbers.join(' + ')} = {total}
</button>
```


In essence, `$derived(expression)` is equivalent to `$derived.by(() => expression)`.

Understanding dependencies[](#Understanding-dependencies)


Anything read synchronously inside the `$derived` expression (or `$derived.by` function body) is considered a _dependency_ of the derived state. When the state changes, the derived will be marked as _dirty_ and recalculated when it is next read.

To exempt a piece of state from being treated as a dependency, use [`untrack`](https://svelte.dev/docs/svelte/svelte#untrack).

# $effect • Docs • Svelte
Effects are what make your application _do things_. When Svelte runs an effect function, it tracks which pieces of state (and derived state) are accessed (unless accessed inside [`untrack`](https://svelte.dev/docs/svelte/svelte#untrack)), and re-runs the function when that state later changes.

Most of the effects in a Svelte app are created by Svelte itself — they’re the bits that update the text in `<h1>hello {name}!</h1>` when `name` changes, for example.

But you can also create your own effects with the `$effect` rune, which is useful when you need to synchronize an external system (whether that’s a library, or a `<canvas>` element, or something across a network) with state inside your Svelte app.

> Avoid overusing `$effect`! When you do too much work in effects, code often becomes difficult to understand and maintain. See [when not to use `$effect`](#When-not-to-use-$effect) to learn about alternative approaches.

Your effects run after the component has been mounted to the DOM, and in a [microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) after state changes:

```
<script>
    let size = $state(50);
    let color = $state('#ff3e00');

    let canvas;

    $effect(() => {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // this will re-run whenever `color` or `size` change
        context.fillStyle = color;
        context.fillRect(0, 0, size, size);
    });
</script>

<canvas bind:this={canvas} width="100" height="100" />
```


Re-runs are batched (i.e. changing `color` and `size` in the same moment won’t cause two separate runs), and happen after any DOM updates have been applied.

You can place `$effect` anywhere, not just at the top level of a component, as long as it is called during component initialization (or while a parent effect is active). It is then tied to the lifecycle of the component (or parent effect) and will therefore destroy itself when the component unmounts (or the parent effect is destroyed).

You can return a function from `$effect`, which will run immediately before the effect re-runs, and before it is destroyed.

```
<script>
    let count = $state(0);
    let milliseconds = $state(1000);

    $effect(() => {
        // This will be recreated whenever `milliseconds` changes
        const interval = setInterval(() => {
            count += 1;
        }, milliseconds);

        return () => {
            // if a callback is provided, it will run
            // a) immediately before the effect re-runs
            // b) when the component is destroyed
            clearInterval(interval);
        };
    });
</script>

<h1>{count}</h1>

<button onclick={() => (milliseconds *= 2)}>slower</button>
<button onclick={() => (milliseconds /= 2)}>faster</button>
```


### Understanding dependencies[](#Understanding-dependencies)

`$effect` automatically picks up any reactive values (`$state`, `$derived`, `$props`) that are _synchronously_ read inside its function body and registers them as dependencies. When those dependencies change, the `$effect` schedules a rerun.

Values that are read _asynchronously_ — after an `await` or inside a `setTimeout`, for example — will not be tracked. Here, the canvas will be repainted when `color` changes, but not when `size` changes:

```
$effect(() => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // this will re-run whenever `color` changes...
    context.fillStyle = color;

    setTimeout(() => {
        // ...but not when `size` changes
        context.fillRect(0, 0, size, size);
    }, 0);
});
```


An effect only reruns when the object it reads changes, not when a property inside it changes. (If you want to observe changes _inside_ an object at dev time, you can use [`$inspect`](https://svelte.dev/docs/svelte/$inspect).)

```
<script>
    let state = $state({ value: 0 });
    let derived = $derived({ value: state.value * 2 });

    // this will run once, because `state` is never reassigned (only mutated)
    $effect(() => {
        state;
    });

    // this will run whenever `state.value` changes...
    $effect(() => {
        state.value;
    });

    // ...and so will this, because `derived` is a new object each time
    $effect(() => {
        derived;
    });
</script>

<button onclick={() => (state.value += 1)}>
    {state.value}
</button>

<p>{state.value} doubled is {derived.value}</p>
```


An effect only depends on the values that it read the last time it ran. If `a` is true, changes to `b` will not cause this effect to rerun:

```
$effect(() => {
    console.log('running');

    if (a || b) {
        console.log('inside if block');
    }
});
```


$effect.pre[](#$effect.pre)


In rare cases, you may need to run code _before_ the DOM updates. For this we can use the `$effect.pre` rune:

```
<script>
    import { tick } from 'svelte';

    let div = $state();
    let messages = $state([]);

    // ...

    $effect.pre(() => {
        if (!div) return; // not yet mounted

        // reference `messages` array length so that this code re-runs whenever it changes
        messages.length;

        // autoscroll when new messages are added
        if (div.offsetHeight + div.scrollTop > div.scrollHeight - 20) {
            tick().then(() => {
                div.scrollTo(0, div.scrollHeight);
            });
        }
    });
</script>

<div bind:this={div}>
    {#each messages as message}
        <p>{message}</p>
    {/each}
</div>
```


Apart from the timing, `$effect.pre` works exactly like `$effect`.

$effect.tracking[](#$effect.tracking)


The `$effect.tracking` rune is an advanced feature that tells you whether or not the code is running inside a tracking context, such as an effect or inside your template :

```
<script>
    console.log('in component setup:', $effect.tracking()); // false

    $effect(() => {
        console.log('in effect:', $effect.tracking()); // true
    });
</script>

<p>in template: {$effect.tracking()}</p> <!-- true -->
```


This allows you to (for example) add things like subscriptions without causing memory leaks, by putting them in child effects. Here’s a `readable` function that listens to changes from a callback function as long as it’s inside a tracking context:

```
import { tick } from 'svelte';

export default function readable<T>(
    initial_value: T,
    start: (callback: (update: (v: T) => T) => T) => () => void
) {
    let value = $state(initial_value);

    let subscribers = 0;
    let stop: null | (() => void) = null;

    return {
        get value() {
            // If in a tracking context ...
            if ($effect.tracking()) {
                $effect(() => {
                    // ...and there's no subscribers yet...
                    if (subscribers === 0) {
                        // ...invoke the function and listen to changes to update state
                        stop = start((fn) => (value = fn(value)));
                    }

                    subscribers++;

                    // The return callback is called once a listener unlistens
                    return () => {
                        tick().then(() => {
                            subscribers--;
                            // If it was the last subscriber...
                            if (subscribers === 0) {
                                // ...stop listening to changes
                                stop?.();
                                stop = null;
                            }
                        });
                    };
                });
            }

            return value;
        }
    };
}
```


$effect.root[](#$effect.root)


The `$effect.root` rune is an advanced feature that creates a non-tracked scope that doesn’t auto-cleanup. This is useful for nested effects that you want to manually control. This rune also allows for the creation of effects outside of the component initialisation phase.

```
<script>
    let count = $state(0);

    const cleanup = $effect.root(() => {
        $effect(() => {
            console.log(count);
        });

        return () => {
            console.log('effect root cleanup');
        };
    });
</script>
```


When not to use $effect[](#When-not-to-use-$effect)


In general, `$effect` is best considered something of an escape hatch — useful for things like analytics and direct DOM manipulation — rather than a tool you should use frequently. In particular, avoid using it to synchronise state. Instead of this...

```
<script>
    let count = $state(0);
    let doubled = $state();

    // don't do this!
    $effect(() => {
        doubled = count * 2;
    });
</script>
```


...do this:

```
<script>
    let count = $state(0);
    let doubled = $derived(count * 2);
</script>
```


> For things that are more complicated than a simple expression like `count * 2`, you can also use `$derived.by`.

You might be tempted to do something convoluted with effects to link one value to another. The following example shows two inputs for “money spent” and “money left” that are connected to each other. If you update one, the other should update accordingly. Don’t use effects for this:

```
<script>
    let total = 100;
    let spent = $state(0);
    let left = $state(total);

    $effect(() => {
        left = total - spent;
    });

    $effect(() => {
        spent = total - left;
    });
</script>

<label>
    <input type="range" bind:value={spent} max={total} />
    {spent}/{total} spent
</label>

<label>
    <input type="range" bind:value={left} max={total} />
    {left}/{total} left
</label>
```


Instead, use callbacks where possible:

```
<script>
    let total = 100;
    let spent = $state(0);
    let left = $state(total);

    function updateSpent(e) {
        spent = +e.target.value;
        left = total - spent;
    }

    function updateLeft(e) {
        left = +e.target.value;
        spent = total - left;
    }
</script>

<label>
    <input type="range" value={spent} oninput={updateSpent} max={total} />
    {spent}/{total} spent
</label>

<label>
    <input type="range" value={left} oninput={updateLeft} max={total} />
    {left}/{total} left
</label>
```


If you need to use bindings, for whatever reason (for example when you want some kind of “writable `$derived`”), consider using getters and setters to synchronise state:

```
<script>
    let total = 100;
    let spent = $state(0);

    let left = {
        get value() {
            return total - spent;
        },
        set value(v) {
            spent = total - v;
        }
    };
</script>

<label>
    <input type="range" bind:value={spent} max={total} />
    {spent}/{total} spent
</label>

<label>
    <input type="range" bind:value={left.value} max={total} />
    {left.value}/{total} left
</label>
```


If you absolutely have to update `$state` within an effect and run into an infinite loop because you read and write to the same `$state`, use [untrack](https://svelte.dev/docs/svelte/svelte#untrack).

# $props • Docs • Svelte
The inputs to a component are referred to as _props_, which is short for _properties_. You pass props to components just like you pass attributes to elements:

App

```
<script>
    import MyComponent from './MyComponent.svelte';
</script>

<MyComponent adjective="cool" />
```


On the other side, inside `MyComponent.svelte`, we can receive props with the `$props` rune...

MyComponent

```
<script>
    let props = $props();
</script>

<p>this component is {props.adjective}</p>
```


...though more commonly, you’ll [_destructure_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) your props:

MyComponent

```
<script>
    let { adjective } = $props();
</script>

<p>this component is {adjective}</p>
```


Fallback values[](#Fallback-values)


Destructuring allows us to declare fallback values, which are used if the parent component does not set a given prop:

```
let { adjective = 'happy' } = $props();
```


> Fallback values are not turned into reactive state proxies (see [Updating props](#Updating-props) for more info)

Renaming props[](#Renaming-props)


We can also use the destructuring assignment to rename props, which is necessary if they’re invalid identifiers, or a JavaScript keyword like `super`:

```
let { super: trouper = 'lights are gonna find me' } = $props();
```


Rest props[](#Rest-props)


Finally, we can use a _rest property_ to get, well, the rest of the props:

```
let { a, b, c, ...others } = $props();
```


Updating props[](#Updating-props)


References to a prop inside a component update when the prop itself updates — when `count` changes in `App.svelte`, it will also change inside `Child.svelte`. But the child component is able to temporarily override the prop value, which can be useful for unsaved ephemeral state :

App

```
<script>
    import Child from './Child.svelte';

    let count = $state(0);
</script>

<button onclick={() => (count += 1)}>
    clicks (parent): {count}
</button>

<Child {count} />
```


Child

```
<script>
    let { count } = $props();
</script>

<button onclick={() => (count += 1)}>
    clicks (child): {count}
</button>
```


While you can temporarily _reassign_ props, you should not _mutate_ props unless they are [bindable](https://svelte.dev/docs/svelte/$bindable).

If the prop is a regular object, the mutation will have no effect:

App

```
<script>
    import Child from './Child.svelte';
</script>

<Child object={{ count: 0 }} />
```


Child

```
<script>
    let { object } = $props();
</script>

<button onclick={() => {
    // has no effect
    object.count += 1
}}>
    clicks: {object.count}
</button>
```


If the prop is a reactive state proxy, however, then mutations _will_ have an effect but you will see an [`ownership_invalid_mutation`](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-ownership_invalid_mutation) warning, because the component is mutating state that does not ‘belong’ to it:

App

```
<script>
    import Child from './Child.svelte';

    let object = $state({count: 0});
</script>

<Child {object} />
```


Child

```
<script>
    let { object } = $props();
</script>

<button onclick={() => {
    // will cause the count below to update,
    // but with a warning. Don't mutate
    // objects you don't own!
    object.count += 1
}}>
    clicks: {object.count}
</button>
```


The fallback value of a prop not declared with `$bindable` is left untouched — it is not turned into a reactive state proxy — meaning mutations will not cause updates

Child

```
<script>
    let { object = { count: 0 } } = $props();
</script>

<button onclick={() => {
    // has no effect if the fallback value is used
    object.count += 1
}}>
    clicks: {object.count}
</button>
```


In summary: don’t mutate props. Either use callback props to communicate changes, or — if parent and child should share the same object — use the [`$bindable`](https://svelte.dev/docs/svelte/$bindable) rune.

Type safety[](#Type-safety)


You can add type safety to your components by annotating your props, as you would with any other variable declaration. In TypeScript that might look like this...

```
<script lang="ts">
    let { adjective }: { adjective: string } = $props();
</script>
```


...while in JSDoc you can do this:

```
<script>
    /** @type {{ adjective: string }} */
    let { adjective } = $props();
</script>
```


You can, of course, separate the type declaration from the annotation:

```
<script lang="ts">
    interface Props {
        adjective: string;
    }

    let { adjective }: Props = $props();
</script>
```


Adding types is recommended, as it ensures that people using your component can easily discover which props they should provide.

# {#snippet ...} • Docs • Svelte
```
{#snippet name()}...{/snippet}
```


```
{#snippet name(param1, param2, paramN)}...{/snippet}
```


Snippets, and render tags, are a way to create reusable chunks of markup inside your components. Instead of writing duplicative code like this...

```
{#each images as image}
    {#if image.href}
        <a href={image.href}>
            <figure>
                <img src={image.src} alt={image.caption} width={image.width} height={image.height} />
                <figcaption>{image.caption}</figcaption>
            </figure>
        </a>
    {:else}
        <figure>
            <img src={image.src} alt={image.caption} width={image.width} height={image.height} />
            <figcaption>{image.caption}</figcaption>
        </figure>
    {/if}
{/each}
```


...you can write this:

```
{#snippet figure(image)}
    <figure>
        <img src={image.src} alt={image.caption} width={image.width} height={image.height} />
        <figcaption>{image.caption}</figcaption>
    </figure>
{/snippet}

{#each images as image}
    {#if image.href}
        <a href={image.href}>
            {@render figure(image)}
        </a>
    {:else}
        {@render figure(image)}
    {/if}
{/each}
```


Like function declarations, snippets can have an arbitrary number of parameters, which can have default values, and you can destructure each parameter. You cannot use rest parameters, however.

Snippet scope[](#Snippet-scope)


Snippets can be declared anywhere inside your component. They can reference values declared outside themselves, for example in the `<script>` tag or in `{#each ...}` blocks (demo)...

```
<script>
    let { message = `it's great to see you!` } = $props();
</script>

{#snippet hello(name)}
    <p>hello {name}! {message}!</p>
{/snippet}

{@render hello('alice')}
{@render hello('bob')}
```


...and they are ‘visible’ to everything in the same lexical scope (i.e. siblings, and children of those siblings):

```
<div>
    {#snippet x()}
        {#snippet y()}...{/snippet}

        <!-- this is fine -->
        {@render y()}
    {/snippet}

    <!-- this will error, as `y` is not in scope -->
    {@render y()}
</div>

<!-- this will also error, as `x` is not in scope -->
{@render x()}
```


Snippets can reference themselves and each other (demo):

```
{#snippet blastoff()}
    <span>🚀</span>
{/snippet}

{#snippet countdown(n)}
    {#if n > 0}
        <span>{n}...</span>
        {@render countdown(n - 1)}
    {:else}
        {@render blastoff()}
    {/if}
{/snippet}

{@render countdown(10)}
```


Passing snippets to components[](#Passing-snippets-to-components)


Within the template, snippets are values just like any other. As such, they can be passed to components as props (demo):

```
<script>
    import Table from './Table.svelte';

    const fruits = [
        { name: 'apples', qty: 5, price: 2 },
        { name: 'bananas', qty: 10, price: 1 },
        { name: 'cherries', qty: 20, price: 0.5 }
    ];
</script>

{#snippet header()}
    <th>fruit</th>
    <th>qty</th>
    <th>price</th>
    <th>total</th>
{/snippet}

{#snippet row(d)}
    <td>{d.name}</td>
    <td>{d.qty}</td>
    <td>{d.price}</td>
    <td>{d.qty * d.price}</td>
{/snippet}

<Table data={fruits} {header} {row} />
```


Think about it like passing content instead of data to a component. The concept is similar to slots in web components.

As an authoring convenience, snippets declared directly _inside_ a component implicitly become props _on_ the component (demo):

```
<!-- this is semantically the same as the above -->
<Table data={fruits}>
    {#snippet header()}
        <th>fruit</th>
        <th>qty</th>
        <th>price</th>
        <th>total</th>
    {/snippet}

    {#snippet row(d)}
        <td>{d.name}</td>
        <td>{d.qty}</td>
        <td>{d.price}</td>
        <td>{d.qty * d.price}</td>
    {/snippet}
</Table>
```


Any content inside the component tags that is _not_ a snippet declaration implicitly becomes part of the `children` snippet (demo):

App

```
<Button>click me<Button>
```


Button

```
<script>
    let { children } = $props();
</script>

<!-- result will be <button>click me</button> -->
<button>{@render children()}</button>
```


> Note that you cannot have a prop called `children` if you also have content inside the component — for this reason, you should avoid having props with that name

You can declare snippet props as being optional. You can either use optional chaining to not render anything if the snippet isn’t set...

```
<script>
    let { children } = $props();
</script>

{@render children?.()}
```


...or use an `#if` block to render fallback content:

```
<script>
    let { children } = $props();
</script>

{#if children}
    {@render children()}
{:else}
    fallback content
{/if}
```


Typing snippets[](#Typing-snippets)


Snippets implement the `Snippet` interface imported from `'svelte'`:

```
<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        data: any[];
        children: Snippet;
        row: Snippet<[any]>;
    }

    let { data, children, row }: Props = $props();
</script>
```


With this change, red squigglies will appear if you try and use the component without providing a `data` prop and a `row` snippet. Notice that the type argument provided to `Snippet` is a tuple, since snippets can have multiple parameters.

We can tighten things up further by declaring a generic, so that `data` and `row` refer to the same type:

```
<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';

    let {
        data,
        children,
        row
    }: {
        data: T[];
        children: Snippet;
        row: Snippet<[T]>;
    } = $props();
</script>
```


Programmatic snippets[](#Programmatic-snippets)


Snippets can be created programmatically with the `createRawSnippet` API. This is intended for advanced use cases.

Snippets and slots[](#Snippets-and-slots)


In Svelte 4, content can be passed to components using slots. Snippets are more powerful and flexible, and as such slots are deprecated in Svelte 5.


# {@render ...} • Docs • Svelte
To render a snippet, use a `{@render ...}` tag.

```
{#snippet sum(a, b)}
    <p>{a} + {b} = {a + b}</p>
{/snippet}

{@render sum(1, 2)}
{@render sum(3, 4)}
{@render sum(5, 6)}
```


The expression can be an identifier like `sum`, or an arbitrary JavaScript expression:

```
{@render (cool ? coolSnippet : lameSnippet)()}
```


Optional snippets[](#Optional-snippets)


If the snippet is potentially undefined — for example, because it’s an incoming prop — then you can use optional chaining to only render it when it _is_ defined:

Alternatively, use an `{#if ...}` block with an `:else` clause to render fallback content:

```
{#if children}
    {@render children()}
{:else}
    <p>fallback content</p>
{/if}
```
