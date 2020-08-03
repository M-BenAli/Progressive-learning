const {DataTypes, Model} = require('sequelize');
const Unit = require('./Unit');
const sequelize = require('../config/database');

class LearningGoal extends Model {
    async updateProgress() {
        console.log('Updating progress..');
        let progressPercentage = 0;
        let completedUnits = 0;
        let units = await this.getUnits({
            where: {
                learningGoalId: this.id
            }
        });
        // console.log(tasks);
        units.forEach(unit => {
            unit.completed ? completedUnits++ : null;
        });
        if (units.length > 0) {
            progressPercentage = (100 / units.length) * completedUnits;
            progressPercentage = Math.round((progressPercentage + Number.EPSILON) * 100 / 100);
        }
        this.progress = progressPercentage;
        console.log(this.progress);
        await this.save();
    }

    async updateUnits(updatedUnits) {
        for (let updatedUnit of updatedUnits) {
            if (!updatedUnit.id) {
                const unit = await Unit.build({
                    name: updatedUnit.name,
                    completed: updatedUnit.completed,
                    learningGoalId: this.id
                });
                await unit.save();
                console.log(unit.toJSON());
            } else if (updatedUnit.id) {
                let unit = await Unit.findByPk(updatedUnit.id);
                unit.name = updatedUnit.name;
                unit.completed = updatedUnit.completed;
                await unit.save();
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
