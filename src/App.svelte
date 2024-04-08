<script lang="ts">
import Header from "./lib/Header.svelte";
import Footer from "./lib/Footer.svelte";
import ColorRange from "./lib/ColorRange.svelte";
import { BLEsetting } from "./scripts/BLEsetting";

const bleSetting = new BLEsetting();
let bleInit = bleSetting.init();
let bleConnect = bleSetting.onConnect();
let bleDisconnect = bleSetting.onDisconnect();

let setRed = 0;
let setGreen = 0;
let setBlue = 0;

$:bleSetting.sleep(150).then(() => bleSetting.onWriteColorCode(setRed, setGreen, setBlue).then());

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

function tryBleDisconnect() {
    bleDisconnect = bleSetting.onDisconnect();
}

</script>

<Header />
<div class="main">
    {#await bleInit}
        <p>Loading...</p>
        <div hidden>{tryBleInit}</div>
    {:then}
        {#if bleFlg === 1}
            <p>Waiting for connection.</p>
            <button on:click={tryBleConnect}>Connect</button>
        {:else if bleFlg === 2}
            <p>Connected</p>
            <button on:click={tryBleDisconnect}>Disconnect</button>
        {:else if bleFlg === 3}
            <p>Writing Now</p>
            <button on:click={tryBleDisconnect}>Disconnect</button>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
    {#if bleFlg === 0}
        <button on:click={tryBleInit}>Init Start.</button>
    {/if}
    <div class="colorRanges">
        <ColorRange title="Red" colorState="red" bind:colorRange={setRed} />
        <ColorRange title="Green" colorState="green" bind:colorRange={setGreen} />
        <ColorRange title="Blue" colorState="blue" bind:colorRange={setBlue} />
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
