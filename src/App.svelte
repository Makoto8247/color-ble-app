<script lang="ts">
import Header from "./lib/Header.svelte";
import Footer from "./lib/Footer.svelte";
import ColorRange from "./lib/ColorRange.svelte";
import { BLEsetting } from "./scripts/BLEsetting";

const bleSetting = new BLEsetting();
const bleInit = bleSetting.init();

$:bleStatus = bleSetting.statusFlg;

</script>

<Header />
<div class="main">
    {#await bleInit}
        <p>Loading</p>
    {:then}
        <p>{bleStatus}</p>
        {#if bleStatus === 1}
            <button on:click={bleSetting.onConnect}>connect</button>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
    <div class="colorRanges">
        <ColorRange title="Red" colorState="red"/>
        <ColorRange title="Green" colorState="green"/>
        <ColorRange title="Blue" colorState="blue"/>
    </div>
</div>

<Footer />
<style>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}
.colorRanges {
    display: flex;
    flex-direction: row;
}

</style>
