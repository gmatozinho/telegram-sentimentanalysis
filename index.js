const login = require("./login");
const { getChat, chatHistory, searchUsers } = require("./chat-history");

const run = async () => {
  const first_name = await login();
  //const res = await searchUsers();
  //await updateProfile(first_name);
  const chat = await getChat();

  const history = await chatHistory(chat);
};

run();
