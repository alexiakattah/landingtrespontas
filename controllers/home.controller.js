const seoHome = require('../seo/seoHome.json');

module.exports = {
    home: (req, res) => {
        let cookie_consent = req.cookies.cookie_consent ? true : false;
        res.render('pages/home', { seo: seoHome, isMobile: req.useragent.isMobile, cookie_consent: cookie_consent });
    },
    cookieConsent: (req, res) => {
        let options = {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
            httpOnly: true
        }
        res.cookie('cookie_consent', 'true', options).json({ cookie_consent: true });
    }
}
