// Project settings, update these.
const projectSettings = {
    projectURL: 'http://localhost:10008',
    themePath: './themes/horisonttigroup/',
};

// Project variables, do not update.
const projectVariables = {
    blocksPluginPath: './plugins/meomblocks/',
    outPutFolder: 'build/',
};

// Browsersync settings.
const browserSyncSettings = {
    host: 'localhost',
    port: 3000,
    // Possibility to run different URL for child themes.
    // For example npm run start --url="https://some.domain.local"
    proxy: process.env.npm_config_url
        ? process.env.npm_config_url
        : projectSettings.projectURL,
    open: true,
    files: [
        projectSettings.themePath + projectVariables.outPutFolder + '**/*.js',
        projectSettings.themePath + projectVariables.outPutFolder + '**/*.css',
        projectSettings.themePath + '**/*.php',
        projectVariables.blocksPluginPath +
            projectVariables.outPutFolder +
            '**/*.js',
        projectVariables.blocksPluginPath +
            projectVariables.outPutFolder +
            '**/*.css',
        projectVariables.blocksPluginPath + 'blocks/**/*.php',
        projectVariables.blocksPluginPath + 'acf-blocks/**/*.php',
    ],
};

module.exports = {
    projectSettings,
    projectVariables,
    browserSyncSettings,
};
