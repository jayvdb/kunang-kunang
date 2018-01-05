var context = require.context(".", true, /(_webpack\.sass)$/);
var obj = {};
context.keys().forEach(function (key) {
    obj[key] = context(key);
});
import "bulma-carousel/carousel";
