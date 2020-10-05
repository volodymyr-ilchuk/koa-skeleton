const { Model } = require('objection');

class UserRefreshToken extends Model {
  static get tableName() {
    return 'users_refresh_tokens';
  }

  static get relationMappings() {

  }
}

module.exports = UserRefreshToken;
