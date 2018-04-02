import "@common/extensions/all.extension";
import { ServerInstances } from "./instances.server";
import { Constants } from "./constants.server";
import { getData } from "@persistence/generic.dataAccess.server";
import { PersonModel } from "@common/models/person.model";
import { configureServer } from "@configuration/main.configuration.server";

(async function() {
    configureServer();
    await ServerInstances.MONGO_CONNECTION.Connect();
    let col = await getData<PersonModel>("persons");
    console.log(await col.findOne({}));
})();  
// ServerInstances.HTTP_SERVER.listen(Constants.PORT, () => {
//     console.log(`Node server listening on http://localhost:${Constants.PORT}`);
// });

