<script lang="ts">
export let title = "Label";
let colorRange = 0;
const minRange = 0;
const maxRange = 255;

</script>
<div class="flexbox">
    <h2>{title}</h2>
    <input type="range" min={minRange} max={maxRange} bind:value={colorRange}>
    
    <p>{colorRange}</p>
</div>

<style>
.flexbox {
    display: flex;
    flex-direction: column;
    width: fit-content;
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