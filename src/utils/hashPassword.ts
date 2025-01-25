import bcrypt from 'bcryptjs';

const saltRounds = 10; // Number of salt rounds

const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export default hashPassword;
