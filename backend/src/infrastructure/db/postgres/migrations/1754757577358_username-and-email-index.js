export const up = (pgm) => {
	pgm.sql('CREATE EXTENSION IF NOT EXISTS pg_trgm;');

	pgm.createIndex('users', 'username', {
		using: 'gin',
		opclass: 'gin_trgm_ops',
		name: 'idx_users_username_trgm',
	});

	pgm.createIndex('users', 'email', {
		name: 'idx_users_email',
	});
};

export const down = (pgm) => {
	pgm.dropIndex('users', 'idx_users_username_trgm');
	pgm.dropIndex('users', 'idx_users_email');
};
