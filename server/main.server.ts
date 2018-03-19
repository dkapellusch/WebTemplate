import { configureServer, ServerInstances } from "./configuration/main.configuration.server";


configureServer();

ServerInstances.HTTP_SERVER.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});