const app = require('./config/server');

const port = 80;
app.listen(port, function () {
    console.log("servidor rodando com Express na porta " + port);
});
