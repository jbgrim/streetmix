export default (sequelize, DataTypes) => {
  const PavementStructure = sequelize.define(
    'PavementStructure',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prixProjet: {
        type: DataTypes.STRING,
        field: 'prix_projet'
      },
      co2Projet: {
        type: DataTypes.STRING,
        field: 'co2_projet'
      },
      prixSur30Ans: {
        type: DataTypes.STRING,
        field: 'prix_sur_30_ans'
      },
      co2Sur30Ans: {
        type: DataTypes.STRING,
        field: 'co2_sur_30_ans'
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
      tableName: 'PavementStructure',
      timestamps: true
    }
  )

  return PavementStructure
}
