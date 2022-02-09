const loginModel = require("../Db/loginSchema");
async function logindata(edata) {
    let ins = await new loginModel(edata)
    ins.save((err, data) => {
        if (err) throw err;
    })
}
module.exports = { logindata }