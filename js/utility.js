function Untility() {
    this.uuid = function () {
        var random = Math.random() * 16 | 0;
        var uuid = (new Date()).valueOf().toString() + '-';
        for(let i = 0; i<8; i++){
            uuid = uuid + random.toString();
            random = Math.random() * 16 | 0;
        }
        console.log(uuid);
        return uuid;
    };

    this.store = function (namespace, data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    };

    this.load = function (namespace) {
        return (JSON.parse(localStorage.getItem(namespace)) || [])
    };
}