import models from '../models';
const User = models.User;

const getUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email: email } });
};

export default getUserByEmail;