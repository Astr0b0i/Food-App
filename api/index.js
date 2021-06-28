//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    Promise.all([
      Diet.create({name: 'Gluten Free'}),
      Diet.create({name: 'Ketogenic'}),
      Diet.create({name: 'Vegetarian'}),
      Diet.create({name: 'Lacto-Vegetarian'}),
      Diet.create({name: 'Ovo-Vegetarian'}),
      Diet.create({name: 'Vegan'}),
      Diet.create({name: 'Pescetarian'}),
      Diet.create({name: 'Paleo'}),
      Diet.create({name: 'Primal'}),
      Diet.create({name: 'Whole30'})]).then(() => console.log('Dietas Cargadas'));
  });
});
