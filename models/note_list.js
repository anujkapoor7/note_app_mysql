/**
 * @param {note_list} sequelize - to create the model
 * @param {*} DataTypes - provide the functinality to validate data
 * @returns {@constant {note_list}}
 */
module.exports = (sequelize, DataTypes) => {
    const note_list = sequelize.define("note_list", {
        /**
         * @param {title} - defines the rules
         */
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {msg: 'Please provide a title'},
                notNull: {msg: 'Please enter the title for the note'}
            }
        },
        /**
         * @param {body} - defines the rules
         */
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Please provide a body'},
                notNull: {msg: 'Please enter the body for the note'}
            }
        } 
    }
    )
    return note_list
}