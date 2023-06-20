const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exeptions/api-error");

class UserService {
    async signup(email, password) {
        const candidate = await User.findOne({
            where: {
                email: email,
            }
        })
        if (candidate) {
            throw ApiError.BadRequest("Пользователь с таким email существует");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({
            email: email,
            password: hashPassword,
            activationLink: activationLink,
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({
            where: {
                activationLink: activationLink,
            }
        })
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка");
        }
        user.isActivated = true;
        await user.save();
    }

    async signin(email, password){
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if(!user){
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async signout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);
        if(!userData || !dbToken){
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({
            where: {
                id: userData.id,
            }
        })
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
