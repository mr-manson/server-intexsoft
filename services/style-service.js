const Style = require("../models/style-model");

class StyleService {

    async getAllStyles() {
        const styles = await Style.findAll();
        return styles;
    }
}

module.exports = new StyleService();