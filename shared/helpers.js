const crypto = require('crypto');

const generateRefreshToken = () => new Promise(
  resolve => crypto.randomBytes(30, (__, buffer) => resolve(buffer.toString('hex')))
);

// const generateRefreshToken = () => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(30, (err, buffer) => {
//       if (err) {
//         reject();
//       }
//       resolve(buffer.toString('hex'));
//     });
//   }
// });

module.exports = {
  generateRefreshToken
};
