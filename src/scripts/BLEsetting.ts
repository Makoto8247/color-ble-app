import { Device, type DeviceInfo } from "@capacitor/device";
import { BleClient, numberToUUID, type BleDevice } from "@capacitor-community/bluetooth-le";

const COLOR_BLE_SERVICE = numberToUUID(0xabcd);
const COLOR_BLE_CHARACTERISTIC = "00001234-1000-8000-00805f9b34fb";

export class BLEsetting {
    private devInfo: DeviceInfo | undefined;
    private device: BleDevice | undefined;
    public  statusFlg: number;

    constructor() {
        this.statusFlg = 0;
    }

    public async init() {
        await this.logDeviceInfo();
        await this.bleInitialize(this.devInfo?.platform);
        this.statusFlg = 1;
    }

    public async onConnect() {
        if (this.statusFlg === 1){
            await BleClient.connect(
                this.device!.deviceId,
                (deviceId) => this.onDisconnect(deviceId)
            );
            this.statusFlg = 2;
        }
    }

    public onDisconnect(deviceId: string) {
        this.statusFlg = 1;
    }

    private async logDeviceInfo() {
        this.devInfo = await Device.getInfo();
    }

    private async bleInitialize(platform?: string) {
        if (platform == "android") {
            await BleClient.initialize({ androidNeverForLocation: true });
        } else if(platform == "ios"){
            await BleClient.initialize();
        }

        this.device = await BleClient.requestDevice({
            services: [COLOR_BLE_SERVICE],
        });
    }
}

