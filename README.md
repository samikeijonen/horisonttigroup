# Kala - WordPress Starter Theme

## Starting a new project
If the project needs custom Gutenberg blocks, clone MEOMblocks to your repository before you start coding:
```
cd htdocs/wp-content/plugins/
git clone git@bitbucket.org:meom/meomblocks.git
cd meomblocks
rm -rf .git
```

Remember to add the plugin to `.gitignore`.

1. At `config.yaml` file change name and add a domain:
```
name: meom
development:
  domains:
    - meom.local
```

1. At `webpack.settings.js` file change needed project settings (`projectSettings`). Entry points are usually the same from project to project but those can be modified. Note the naming pattern for MEOM block assets in that same file.

1. There are some places where we have hard coded theme name `kala/`. At least in `package.json` file and `_theme-imports.scss` file in meomblocks plugin. Search term `kala/` and replace with your theme name. For example `client-name/`.

1. Run `npm install`
1. Run `docker-compose up` or `vagrant up`
1. Run `npm run start`

### Assets are build in the server
We `gitignore` asset files in `build` folder and run `npm run build` in the server automatically when pushing new commits.

In other words asset files are not in the repo. But instead auto-generated in the server when pushing to `master` branch.

See file `scripts/git-hooks/post-receive` and search `ASSETS_CHANGED` for more information.

If there are problems you can run same commands in the live server manually:

```bash
npm install
npm run build
rm -rf node_modules
git checkout -- package-lock.json
```

### Pipelines
In `bitbucket-pipelines.yml` there are automated tasks for project, mainly linters.

Some of the linters are commented out because we don't have MEOMBlocks in the same repo.

Therefore remove comments on next lines where you see this comment:
> # Uncomment on projects.

## Commands
All NPM commands are run from the root of the project.
```
npm run start // watch changes in SCSS, JS and PHP.
npm run build // build for production
```
Look other commands in `package.json` file, under `scripts` setting.
## PHPCS

PHPCS rules are installed via composer from root of the project:

```bash
composer install
```

