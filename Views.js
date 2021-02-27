
"use strict";

const Request = require("./lib/Request");

module.exports = Pathlike => (function ServerfulExtension (Server) {
    const BaseRequest = Server.Managers.get("Request");
    const ExtendedRequest = Request(BaseRequest, Pathlike);
    Server.Managers.set("Request", ExtendedRequest);

    return true;
});