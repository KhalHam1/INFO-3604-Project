module.exports = {
    
    preset: 'jest-puppeteer',
    setupFilesAfterEnv: ["expect-puppeteer"],
    testMatch: [
        "**/src/*.e2e-spec.ts",
        "**/src/*.e2e-spec.js"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/src/test.ts"
    ],
    globals: {
        URL : 'http://localhost:4200/', //'https://scheduler-authentication.web.app', 
        globalSetup: "jest-environment-puppeteer/setup",
        globalTeardown: "jest-environment-puppeteer/teardown",
        testEnvironment: "jest-environment-puppeteer",
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.spec.json",
            stringifyContentPathRegex: "\\.html$",
            astTransformers: [
                "jest-preset-angular/build/InlineFilesTransformer",
                "jest-preset-angular/build/StripStylesTransformer"
            ]
        }
    },
    coverageReporters: [
        "json",
        "html",
        "text"
    ],
    collectCoverageFrom: [
        "<rootDir>/projects/my-project/src/lib/my-component/**",
        "!**/jest/**"
    ],
    coverageDirectory: "coverage/e2e_coverage",
    // launch: {
    //     headless: 'false',
    //     slowMo: 0,
    //     devtools: true,
    //     args: ['--headless'],
    //     args: ['--disable-infobars', '--window-size=1200,800'],
    // },
   // verbose: true
};