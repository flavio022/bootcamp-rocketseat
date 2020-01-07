module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'avatar_id', {
      type: Sequelize.INTEGER,
      reference: { model: 'Files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'avatar_id');
  }
};