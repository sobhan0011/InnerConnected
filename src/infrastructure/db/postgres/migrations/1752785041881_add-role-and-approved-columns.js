export const up = (pgm) => {
	pgm.addColumn('users', {
		role: { type: 'text', notNull: true, default: 'USER' },
	});

	pgm.addColumn('comments', {
		approved: { type: 'boolean', notNull: true, default: false },
	});
};

export const down = (pgm) => {
	pgm.dropColumn('users', 'role');
	pgm.dropColumn('comments', 'approved');
};
