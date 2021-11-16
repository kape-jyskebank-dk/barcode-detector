class BarcodeRunner {
    video;
    output;
    barcodeDetector;
    items;

    constructor(video, output) {
        this.video = video;
        this.output = output;
        console.log(this.video, this.output);
        // this.barcodeDetector = new BarcodeDetector();
        this.barcodeDetector = undefined;
        this.items = [];

        this.init();
    }

    async init() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = mediaStream;
        this.video.autoplay = true;

        // this.renderLoop();
    }

    renderLoop() {
        requestAnimationFrame(() => this.renderLoop());
        this.render();
    }

    render() {
        this.barcodeDetector
            .detect(video)
            .then((barcodes) => {
                barcodes.forEach((barcode) => {
                    if (this.items.includes(barcode.rawValue) === false) {
                        this.items.push(barcode.rawValue);
                        const li = document.createElement('li');
                        li.innerHTML = barcode.rawValue;
                        this.output.appendChild(li);
                    }
                });
            })
            .catch(console.error);
    }
}
