export const shorthands = undefined;

export const up = (pgm) => {
	pgm.createTable('chat', {
		id: { type: 'uuid', primaryKey: true },
		user1_id: {
			type: 'uuid',
			notNull: true,
			references: '"users"',
			onDelete: 'cascade',
		},
		user2_id: {
			type: 'uuid',
			notNull: true,
			references: '"users"',
			onDelete: 'cascade',
		},
		created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
		closed_at: { type: 'timestamp' },
	});

	pgm.addConstraint('chat', 'chat_unique_pair', {
		check: 'user1_id <> user2_id',
	});

	pgm.addConstraint('chat', 'unique_user_pair', {
		unique: ['user1_id', 'user2_id'],
	});

	pgm.createTable('message', {
		id: 'uuid PRIMARY KEY',
		chat_id: { type: 'uuid', notNull: true, references: 'chat(id)', onDelete: 'cascade' },
		sender_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'cascade' },
		text: { type: 'text', notNull: true },
		send_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
	});
};

export const down = (pgm) => {
	pgm.dropTable('message');
	pgm.dropTable('chat');
};
