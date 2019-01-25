const colors = {
    'BLUE': "#0000ff",
    'RED': "#ff0000",
    'YELLOW': "#ffff00",
    'GREEN': "#00ff00"
}

module.exports = class MsgEmbed {
    constructor() { this.fields = []; }

    addTitle(str) {
        if (!str || str=='') throw new TypeError("Embed title fields cannot be missing or empty.");
        if (str.split(" ").length > 256) throw new TypeError("Message embed title cannot be over 256 characters.");

        this.title = `${str}`;
        return this;
    }

    addDesc(str) {
        if (!str || str == '') throw new TypeError("Embed description fields cannot be missing or empty.");
        if (str.split(" ").length > 2048) throw new TypeError("Embed descriptions cannot be over 2048 characters.");

        this.description = `${str}`;
        return this;
    }

    addColor(color) {
        if (!color || color.length == 0) throw new TypeError(`Embed colors must be a hex code, integer, or a predefined code.`);

        if (!colors.hasOwnProperty(color)) {
            this.color = parseInt(/[0-9A-F]{6}/i.exec(color)[0], 16)
        } else {
            this.color = this.color = parseInt(/[0-9A-F]{6}/i.exec(colors[color])[0], 16);
        }

        return this;
    }

    addTimestamp(date) {
        if (!date) {
            this.date = new Date();
        } else {
            this.timestamp = date;
        }

        return this;
    }

    addField(name, value, inl) {
        if (!name || name == '') throw new TypeError(`Message embed field names cannot be empty`);
        if (!value || value == '') throw new TypeError(`Message embed field values cannot be empty`);
        let inline = false;
        if (inl && typeof (inl) == 'boolean') inline = inl;

        this.fields.push({
            name: `${name}`,
            value: `${value}`,
            inline: inline
        });

        return this;
    }

    addAuthor(str, url) {
        if (!str || str == '') throw new TypeError(`Message embed author name cannot be empty`);
        if (str.split('').length > 256) throw new TypeError(`Message embed author name cannot be over 256 characters`);

        let icon = null;
        if (url && typeof (url) == 'string') icon = url;

        this.author = {
            name: `${str}`,
            icon_url: icon
        }

        return this;
    }

    addFooter(str, url) {
        if (!str || str == '') throw new TypeError(`Message embed footer text cannot be empty`);
        if (str.split('').length > 2048) throw new TypeError(`Message embed footer text cannot be over 2048 characters`);

        let icon = null;
        if (url && typeof (url) == 'string') icon = url;

        this.footer = {
            text: `${str}`,
            icon_url: icon
        }

        return this;
    }

    addImage(url) {
        if (!url || url == '') throw new TypeError(`Message embed image URL is required`);

        this.image = { url: url };
        return this;
    }

    addThumbnail(url) {
        if (!url || url == '') throw new TypeError(`Message embed thumbnail URL is required`);

        this.thumbnail = { url: url };
        return this;
    }

    pack() {
        let Embed = new Object();

        for (const [key, value] of Object.entries(this)) {
            Embed[key] = value;
        }

        return Embed;
    }
}