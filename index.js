const pgp = require('pg-promise')();
const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'node-todo-app-db'
});

// db.any('select * from todos').then((results) => {
// 	console.log(results);
// });
// getAll()
//     .then(results => {
//         console.log(results);
//         console.log(`yep, those were all the todos`)
//     })

function getById(id) {
	return db.one(`select * from todos where id = $1`, [ id ]).catch((err) => {
		return {
			name: 'No todo found'
		};
	});
}

// getById(2).then((result) => {
// 	console.log(result);
// });

// example of adding a row
function add(name, completed) {
	return db.result(
		`insert into todos (name,completed)
        values
        ($1, $2)
        returning id
        `,
		[ name, completed ]
	);
}

// add('walk the chewbacca', false)
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	});

// example of deleting a row
function deleteById(id) {
	return db.result(`delete from todos where id = $1`, [ id ]);
}
// deleteById(6).then((result) => {
// 	console.log(result);
// });

// example of updating a row
