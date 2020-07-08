const {DataTypes, Model} = require('sequelize');
const Task = require('./Task');
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
        // console.log(tasks);
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

    async updateTasks(updatedTasks) {
        for (let updatedTask of updatedTasks) {
            if (!updatedTask.id) {
                const task = await Task.build({
                    name: updatedTask.name, completed: updatedTask.completed,
                    learningGoalId: this.id
                });
                await task.save();
                console.log(task.toJSON());
            } else if (updatedTask.id) {
                let task = await Task.findByPk(updatedTask.id);
                task.name = updatedTask.name;
                task.completed = updatedTask.completed;
                await task.save();
            }
        }
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




