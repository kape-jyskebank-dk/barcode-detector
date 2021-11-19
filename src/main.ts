class BarcodeRunner {
    private videoElement?: HTMLVideoElement;
    private mediaStream?: MediaStream;
    private barcodeDetector?: any;

    public async start(): Promise<void> {
        if (this.videoElement != undefined) return;

        this.barcodeDetector = new window.BarcodeDetector();

        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: 'environment' } },
        });

        this.videoElement = document.createElement('video');
        this.videoElement.srcObject = this.mediaStream;
        this.videoElement.autoplay = true;
        this.videoElement.addEventListener('play', () => this.detect());

        document.body.appendChild(this.videoElement);
    }

    public stop(): void {
        if (this.videoElement == undefined) throw new Error('Video element not found');
        if (this.mediaStream == undefined) throw new Error('Media stream not found');

        document.body.removeChild(this.videoElement);

        this.videoElement = undefined;

        this.mediaStream.getTracks().forEach((track) => track.stop());

        this.barcodeDetector = undefined;
    }

    private async detect(): Promise<void> {
        if (this.videoElement == undefined) throw new Error('Video element not found');
        if (this.barcodeDetector == undefined) throw new Error('Barcode detector not found');

        const barcodes: { rawValue: string }[] = await this.barcodeDetector.detect(this.videoElement);
        const barcodeValue: string = barcodes.map<string>((barcode) => barcode.rawValue).join('\n');

        if (barcodeValue === '') {
            requestAnimationFrame(() => this.detect());
        } else {
            this.stop();
            alert(barcodeValue);
        }
    }
}
