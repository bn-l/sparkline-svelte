<div class="flex w-full flex-row flex-wrap p-6">
    <!-- Sparkline -->
    <div class="flex-grow-[0.1] pb-4">
        <div class="max-w-[85vw]" style:height style:width>
            <Sparkline
                {data}
                options={{
                    height: "100em",
                    width: "100em",
                    interactive: true,
                    showTooltip: true,
                    lineColor: color,
                }}
                bind:cursorData={cursorInfo}
            />
        </div>

        <div class="flex flex-wrap gap-2 pt-4">
            <button
                class="btn btn-xs"
                onclick={() => (demoResponsiveness = true)}
                >Demo responsiveness</button
            >

            <button class="btn btn-xs" onclick={() => (period = 2000)}
                >Start updating</button
            >
            <button class="btn btn-xs" onclick={() => (period = 10)}
                >A tiny bit faster --thanks</button
            >

            <button class="btn btn-xs" onclick={() => (color = randomColor())}
                >Random color</button
            >
        </div>

        <div class="mb-10 h-4 text-lg">
            Binding:
            {#if cursorInfo}
                <p>
                    {cursorInfo?.label}: {cursorInfo?.value}
                </p>
            {/if}
        </div>
    </div>

    <div class="flex-grow-[0.7] pt-1">
        <div class="text-xs">
            <pre>{code}</pre>
        </div>
    </div>
</div>

<script lang="ts">
    import { Sparkline } from "$lib/index.js";
    import type { DataPoint } from "$lib/Sparkline.svelte";
    import code from "./+page.svelte?raw";

    let color = $state(randomColor());

    let height = $state("8em");
    let width = $state("25em");

    let demoResponsiveness = $state(false);

    let cursorInfo: DataPoint | null = $state(null);

    function randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let monthIndex = 10;

    let data = $state(
        months.slice(0, 10).map((month) => ({
            label: month,
            value: Math.floor(Math.random() * 1000),
        })),
    );

    let period = $state(1000000);

    $effect(() => {
        const interval = setInterval(() => {
            const month = months[monthIndex % months.length];
            monthIndex++;

            data.push({
                label: month,
                value: Math.floor(Math.random() * 100),
            });
            data.shift();
        }, period);

        return () => clearInterval(interval);
    });

    $effect(() => {
        if (demoResponsiveness) {
            height = "2em";
            width = "7.5em";
        }
    });
</script>
