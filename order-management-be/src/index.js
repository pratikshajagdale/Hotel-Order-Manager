import app from "./config/express.js";
import env from "./config/vars.js";

app.listen(env.port, () => {
    console.log('listening to port', env.port);
})