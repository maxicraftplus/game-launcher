const fs = require("fs");

fs.readFile("user-settings.json", "utf-8", (err, data) => {
    if (err) {
        console.log("fatal error", err)
        // window.location.reload();
        return;
    }
    console.log(data)
});