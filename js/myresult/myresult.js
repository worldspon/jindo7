'use strict';

import Connect from './model.js';
import Handler from './controller.js';

Handler.createTable(Connect.gameType, Connect.url);
Handler.bindClickEvent();
