export default (sequelize, DataTypes) => {
  const Element = sequelize.define(
    'Element',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roulement: {
        type: DataTypes.STRING,
        allowNull: true
      },
      base: {
        type: DataTypes.STRING,
        allowNull: true
      },
      forme: {
        type: DataTypes.STRING,
        allowNull: true
      },
      countEur: {
        type: DataTypes.STRING,
        field: 'count_eur'
      },
      countCo2: {
        type: DataTypes.STRING,
        field: 'count_co2'
      },
      sur30CountEur: {
        type: DataTypes.STRING,
        field: 'sur30_count_eur'
      },
      sur30CountCo2: {
        type: DataTypes.STRING,
        field: 'sur30_count_co2'
      },
      colour: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'Element',
      timestamps: true
    }
  )

  return Element
}
