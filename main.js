class BarcodeRunner {
    output;
    barcodeDetector;
    items;
    video;

    constructor(output) {
        this.output = output;
        this.barcodeDetector = new BarcodeDetector();
        this.items = [];
        this.video = document.createElement('video');

        this.init();
    }

    async init() {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
        });

        this.video.srcObject = mediaStream;
        this.video.autoplay = true;

        this.output.before(video);

        this.renderLoop();
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
