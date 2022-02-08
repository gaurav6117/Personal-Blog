const loginModel = require("../Db/loginSchema");
async function logindata(edata) {
    let ins = await new loginModel(edata)
    ins.save((err, data) => {
        if (err) throw err;
        if(data){
            cartdata({user_id: data._id,cart_value: "{}" })
            addressdata({user_id: data._id,address:"[]"})
        }
    })
}
module.exports = { logindata }