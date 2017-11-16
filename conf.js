exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['app-test.js'],
    onPrepare: () => {
        browser.ignoreSynchronization = true
    },
};