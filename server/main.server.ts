import { configureServer } from "./configuration/main.configuration.server";
import { ServerInstances } from "./instances.server";
import { Constants } from "./constants.server";
import "@common/extensions/all.extension";
import { UserModel } from "@common/models/user.model";

configureServer();
let x = new UserModel("123","asd");
ServerInstances.HTTP_SERVER.listen(Constants.PORT, () => {
    console.log(`Node server listening on http://localhost:${Constants.PORT}`);
});