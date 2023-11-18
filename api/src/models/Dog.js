const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          len: {
            args: [5,10],
            msg: "El nombre debe contener entre 5 y 10 caracteres"
          },
        },
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue :"https://img.freepik.com/fotos-premium/perro-bufanda-colorida-gafas-sol_901003-3478.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1698278400&semt=ais"
      },
      
      height_min: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      height_max: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      weight_min: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      life_span_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      life_span_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
