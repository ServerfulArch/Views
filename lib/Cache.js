
const Types = {
    js:   "application/javascript",
    json: "application/json",
    png:  "image/png",
    svg:  "image/svg+xml",
    ico:  "image/x-icon",
    html: "text/html",
    css:  "text/css"
};

const Endpoints = new Map();

function Directory (Pathlike, Destination) {
    const Source = Path.join(Pathlike, Destination);
    for (const File of FS.readdirSync(Source)) {
        if (/^[\._]/.test(File)) return;
        const SourceFile = Path.join(Source, File);
        const Endpoint = Path.join(Destination, File);

        if (FS.statSync(SourceFile).isDirectory()) {
            Directory(Pathlike, Endpoint);
            continue;
        }

        const Resource   = FS.readFileSync(SourceFile, {encoding: "utf-8"});
        const Identifier = Endpoint.toLowerCase().split(".").shift();
        const Type       = File.split(".").pop();

        Endpoints.set(Identifier, {
            Resource: Resource instanceof Buffer ?
                Buffer.from(Resource) : Resource,
            Static: Type === "html",
            Type:   Types[Type]
        });
    }
}

module.exports = Pathlike => {
    Endpoints.clear();
    Directory(Pathlike, "/");
    return Endpoints;
}
