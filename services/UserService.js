import Database from '../common/Database'
import Rsa_Crypt from '../common/Rsa_Crypt'


export default class UserService{

    static getInstance(){
        if(UserService._instance == null){
            UserService._instance = new UserService();
            return UserService._instance;
        }else{
            return this._instance;
        }
    }
    findByLogin(login,callback){

    }

    save(user,callback){
        Database.getInstance().open(function(err, db){
            if(null){
                user.id(Database.getObjectID(user._id));
                db.collection('users').updateOne({"_id": user.id},user,function (err, result){
                    console.log(err);
                    callback(err,result);

                })
            }else {
                db.collection('users').insertOne(user,function (err, result){
                    console.log(err);
                    callback(err,result);

                })
            }


        })
    }

    test(callback) {
        let database = new Database().open(function(err, db){
            db.collection('users').find({}).toArray(function(err, result){
                callback(err, result)
            })

        })


    }
    teste2(){
        let datateste = new Database();
    }

}
UserService.prototype._instance = null;
