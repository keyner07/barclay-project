import "reflect-metadata";
import app from "./app";
import config from "./config";
import connectionDB from "./db";
import { seeds } from "./db/seeds";
import watcherService from "./services/licenses/watcher.service";

const main = async () => {
    const res = await connectionDB();
    // seeds()
    if (res.error) return console.log(res.error);

    app.listen(config.port, () => {
        console.log("🚀 Server running on port: ", config.port);
    });
};


main();
