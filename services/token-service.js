const jwt = require("jsonwebtoken");
const Token = require("../models/token-model");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JVT_ACCESS_SECRET, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.JVT_REFRESH_SECRET, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JVT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JVT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({
            where: {
                UserId: userId,
            }
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({
            UserId: userId,
            refreshToken: refreshToken,
        })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({
            where: {
                refreshToken: refreshToken,
            }
        })
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({
            where: {
                refreshToken: refreshToken,
            }
        })
        return tokenData;
    }
}

module.exports = new TokenService();
