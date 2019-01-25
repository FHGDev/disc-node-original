class Collection extends Map {
    constructor() {
        super()
    }
    
    set(key, val) {
        return super.set(key, val)
    }

    get(key) {
        return super.get(key)
    }

    del(key) {
        return super.delete(key)
    }

    has(key) {
        return super.has(key)
    }

}

module.exports = Collection