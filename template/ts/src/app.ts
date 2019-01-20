import { createApp, Application, Session } from "mydog";
import roomMgr from "./app/domain/roomMgr";

let app = createApp();

app.set_encodeDecodeConfig({ "decode": decode });

app.configure("gate | connector", function () {

    //"ws" for cocos creator,  "net" for unity
    app.set_connectorConfig({ connector: "net", heartbeat: 6 });

    app.route("chat", function (app: Application, session: Session, serverType: string, cb: Function) {
        cb(session.get("chatServerId"));
    });

});

app.configure("chat", function () {
    app.set("roomMgr", new roomMgr(app));
});


app.start();

function decode(cmdId: number, msgBuf: Buffer, session: Session): any {
    console.log(app.routeConfig[cmdId]);
    return JSON.parse(msgBuf as any);
}

process.on("uncaughtException", function (err: any) {
    console.log(err)
});
