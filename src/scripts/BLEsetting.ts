import { Device, type DeviceInfo } from "@capacitor/device";
import { BleClient, numbersToDataView, numberToUUID, type BleDevice } from "@capacitor-community/bluetooth-le";
import { get, writable, type Writable} from "svelte/store";

const COLOR_BLE_SERVICE = numberToUUID(0xabcd);
const COLOR_BLE_CHARACTERISTIC = numberToUUID(0x1234);

export class BLEsetting {
    private devInfo: DeviceInfo | undefined;
    private device: BleDevice | undefined;
    public  statusFlg: Writable<number>;

    constructor() {
        this.statusFlg = writable(0);
    }

    public async init() {
        await this.logDeviceInfo();
        await this.bleInitialize(this.devInfo?.platform);
        this.statusFlg.set(1);
    }

    public async onConnect() {
        if (get(this.statusFlg) === 1){
            await BleClient.connect(
                this.device!.deviceId,
                () => this.onDisconnect()
            );
            this.statusFlg.set(2);
        }
    }

    public async onDisconnect() {
        if(get(this.statusFlg) === 2){
            await BleClient.disconnect(this.device!.deviceId);
        }
        this.statusFlg.set(1);
    }

    public async onWriteColorCode(red: number, green: number, blue: number) {
        if(get(this.statusFlg) === 2) {
            try{
                this.statusFlg.set(3);
                await BleClient.write(
                    this.device!.deviceId,
                    COLOR_BLE_SERVICE,
                    COLOR_BLE_CHARACTERISTIC,
                    numbersToDataView([red, green, blue])
                );
                this.statusFlg.set(2);
            }catch{
                this.statusFlg.set(2);
                await this.onDisconnect();
            }
        }
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

    public sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

