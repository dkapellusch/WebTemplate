import {resolve} from "path";
import {static as serveStatic} from "express";
import {Express} from "express-serve-static-core";

export function configureStaticRoutes(app : Express) : void {
    app.use(serveStatic(resolve(process.cwd(), "./dist/")));

    app.get("*", (err, res) => {
        res.sendFile(resolve(process.cwd(), "./dist/index.html"));
    });
}