import Sequelize from 'sequelize';

// sequelize migration:create --name=create-users
// sequelize db:migrate
// sequelize db:migrate:undo ou undo:all

import User from '../app/models/User';

import databaseConfig from '../config/database';

// Adicione as models os array!
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
