export class CustomError extends Error {
	constructor({ code, en_message, fa_message, status, details = null }) {
		super(en_message);
		this.code = code;
		this.status = status;
		this.details = details;
		this.en_message = en_message;
		this.fa_message = fa_message;
	}
}
