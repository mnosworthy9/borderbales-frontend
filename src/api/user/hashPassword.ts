import bcrypt from 'bcryptjs';

const saltRounds = 10; // number of salt rounds

const HashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export default HashPassword;
