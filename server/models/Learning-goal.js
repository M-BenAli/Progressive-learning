const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

class LearningGoal extends Model {
    async updateProgress() {
        console.log('Updating progress..');
        let progressPercentage = 0;
        let completedTasks = 0;
        let tasks = await this.getTasks({
            where: {
                learningGoalId: this.id
            }
        });
        console.log(tasks);
        tasks.forEach(task => {
            task.completed ? completedTasks++ : null;
        });
        if (tasks.length > 0) {
            progressPercentage = (100 / tasks.length) * completedTasks;
            progressPercentage = Math.round((progressPercentage + Number.EPSILON) * 100 / 100);
        }
        this.progress = progressPercentage;
        console.log(this.progress);
        this.save();
    }
}

module.exports = LearningGoal.init({
    goal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    progress: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'learningGoal',
});




