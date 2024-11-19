<div class="flex w-full flex-row p-4">
    <!-- Sparkline -->
    <div class="w-[30%]">
        <div style:height style:width>
            <Sparkline
                {data}
                options={{
                    interactive: true,
                    showTooltip: true,
                    lineColor: color,
                    strokeWidth: 8,
                }}
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
                >Slightly faster mate</button
            >

            <button class="btn btn-xs" onclick={() => (color = randomColor())}
                >Random color</button
            >
        </div>
    </div>

    <div class="w-[40%]">
        <div class="text-xs">
            <pre>{code}</pre>
        </div>
    </div>
</div>

<script lang="ts">
    import Sparkline from "$lib/Sparkline.svelte";
    import code from "./+page.svelte?raw";

    let color = $state(randomColor());

    let height = $state("8em");
    let width = $state("25em");

    let demoResponsiveness = $state(false);

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
