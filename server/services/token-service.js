const jwt = require("jsonwebtoken");
const Token = require("../../models/token-model");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JVT_ACCESS_SECRET, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.JVT_REFRESH_SECRET, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({
            where: {
                UserId: userId,
            }
        })
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({
            UserId: userId,
            refreshToken: refreshToken,
        })
        return token;
    }
}

module.exports = new TokenService();
