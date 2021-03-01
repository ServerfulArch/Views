
const Content = require("chokidar");

module.exports = Pathlike => {
    const Watcher = Content.watch(Pathlike, {
        ignored: /(^|[\/\\])\../,
        awaitWriteFinish: true
    });

    const Cache = require("./Cache");
    Watcher.on("error", console.error);

    Watcher
    .on("add",    () => Cache(Pathlike))
    .on("change", () => Cache(Pathlike))
    .on("unlink", () => Cache(Pathlike));
}
