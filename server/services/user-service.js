const User = require("../../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
    async signup(email, password) {
        const candidate = await User.findOne({
            where: {
                email: email,
            }
        })
        if (candidate) {
            throw new Error("Пользователь с таким email существует");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({
            email: email,
            password: hashPassword,
            activationLink: activationLink,
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/signup/activationLink`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();
