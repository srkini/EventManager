module.exports = class SQLParam{

    constructor(name, type, size, value){
        this.name = name;
        this.type = type;
        this.size = size;
        this.value = value;
    }

    static getParam(){
        return this;
    }
}