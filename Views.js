
"use strict";

const Request = require("./lib/Request");

/**
 * Registers the plugin and configures the view directory.
 * @param {Pathlike} Pathlike A directory that contains all the views of the server.
 * @param {Pathlike} [Headers] An optional path for header bindings.
 * @returns {Function} A Serverful extension.
 */
module.exports = (Content, Headers = undefined) => {
    if (typeof Content !== "string") {
        throw new TypeError("Content path should be a type of String.");
    }

    const HeaderMap = new Map();

    if (Headers) {
        if (typeof Headers !== "string") throw new TypeError("Header path should be a type of String.");

        const FS   = require("fs");
        const Path = require("path");

        for (const Header of FS.readdirSync(Headers)) {
            const Destination = FS.readFileSync(Path.join(Headers, Header), "utf-8");
            HeaderMap.set(Header.split(".").shift(), Destination);
        }
    }

    return function ServerfulExtension (Server) {
        const BaseRequest = Server.Managers.get("Request");
        const ExtendedRequest = Request(BaseRequest, Content, HeaderMap);
        Server.Managers.set("Request", ExtendedRequest);
    
        const Watcher = require("./lib/Watcher");
        Watcher(Content, HeaderMap);
    
        return true;
    }
};
