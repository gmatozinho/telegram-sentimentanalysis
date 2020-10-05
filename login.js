const telegram = require("./init");
const { inputField } = require("./fixtures");
const config = {
  // NOTE: if you FORK the project you MUST use your APP ID.
  // Otherwise YOUR APPLICATION WILL BE BLOCKED BY TELEGRAM
  // You can obtain your own APP ID for your application here: https://my.telegram.org
  id: Number(process.env.API_ID),
  hash: process.env.API_HASH,
};

const login = async () => {
  try {
    //const phone = await inputField("phone");
    //console.log("insert:", phone);
    const phone = process.env.PHONE;
    const sendcoderesponse = await telegram("auth.sendCode", {
      phone_number: phone,
      current_number: false,
      api_id: config.id,
      api_hash: config.hash,
    });

    const code = await inputField("code ");
    console.log("insert:", code);

    let res;
    if (sendcoderesponse.phone_registered) {
      res = await telegram("auth.signIn", {
        phone_number: phone,
        phone_code_hash: sendcoderesponse.phone_code_hash,
        phone_code: code,
      });
    } else {
      res = await telegram("auth.signUp", {
        phone_number: phone,
        phone_code_hash: sendcoderesponse.phone_code_hash,
        phone_code: code,
        first_name: process.env.FIRST_NAME,
        last_name: process.env.LAST_NAME,
      });
    }

    const { user } = res;
    const { first_name = "", username = "" } = user;
    console.log("signIn", first_name, username, user.phone);
    return first_name;
  } catch (error) {
    console.error(error);
  }
};

module.exports = login;
