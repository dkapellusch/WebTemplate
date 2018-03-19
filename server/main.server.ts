import { configureServer } from "./configuration/main.configuration.server";
import { ServerInstances } from "./instances.server";
import { Constants } from "./constants.server";
import "../common/extensions/all.extension";

configureServer();
console.log(Array.range(12))
ServerInstances.HTTP_SERVER.listen(Constants.PORT, () => {
    console.log(`Node server listening on http://localhost:${Constants.PORT}`);
});