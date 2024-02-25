import initDb from "./config/database.js";
import app from "./config/express.js";
import env from "./config/vars.js";

const startServer = async () => {
    try {
        // Establish database connection
        await initDb();
        console.log("🌐 Database connection established successfully.");

        // Start the server
        app.listen(env.app.port, () => {
            console.log('Server started successfully 🚀');
            console.log(`Listening on port ${env.app.port} 🎧`);
        });

        // Error in starting server
        app.on('error', (error) => {
            console.error(`Error starting server: ${error.message} ❌`);
        });
    } catch (error) {
        console.log("❌ Failed to establish database connection.", error);
    }
};

startServer();
