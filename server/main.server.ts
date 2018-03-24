import "@common/extensions/all.extension";
import { ServerInstances } from "./instances.server";
import { Constants } from "./constants.server";
import { configureServer } from "./configuration/main.configuration.server";

configureServer();
ServerInstances.HTTP_SERVER.listen(Constants.PORT, () => {
    console.log(`Node server listening on http://localhost:${Constants.PORT}`);
});