module.exports = (sequelize, Sequelize) => {
const contact = sequelize.define('Contact', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      hasEitherEmailOrPhoneNumber() {
        if (!this.email && !this.phoneNumber) {
          throw new Error('Either email or phoneNumber must be provided.');
        }
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      hasEitherEmailOrPhoneNumber() {
        if (!this.email && !this.phoneNumber) {
          throw new Error('Either email or phoneNumber must be provided.');
        }
      },
    },
  },
  linkedId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  linkPrecedence: {
    type: Sequelize.ENUM('primary', 'secondary'),
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
});
return contact;
}
