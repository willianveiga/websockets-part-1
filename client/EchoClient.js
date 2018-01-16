class EchoClient {
    constructor(onOpen, onMessage, onClose, onError) {
        this.address = "ws://localhost:8080";
        this.protocol = "echo-protocol";
        this.socket = null;
        this.socketConnected = false;
        this.onOpen = onOpen || (() => {});
        this.onMessage = onMessage || (() => {});
        this.onClose = onClose || (() => {});
        this.onError = onError || (() => {});
    }

    connect() {
        if (this.connected()) {
            this.disconnect();
        }
        this.socket = new WebSocket(this.address, this.protocol);
        this._setUpEventListeners();
    }

    _setUpEventListeners() {
        if (this.socket) {
            this.socket.addEventListener("open", (event) => {
                this.socketConnected = true;
                this.onOpen(event);
            });
            this.socket.addEventListener("message", this.onMessage);
            this.socket.addEventListener("close", this.onClose);
            this.socket.addEventListener("error", this.onError);
        }
    }

    sendMessage(message) {
        if (this.disconnected()) {
            throw new Error("Client not connected");
        }
        this.socket.send(message);
    }

    disconnect() {
        if (this.connected()) {
            this.socket.close();
            this.socket = null;
            this.socketConnected = false;
        }
    }

    connected() {
        return this.socket && this.socketConnected;
    }

    disconnected() {
        return !this.connected();
    }
}
