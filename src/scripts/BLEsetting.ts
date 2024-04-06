import { Device, type DeviceInfo } from "@capacitor/device";
import { BleClient } from "@capacitor-community/bluetooth-le";

export class BLEsetting {
    private devInfo: DeviceInfo | undefined;
    constructor() {
        this.logDeviceInfo().then(() => {
            this.bleInitialize(this.devInfo?.platform);
        });
    }

    private async logDeviceInfo() {
        this.devInfo = await Device.getInfo();
    }

    private async bleInitialize(platform?: string) {
        if (platform == "android") {
            await BleClient.initialize({ androidNeverForLocation: true });
        } else {
            await BleClient.initialize();
        }
    }
}

