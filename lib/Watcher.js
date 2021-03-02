
const Content = require("chokidar");

module.exports = (Pathlike, Headers) => {
    const Watcher = Content.watch(Pathlike, {
        ignored: /(^|[\/\\])\../,
        awaitWriteFinish: true
    });

    const Cache = require("./Cache");
    Watcher.on("error", console.error);

    setTimeout(() => {
        Watcher
        .on("add",    () => Cache(Pathlike, Headers))
        .on("change", () => Cache(Pathlike, Headers))
        .on("unlink", () => Cache(Pathlike, Headers));
    }, 1e3);
}
