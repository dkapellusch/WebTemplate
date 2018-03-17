import * as cluster from "cluster";
import {cpus} from "os";
import {ENODEV} from "constants";

const CPU_COUNT = cpus().length;

if (process.env.NODE_ENV === "production") {
    if (cluster.isMaster) {
        for (let i = 0; i < CPU_COUNT; i++) {
            cluster.fork();
        }
    } else {}

}