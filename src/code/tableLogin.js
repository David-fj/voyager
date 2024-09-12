// const db = require('../models/index');
// const { User, Run } = require('../models/index');

const { sequelize } = require('../models/index');

const getUsersWithScores = async () => {
    try {
      const results = await sequelize.query(`
        SELECT 
          MAX(Runs.createdAt),
          COUNT(Runs.id) AS entryCount, 
          Users.name AS userName, 
          MAX(Runs.pontuacao) AS totalScore
        FROM Runs
        JOIN Users ON Runs.iduser = Users.id
        GROUP BY Users.id
        ORDER BY totalScore DESC;
      `, {
        type: sequelize.QueryTypes.SELECT
      });
  
      return results;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
getUsersWithScores()

module.exports = {getUsersWithScores}
