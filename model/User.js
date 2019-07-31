import Userservice from '../services/UserService';

export default class User{

    constructor(){
        this._nome = null;
        this._login = null;
        this._senha = null;
        this._onLine = false;
    }

    get onLine(){
        return this._onLine;
    }
    set onLine(value){
        this._onLine = value;
    }

    get nome() {
        return this._nome;
    }

    set nome(value) {
        this._nome = value;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get senha() {
        return this._senha;
    }

    set senha(value) {
        this._senha = value;
    }

    save(callback){
        let user = this;
        Userservice.getInstance().save(user,callback);
    }


    list(callback){
        Userservice.getInstance().test(callback);
    }
    list2(){
        this.userS.teste2();
    }

}
