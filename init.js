const {MTProto} = require("telegram-mtproto");

const api = {
  invokeWithLayer: 0xda9b0d0d,
  layer: 57,
  initConnection: 0x69796de9,
  api_id: Number(process.env.API_ID),
  app_version: "1.0.1",
  lang_code: "en",
};

const server = { webogram: true, /* dev: true */ };

const telegram = MTProto({ api, server });

module.exports = telegram;
