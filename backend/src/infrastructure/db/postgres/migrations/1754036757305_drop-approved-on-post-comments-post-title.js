export const up = (pgm) => {
	pgm.dropColumn('posts', 'title');
	pgm.dropColumn('posts', 'approved');
	pgm.dropColumn('comments', 'approved');
};

export const down = (pgm) => {
	pgm.addColumn('posts', 'title');
	pgm.addColumn('posts', 'approved');
	pgm.addColumn('comments', 'approved');
};
