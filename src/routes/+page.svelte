<div class="container">
    <h1>Page</h1>

    <div class="h-40 w-96">
        <Sparkline
            {data}
            options={{
                interactive: true,
            }}
        />
    </div>
</div>

<script lang="ts">
    import Sparkline from "$lib/Sparkline.svelte";

    let data = $state([2, 3, 4, 5, 6, 1, 3, 4, 5, 8, 10]);

    $effect(() => {
        const interval = setInterval(() => {
            data.push(Math.floor(Math.random() * 10));
            data.shift();
        }, 1000);

        return () => clearInterval(interval);
    });
</script>
