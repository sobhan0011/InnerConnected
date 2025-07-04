export const shorthands = undefined;

export const up = (pgm) => {
	pgm.createTable('users', {
		id: { type: 'uuid', primaryKey: true },
		first_name: { type: 'text', notNull: true },
		last_name: { type: 'text', notNull: true },
		username: { type: 'text', notNull: true, unique: true },
		phone_number: { type: 'text', notNull: true },
		password: { type: 'text', notNull: true },
		email: { type: 'text', notNull: true, unique: true },
		created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
	});

	pgm.createTable('posts', {
		id: { type: 'uuid', primaryKey: true },
		title: { type: 'text', notNull: true },
		content: { type: 'text', notNull: true },
		created_date: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
		approved: { type: 'boolean', notNull: true, default: false },
		user_id: {
			type: 'uuid',
			notNull: true,
			references: '"users"',
			onDelete: 'cascade',
		},
	});

	pgm.createTable('comments', {
		id: { type: 'uuid', primaryKey: true },
		content: { type: 'text', notNull: true },
		created_date: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
		post_id: {
			type: 'uuid',
			notNull: true,
			references: '"posts"',
			onDelete: 'cascade',
		},
		user_id: {
			type: 'uuid',
			notNull: true,
			references: '"users"',
			onDelete: 'cascade',
		},
	});
};

export const down = (pgm) => {
	pgm.dropTable('comments');
	pgm.dropTable('posts');
	pgm.dropTable('users');
};
