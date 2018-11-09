const db = require('./db');

class Todo {
	// what properties should
	// a user start off with?
	// `constructor` is a method
	// that is automatically
	// called when you create a user
	constructor(id, name, completed) {
		// define properties that
		// are also the names
		// of the database columns
		this.id = id;
		this.name = name;
		this.completed = completed;
	}
	/////////////////////
	// create
	/////////////////////
	static add(name, completed) {
		return db
			.one(
				`
		insert into todos 
			(name, completed) 
		values 
			($1, $2) returning id`,
				[ name, completed ]
			)
			.then((data) => {
				const u = new User(data.id, name, completed);
				return u;
			});
	}

	/////////////////////
	// retrieve
	/////////////////////

	static getAll() {
		return db.any('select * from todos');
		console.log();
	}
}

///////////////////////////////////
// create
///////////////////////////////////

// // CREATE
// function add(name, completed) {
//     return db.one(`insert into todos (name, completed)
//         values
//             ($1, $2)
//         returning id
//     `, [name, completed])
// }

// // RETRIEVE
// // example of grabbing all the rows
// function getAll() {
//     return db.any('select * from todos');
// }

// // example of grabbing one row
// function getById(id){
//     return db.one(`select * from todos where id = $1`, [id])
//         .catch(err => {
//             // Got nuthin'
//             // console.log('you did not get a todo');
//             return {
//                 name: 'No todo found.'
//             };
//         })
// }

// // UPDATE

// function assignToUser(todoId, userId) {
//     return db.result(`
//         update todos
//             set user_id = $2
//         where id = $1
//     `, [todoId, userId]);
// }

// // example of updating a row
// function updateName(id, name) {
//     return db.result(`update todos
//         set name=$2
//     where id=$1`, [id, name]);
// }

// function updateCompleted(id, didComplete) {
//     return db.result(`update todos
//         set completed=$2
//     where id=$1`, [id, didComplete])
// }

// function markCompleted(id) {
//     // return updateCompleted(id, true);
//     return db.result(`update todos
// 	                    set completed=$2
// 	                where id=$1`, [id, true]);
// }

// function markPending(id) {
//     // return updateCompleted(id, false);
//     return db.result(`update todos
// 	                    set completed=$2
// 	                where id=$1`, [id, false]);
// }

// // DELETE
// // example of deleting a row
// function deleteById(id){
//     return db.result(`delete from todos where id = $1`, [id])
// }

// module.exports = {
//     add,
//     assignToUser,
//     deleteById,
//     getAll,
//     getById,
//     markCompleted,
//     markPending,
//     updateName,
// };

module.exports = Todo;
