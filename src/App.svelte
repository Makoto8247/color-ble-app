<script lang="ts">
import Header from "./lib/Header.svelte";
import Footer from "./lib/Footer.svelte";
import ColorRange from "./lib/ColorRange.svelte";
import { BLEsetting } from "./scripts/BLEsetting";

const bleSetting = new BLEsetting();
let bleInit = bleSetting.init();
let bleConnect = bleSetting.onConnect();

let bleFlg = 0;
bleSetting.statusFlg.subscribe(flug => {
    bleFlg = flug;
});

function tryBleInit() {
    bleInit = bleSetting.init()
}

function tryBleConnect() {
    bleConnect = bleSetting.onConnect();
}

</script>

<Header />
<div class="main">
    {#await bleInit}
        <p>Loading...</p>
    {:then}
        {#if bleFlg === 1}
            <p>Complete initial BLE configuration.</p>
            <button on:click={tryBleConnect}>Connect</button>
        {:else if bleFlg === 2}
            <p>Connected</p>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
    {#if bleFlg === 0}
        <button on:click={tryBleInit}>Init Start.</button>
    {/if}
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
