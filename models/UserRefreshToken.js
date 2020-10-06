const { Model } = require('objection');

class UserRefreshToken extends Model {
  static get tableName() {
    return 'users_refresh_tokens';
  }

  static get relationMappings() {

  }

  static get idColumn() {
    return 'user_id';
  }
}

module.exports = UserRefreshToken;
