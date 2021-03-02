
const FS   = require("fs");
const Path = require("path");

const Types = {
    js:   "application/javascript",
    json: "application/json",
    png:  "image/png",
    svg:  "image/svg+xml",
    ico:  "image/x-icon",
    html: "text/html",
    ejs:  "text/html",
    css:  "text/css"
};

const Endpoints = new Map();

function Directory (Pathlike, Headers, Destination) {
    const Source = Path.join(Pathlike, Destination);
    for (const File of FS.readdirSync(Source)) {
        if (/^[\._]/.test(File)) return;
        const SourceFile = Path.join(Source, File);
        const Endpoint = Path.join(Destination, File);

        if (FS.statSync(SourceFile).isDirectory()) {
            Directory(Pathlike, Headers, Endpoint);
            continue;
        }

        const Resource   = FS.readFileSync(SourceFile, {encoding: "utf-8"});
        const Identifier = Endpoint.toLowerCase().split(".").shift();
        const Type       = File.split(".").pop();

        let Content = Resource;

        if (!(Resource instanceof Buffer))
        for (const [Identifier, Header] of Headers) {
            const Head = new RegExp(`(\<serverful (${Identifier})\>)`, "gi");
            if (Head.test(Resource)) Content = Resource.replace(Head, Header);
        }

        Endpoints.set(Identifier, {
            Resource: Resource instanceof Buffer ?
                Buffer.from(Resource) : Content,
            Static: Type === "html",
            Type:   Types[Type]
        });
    }
}

module.exports = (Pathlike, Headers) => {
    Endpoints.clear();
    Directory(Pathlike, Headers, "/");
    return Endpoints;
}