Read instructions how PHPCS works and how to make it work in your IDE in the [MEOM PHPCS repo](https://github.com/MEOM/phpcs-composer).

## JavaScript
You can use ES6 syntax in JavaScript files, webpack uses ES6 task by default.

Use `main.js` as your main while where you import other needed scripts. For example if you have file `navigation.js` in the same folder, include it to the `main.js` like this:
```
import './navigation.js';
```

You can use npm packages like this:

`npm install slick-carousel`
```
import 'slick-carousel';
$('.slider').slick();
```

## CSS File Structure
CSS structure is combination of inverted triangle CSS (ITCSS) and atomic design. Folders represents layers and gives more CSS specificity layer after layer.

- [ITCSS architecture](https://foxland.fi/maintainable-css-architecture-in-the-gutenberg-era/)
- [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/)
- Look more details under `scss` folder.
## Fonts
For performance reasons, use self hosted font files if possible. For Google web fonts, you can use [google-webfonts-helper](https://gwfh.mranftl.com/fonts) for downloading those. With TypeKit your only option is to include the fonts with JS.

Read more about the topic:

- https://simonhearne.com/2021/layout-shifts-webfonts/#prevent-layout-shifts-with-font-display
- https://wicki.io/posts/2020-11-goodbye-google-fonts/

When adding fonts, do these changes to the theme:

1. Add the self hosted font files to the `fonts` folder
2. Update `01-settings/_fonts.scss` file
3. Add the fonts also to an array in `preload_fonts` function (`includes/enqueue-assets.php`) and activate the filter which uses this function.
4. `enqueue_custom_fonts` function is ready in the `includes/enqueue-assets.php` file, if you need to enqueue outer files for the fonts. This function should be called in `includes/enqueue-assets.php` and `includes/gutenberg.php`, the call is commented by default. Remove the traces for this function, if it is not needed. 

## Fluid fonts
Add fluid font by using `fluid-size` mixin. See `mixin/fluid-functions.scss`. This calculates fluid fonts with clamp.

Example how to add fluid-font in settings-css.scss file:
`--text-button: #{fluid-size(0.8rem, 1.06063rem)};`

First value is min size and second max value. The value is fluid between $fluid-min-vw and $fluid-max-vw variables in `settings.scss` file.

## SVG icons
There is a helper function called `Kala\get_svg()` or `Kala\display_svg()` to output SVG icons from themes `images/icons` folder.

Example:

```php
<button>
   <span class="screen-reader-text">Play</span>
   <?php Kala\display_svg( 'play' ); ?>
</button>
```

Remember to add `aria-hidden="true" focusable="false"` to decorative SVG icons (most are decorative).

- `aria-hidden="true"` so that screen readers and other similar tools doesn't try to read SVG.
- `focusable="false"` so that focus doesn't get stuck on SVG icon (issue in older browsers).
## Grid
Use Flexbox, CSS Grid or something else

## Breakpoints
Breakpoints are automatically generated using variables at settings.scss.
You are free to set your own names and values, the rest is generated automatically.
Default values are:
```
$breakpoints: (
    large: 1000px,
    navigation: 940px,
    medium: 750px,
    small: 400px
);
```
Then you can use classes like: col-large-4, col-medium-6, col-small-12 etc.
You may also use following mixins:

```
@include media(small) { }
@include media(medium) { }
@include media(navigation) { }
@include media(large) { }

@include media-min(small) { }
@include media-min(medium) { }
@include media-min(navigation) { }
@include media-min(large) { }
```

## Namespaces
All functions in functions.php are namespaced with Kala, which means outside of functions.php they are called like this:
`Kala\my_function();`
PHP would throw an error if there are multiple functions or classes that have a same name.

## Languages
If you create a new post type and have Polylang in use, include `includes/polylang.php` file in the `functions.php` file. Add your post types and taxonomies to the `get_post_types_for_translation`, `get_post_types_for_translation_disable` and `get_taxonomies_for_translation` functions. This way you don't have to enable the translations from the dashboard.

## More about the development environment
See seravo.md file

## Which plugins should I use?
Check [plugin list document](https://docs.google.com/document/d/1YNyJ7nbiWVh3Gairi1ZsLOrHSd18BoR5vjurZoR0WT8/edit) for more information.
## MEOM Dodo
[MEOM Dodo](https://github.com/MEOM/meom-dodo) is mu-plugin that adds and removes various functionalities. Check Github for more information.
This plugin can be updated only via composer. Version number is defined as `^1.0` because we are not sure, if `2.0` will break some changes in the future.

## Testing

### visual regression testing

1. First make sure that vagrant is up and running
2. If backstop is not installed, run `npm install`
3. Before making any changes run `npm run css-reference` to make reference images
4. After making changes run `npm run css-test` to verify changes that has been made
5. Once you are happy with results, run `npm run css-approve` to approve test result images as new reference files.

#### notes

`get-routes.js` automatically generates list of possible routes by getting them from `/wp-json` endpoint.
After `routes.json` exists it will not automatically update it. In order to force update it you can run `node get-routes.js --force`.
You can also manually modify `routes.json` file in order to customize what pages will be tested.


By default backstop will generate two sets of images for one route, mobile and tablet sizes.
However if you want to modify these for example to add new viewport size,
you can modify `backstop-config.js` to add more viewport sizes as desired.

More information about possible configurations for backstop can be found form: https://github.com/garris/BackstopJS






---

# Seravo WordPress project template

Brought to you by [Seravo.com](https://seravo.com).

A WordPress project layout for use with Git, Composer and Nginx. It also
includes a config a Vagrant box and Docker image for local development.

This same project layout is used by default on all
[Seravo.com](https://seravo.com) instances for easy deployment workflow.
Contents of this repository equals to what you would have on the server in the
directory `/data/wordpress/`.


## Documentation

Please see our documentation at https://seravo.com/docs/ on general information
about git workflow with this project template.


## Installation

> Please see our documentation at
> https://seravo.com/docs/development/how-to-install/ on how to install Vagrant
> and its dependencies.


## Features

* Includes Nginx, MariaDB, PHP7, PHP8, Redis and Git for running WordPress in
  modern stack.
* Git hooks to test your code to make sure that only high quality code is
  committed into git
* Advanced WordPress acceptance tests with Codeception and headless Chrome
* [PHP Codesniffer](https://github.com/squizlabs/PHP_CodeSniffer) code style
  and quality analyzer
* Includes self-signed certs (and trust them automatically in OS X) to test
  https:// locally
* [Xdebug](http://xdebug.org/) and
  [Webgrind](https://code.google.com/p/webgrind/) for debugging and profiling
  your application
* [Mailcatcher](http://mailcatcher.me/) to imitate as SMTP server to debug
  mails
* [Adminer](http://www.adminer.org/) for a graphical interface to manage your
  database
* [BrowserSync](http://browsersync.io) as automatic testing middleware for
  WordPress


### Credentials for vagrant

WordPress:

```
user:     vagrant
password: vagrant
```

MariaDB (MySQL):

```
user:     root
password: root
```


## Development

The layout of this repo is designed in a way which allows storing the site in
version control without exposing any confidential data. By default all
sensitive data is ignored by git.

All plugins are handled by Composer so they are ignored by git. If you create
custom plugins, force add them to git so that they are tracked or add new lines
into `.gitignore` to not ignore.

Example of not ignore line in `.gitignore`:

    !htdocs/wp-content/plugins/your-plugin/

If you create custom themes, they are automatically tracked in git.

Best way to develop custom plugins and themes is to add them into their own
repositories and install them by composer.  You can do this by adding
`composer.json` for your plugin/theme and then requiring them in your project
like:

```json
"repositories": [
  {
      "type": "vcs",
      "url": "https://github.com/your-name/custom-plugin.git"
  }
],
"require": {
    "your-name/custom-plugin": "*"
}
```


## Updates

Vagrant will let you know as soon as a new version of the Vagrant box is
available. However, site environment will not be updated automatically to newer
one.

To download and update your Vagrant box to use the newest image run:

    vagrant box update
    vagrant destroy
    vagrant up


## Configuration

### config.yml

Change `name` in config.yml to change your site name. This is used in quite
some places in development environment.

Add `production => domain` and `production => ssh_port` to sync with your
production instance.

Add new domains under `development => domains` before first vagrant up to have
extra domains.

See `config-sample.yml` for more.


## The Layout

The root of this repository equals the contents of the directory
`/data/wordpress` in the Seravo.com instance.

```
├── config.yml # Project name, domains and other configuration
├── composer.json # Composer definition, used to pull in WordPress and plugins
├── composer.lock # Composer lock file. This is safe to delete and ignore as detailed dependency control is not relevant in WordPress.
├── gulpfile.js # Gulp example with correct paths
├── Vagrantfile # Vagrantfile for Seravo/WordPress Vagrant box
│
├── nginx # Custom modifications to Nginx which are also used in production
│   └── examples.conf # Some examples to get started
│   └── anything.conf # Your own config files can be named anything *.conf
│
├── scripts
│   ├── hooks # Git hooks for your project
│   │   ├── pre-commit # Run after every git commit
│   │   └── post-receive # Run after every git pull/push
│   │
│   ├── WordPress
│   │   └── Installer.php # Composer helper for WordPress installation
│   │
│   └── run-tests # Bash script as an interface for your tests in Seravo's production and development environments
│
├── vendor # Composer packages go here
└── htdocs # The web root of your site
    ├── wp-content # Directory moved out of WordPress core for git compatibility
    │   ├── mu-plugins
    │   ├── plugins
    │   ├── themes
    │   └── languages
    ├── wp-config.php
    ├── wp-load.php
    ├── index.php
    └── wordpress # WordPress core
        ├── wp-admin
        ├── index.php
        └── ...
```

## Credits

* Directory layout heavily inspired by
  [roots/bedrock](https://github.com/roots/bedrock)
* Development stack inspired by
  [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV)

Copyright Seravo Oy, 2015–2023 and contributors. Available under the GPLv3
license.
