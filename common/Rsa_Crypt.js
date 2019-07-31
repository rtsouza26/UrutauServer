import Crypt from 'node-jsencrypt'

export default class Rsa_Crypt{

    constructor(){
        if(Rsa_Crypt.exists){
            return Rsa_Crypt.instance;
        }
        Rsa_Crypt.instance = this;
        Rsa_Crypt.exists = true;
        this._crypt=null;
        this._privateKey = null;
        this._publicKey = null;
        return this;

    }

    get crypt() {
        return this._crypt;
    }

    get privateKey() {
        return this._privateKey;
    }

    get publicKey() {
        return this._publicKey;
    }

    set crypt(value) {
        this._crypt = value;
    }

    set privateKey(value) {
        this._privateKey = value;
    }

    set publicKey(value) {
        this._publicKey = value;
    }

    onmessagem(e){
        const[ messageType, messageId, text, key] = e.data;
        let result;
        switch (messageType) {
            case 'generate-keys':
                result = this.generateKeypair();
                break;
            case 'encrypt':
                result = this.encrypt(text,key);
                break;
            case 'decrypt':
                result = this.decrypt(text);
                break;
        }
        postMessage([messageId,result]);
    }
    generateKeypair () {
        this.crypt (new JSEncrypt({default_key_size: 2056}));
        this.privateKey(crypt.getPrivateKey());

        // Only return the public key, keep the private key hidden
        this.publicKey(this.crypt.getPublicKey());
        return this.publicKey;
    }
    encrypt(content){
        this.crypt.setKey(this.publicKey);
        return this.crypt.encrypt(content);
    }
    decrypt (content) {
        this.crypt.setKey(this.privateKey);
        return this.crypt.decrypt(content);
    }

}

