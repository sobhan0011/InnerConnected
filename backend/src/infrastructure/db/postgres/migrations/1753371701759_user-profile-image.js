export const up = (pgm) => {
	pgm.addColumn('users', {
		profile_image: { type: 'text', notNull: false },
	});
};

export const down = (pgm) => {
	pgm.dropColumn('users', 'profile_image');
};
