module.exports = class Channel {
    constructor(obj, client) {
        for (const [key, value] of Object.entries(obj)) {
            this[key] = value
        }
        this.id = obj.id
        this.client = client

        switch(this.type) {
            case 0: this.type = "text";
            case 1: this.type = "dm";
            case 2: this.type = "voice";
            case 3: this.type = "group";
            case 4: this.type = "category";
        }
    }
}