/**
 * Exports the PostCSS configuration.
 *
 * @param {string} env Environment.
 * @return {string} PostCSS options.
 */
module.exports = ({ env }) => ({
    plugins: [
        require('autoprefixer'),
        // Minify style on production using cssano.
        'production' === env
            ? require('cssnano')({
                /* eslint-disable */
                preset: 'default',
                discardComments: { removeAll: true },
            })
            : false,
            /* eslint-enable */
    ],
});
