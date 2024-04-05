<script lang="ts">
import Header from "./lib/Header.svelte";
import Footer from "./lib/Footer.svelte";
import ColorRange from "./lib/ColorRange.svelte";
</script>

<Header />
<div class="main">
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
