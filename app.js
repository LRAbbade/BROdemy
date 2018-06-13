const app = require('./config/server');

const port = 3000;
app.listen(port, function () {
    console.log("servidor rodando com Express na porta " + port);
});
