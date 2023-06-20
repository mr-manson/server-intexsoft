const styleService = require("../services/style-service");

class StyleController {
    async getStyles(req, res, next) {
        try {
            const styles = await styleService.getAllStyles();
            return res.json(styles);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new StyleController();