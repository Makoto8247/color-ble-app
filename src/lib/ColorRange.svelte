<script lang="ts">
export let title = "Label";
export let colorState = "red";
let colorRange = 0;
const minRange = 0;
const maxRange = 255;

</script>
<div class="flexbox">
    <h2 class="{colorState}">{title}</h2>
    <input type="range" min={minRange} max={maxRange} bind:value={colorRange}>
    
    <p class="{colorState}">{colorRange}</p>
</div>

<style lang="scss">
.flexbox {
    display: flex;
    flex-direction: column;
    width: fit-content;

    .red {
        color: red;
    }

    .green {
        color: lightgreen;
    }

    .blue {
        color: blue;
    }
}
h2 {
    font-size: 2em;
    text-align: center;
}

input[type=range] {
    margin: 0;
    appearance: slider-vertical;
    height: 200px;
    width: auto;
}

p {
    text-align: center;
}
</style>