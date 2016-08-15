import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'BetterCloud exercise :: ng2 Calculator';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      { src: '@ngrx/**/*.+(js|js.map)', inject: 'libs' }
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
      { src: 'https://fonts.googleapis.com/css?family=Open+Sans:600', inject: true, vendor: false },
      { src: 'https://fonts.googleapis.com/css?family=Comfortaa:700', inject: true, vendor: false },
      { src: `${this.CSS_SRC}/shared/fonts/digit-regular/font.css`, inject: true, vendor: false }
    ];

    this.SYSTEM_CONFIG_DEV = [
      ...this.SYSTEM_CONFIG_DEV,
      {
        paths: {
          '@ngrx/store': `node_modules/@ngrx/store/index.js`
        }
      }
    ]

    this.SYSTEM_CONFIG = [
      ...this.SYSTEM_CONFIG,
      {
        packages: {
          '@ngrx/core': {
            main: 'index.js',
            format: 'cjs'
          },
          '@ngrx/store': {
            main: 'index.js',
            format: 'cjs'
          }
        }
      }
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
