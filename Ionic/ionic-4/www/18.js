(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-anchor_6.entry.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-anchor_6.entry.js ***!
  \************************************************************************/
/*! exports provided: ion_anchor, ion_route, ion_route_redirect, ion_router, ion_router_link, ion_router_outlet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_anchor", function() { return Anchor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_route_redirect", function() { return RouteRedirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_router_link", function() { return RouterLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_router_outlet", function() { return RouterOutlet; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-94c4865f.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-94c4865f.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");
/* harmony import */ var _chunk_25340090_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chunk-25340090.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-25340090.js");
/* harmony import */ var _chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chunk-815c1888.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-815c1888.js");








/**
 * @deprecated Use `ion-router-link` instead.
 */
var Anchor = /** @class */ (function () {
    function Anchor(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.onClick = function (ev) {
            Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["o"])(_this.href, ev, _this.routerDirection);
        };
    }
    Anchor.prototype.componentDidLoad = function () {
        console.warn('The <ion-anchor> component has been deprecated. Please use an <ion-router-link> if you are using a vanilla JS or Stencil project or an <a> with the Angular router.');
    };
    Anchor.prototype.render = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var attrs = {
            href: this.href,
            rel: this.rel
        };
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onClick: this.onClick, class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["c"])(this.color), (_a = {}, _a[mode] = true, _a['ion-activatable'] = true, _a)) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("a", Object.assign({}, attrs), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null))));
    };
    Object.defineProperty(Anchor, "style", {
        get: function () { return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return Anchor;
}());
var Route = /** @class */ (function () {
    function Route(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /**
         * Relative path that needs to match in order for this route to apply.
         *
         * Accepts paths similar to expressjs so that you can define parameters
         * in the url /foo/:bar where bar would be available in incoming props.
         */
        this.url = '';
        this.ionRouteDataChanged = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionRouteDataChanged", 7);
    }
    Route.prototype.onUpdate = function (newValue) {
        this.ionRouteDataChanged.emit(newValue);
    };
    Route.prototype.onComponentProps = function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        var keys1 = newValue ? Object.keys(newValue) : [];
        var keys2 = oldValue ? Object.keys(oldValue) : [];
        if (keys1.length !== keys2.length) {
            this.onUpdate(newValue);
            return;
        }
        for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
            var key = keys1_1[_i];
            if (newValue[key] !== oldValue[key]) {
                this.onUpdate(newValue);
                return;
            }
        }
    };
    Route.prototype.componentDidLoad = function () {
        this.ionRouteDataChanged.emit();
    };
    Route.prototype.componentDidUnload = function () {
        this.ionRouteDataChanged.emit();
    };
    Object.defineProperty(Route, "watchers", {
        get: function () {
            return {
                "url": ["onUpdate"],
                "component": ["onUpdate"],
                "componentProps": ["onComponentProps"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return Route;
}());
var RouteRedirect = /** @class */ (function () {
    function RouteRedirect(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.ionRouteRedirectChanged = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionRouteRedirectChanged", 7);
    }
    RouteRedirect.prototype.propDidChange = function () {
        this.ionRouteRedirectChanged.emit();
    };
    RouteRedirect.prototype.componentDidLoad = function () {
        this.ionRouteRedirectChanged.emit();
    };
    RouteRedirect.prototype.componentDidUnload = function () {
        this.ionRouteRedirectChanged.emit();
    };
    Object.defineProperty(RouteRedirect, "watchers", {
        get: function () {
            return {
                "from": ["propDidChange"],
                "to": ["propDidChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return RouteRedirect;
}());
var ROUTER_INTENT_NONE = 'root';
var ROUTER_INTENT_FORWARD = 'forward';
var ROUTER_INTENT_BACK = 'back';
function generatePath(segments) {
    var path = segments
        .filter(function (s) { return s.length > 0; })
        .join('/');
    return '/' + path;
}
function chainToPath(chain) {
    var path = [];
    for (var _i = 0, chain_1 = chain; _i < chain_1.length; _i++) {
        var route = chain_1[_i];
        for (var _a = 0, _b = route.path; _a < _b.length; _a++) {
            var segment = _b[_a];
            if (segment[0] === ':') {
                var param = route.params && route.params[segment.slice(1)];
                if (!param) {
                    return null;
                }
                path.push(param);
            }
            else if (segment !== '') {
                path.push(segment);
            }
        }
    }
    return path;
}
function writePath(history, root, useHash, path, direction, state) {
    var url = generatePath(parsePath(root).concat(path));
    if (useHash) {
        url = '#' + url;
    }
    if (direction === ROUTER_INTENT_FORWARD) {
        history.pushState(state, '', url);
    }
    else {
        history.replaceState(state, '', url);
    }
}
function removePrefix(prefix, path) {
    if (prefix.length > path.length) {
        return null;
    }
    if (prefix.length <= 1 && prefix[0] === '') {
        return path;
    }
    for (var i = 0; i < prefix.length; i++) {
        if (prefix[i].length > 0 && prefix[i] !== path[i]) {
            return null;
        }
    }
    if (path.length === prefix.length) {
        return [''];
    }
    return path.slice(prefix.length);
}
function readPath(loc, root, useHash) {
    var pathname = loc.pathname;
    if (useHash) {
        var hash = loc.hash;
        pathname = (hash[0] === '#')
            ? hash.slice(1)
            : '';
    }
    var prefix = parsePath(root);
    var path = parsePath(pathname);
    return removePrefix(prefix, path);
}
function parsePath(path) {
    if (path == null) {
        return [''];
    }
    var segments = path.split('/')
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s.length > 0; });
    if (segments.length === 0) {
        return [''];
    }
    else {
        return segments;
    }
}
function printRoutes(routes) {
    console.group("[ion-core] ROUTES[" + routes.length + "]");
    var _loop_1 = function (chain) {
        var path = [];
        chain.forEach(function (r) { return path.push.apply(path, r.path); });
        var ids = chain.map(function (r) { return r.id; });
        console.debug("%c " + generatePath(path), 'font-weight: bold; padding-left: 20px', '=>\t', "(" + ids.join(', ') + ")");
    };
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var chain = routes_1[_i];
        _loop_1(chain);
    }
    console.groupEnd();
}
function printRedirects(redirects) {
    console.group("[ion-core] REDIRECTS[" + redirects.length + "]");
    for (var _i = 0, redirects_1 = redirects; _i < redirects_1.length; _i++) {
        var redirect = redirects_1[_i];
        if (redirect.to) {
            console.debug('FROM: ', "$c " + generatePath(redirect.from), 'font-weight: bold', ' TO: ', "$c " + generatePath(redirect.to), 'font-weight: bold');
        }
    }
    console.groupEnd();
}
function writeNavState(root, chain, direction, index, changed) {
    if (changed === void 0) { changed = false; }
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var outlet, route, result, e_1;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    outlet = searchNavNode(root);
                    // make sure we can continue interacting the DOM, otherwise abort
                    if (index >= chain.length || !outlet) {
                        return [2 /*return*/, changed];
                    }
                    return [4 /*yield*/, outlet.componentOnReady()];
                case 1:
                    _a.sent();
                    route = chain[index];
                    return [4 /*yield*/, outlet.setRouteId(route.id, route.params, direction)];
                case 2:
                    result = _a.sent();
                    // if the outlet changed the page, reset navigation to neutral (no direction)
                    // this means nested outlets will not animate
                    if (result.changed) {
                        direction = ROUTER_INTENT_NONE;
                        changed = true;
                    }
                    return [4 /*yield*/, writeNavState(result.element, chain, direction, index + 1, changed)];
                case 3:
                    // recursively set nested outlets
                    changed = _a.sent();
                    if (!result.markVisible) return [3 /*break*/, 5];
                    return [4 /*yield*/, result.markVisible()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, changed];
                case 6:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function readNavState(root) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var ids, outlet, node, id;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = [];
                    node = root;
                    _a.label = 1;
                case 1:
                    if (false) {}
                    outlet = searchNavNode(node);
                    if (!outlet) return [3 /*break*/, 3];
                    return [4 /*yield*/, outlet.getRouteId()];
                case 2:
                    id = _a.sent();
                    if (id) {
                        node = id.element;
                        id.element = undefined;
                        ids.push(id);
                    }
                    else {
                        return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 4];
                case 3: return [3 /*break*/, 5];
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, { ids: ids, outlet: outlet }];
            }
        });
    });
}
function waitUntilNavNode() {
    if (searchNavNode(document.body)) {
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        window.addEventListener('ionNavWillLoad', resolve, { once: true });
    });
}
var QUERY = ':not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';
function searchNavNode(root) {
    if (!root) {
        return undefined;
    }
    if (root.matches(QUERY)) {
        return root;
    }
    var outlet = root.querySelector(QUERY);
    return outlet ? outlet : undefined;
}
function matchesRedirect(input, route) {
    var from = route.from, to = route.to;
    if (to === undefined) {
        return false;
    }
    if (from.length > input.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        var expected = from[i];
        if (expected === '*') {
            return true;
        }
        if (expected !== input[i]) {
            return false;
        }
    }
    return from.length === input.length;
}
function routeRedirect(path, routes) {
    return routes.find(function (route) { return matchesRedirect(path, route); });
}
function matchesIDs(ids, chain) {
    var len = Math.min(ids.length, chain.length);
    var i = 0;
    for (; i < len; i++) {
        if (ids[i].toLowerCase() !== chain[i].id) {
            break;
        }
    }
    return i;
}
function matchesPath(inputPath, chain) {
    var segments = new RouterSegments(inputPath);
    var matchesDefault = false;
    var allparams;
    for (var i = 0; i < chain.length; i++) {
        var path = chain[i].path;
        if (path[0] === '') {
            matchesDefault = true;
        }
        else {
            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                var segment = path_1[_i];
                var data = segments.next();
                // data param
                if (segment[0] === ':') {
                    if (data === '') {
                        return null;
                    }
                    allparams = allparams || [];
                    var params = allparams[i] || (allparams[i] = {});
                    params[segment.slice(1)] = data;
                }
                else if (data !== segment) {
                    return null;
                }
            }
            matchesDefault = false;
        }
    }
    var matches = (matchesDefault)
        ? matchesDefault === (segments.next() === '')
        : true;
    if (!matches) {
        return null;
    }
    if (allparams) {
        return chain.map(function (route, i) { return ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, allparams[i])
        }); });
    }
    return chain;
}
function mergeParams(a, b) {
    if (!a && b) {
        return b;
    }
    else if (a && !b) {
        return a;
    }
    else if (a && b) {
        return Object.assign({}, a, b);
    }
    return undefined;
}
function routerIDsToChain(ids, chains) {
    var match = null;
    var maxMatches = 0;
    var plainIDs = ids.map(function (i) { return i.id; });
    for (var _i = 0, chains_1 = chains; _i < chains_1.length; _i++) {
        var chain = chains_1[_i];
        var score = matchesIDs(plainIDs, chain);
        if (score > maxMatches) {
            match = chain;
            maxMatches = score;
        }
    }
    if (match) {
        return match.map(function (route, i) { return ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, ids[i] && ids[i].params)
        }); });
    }
    return null;
}
function routerPathToChain(path, chains) {
    var match = null;
    var matches = 0;
    for (var _i = 0, chains_2 = chains; _i < chains_2.length; _i++) {
        var chain = chains_2[_i];
        var matchedChain = matchesPath(path, chain);
        if (matchedChain !== null) {
            var score = computePriority(matchedChain);
            if (score > matches) {
                matches = score;
                match = matchedChain;
            }
        }
    }
    return match;
}
function computePriority(chain) {
    var score = 1;
    var level = 1;
    for (var _i = 0, chain_2 = chain; _i < chain_2.length; _i++) {
        var route = chain_2[_i];
        for (var _a = 0, _b = route.path; _a < _b.length; _a++) {
            var path = _b[_a];
            if (path[0] === ':') {
                score += Math.pow(1, level);
            }
            else if (path !== '') {
                score += Math.pow(2, level);
            }
            level++;
        }
    }
    return score;
}
var RouterSegments = /** @class */ (function () {
    function RouterSegments(path) {
        this.path = path.slice();
    }
    RouterSegments.prototype.next = function () {
        if (this.path.length > 0) {
            return this.path.shift();
        }
        return '';
    };
    return RouterSegments;
}());
function readRedirects(root) {
    return Array.from(root.children)
        .filter(function (el) { return el.tagName === 'ION-ROUTE-REDIRECT'; })
        .map(function (el) {
        var to = readProp(el, 'to');
        return {
            from: parsePath(readProp(el, 'from')),
            to: to == null ? undefined : parsePath(to),
        };
    });
}
function readRoutes(root) {
    return flattenRouterTree(readRouteNodes(root));
}
function readRouteNodes(root, node) {
    if (node === void 0) { node = root; }
    return Array.from(node.children)
        .filter(function (el) { return el.tagName === 'ION-ROUTE' && el.component; })
        .map(function (el) {
        var component = readProp(el, 'component');
        if (component == null) {
            throw new Error('component missing in ion-route');
        }
        return {
            path: parsePath(readProp(el, 'url')),
            id: component.toLowerCase(),
            params: el.componentProps,
            children: readRouteNodes(root, el)
        };
    });
}
function readProp(el, prop) {
    if (prop in el) {
        return el[prop];
    }
    if (el.hasAttribute(prop)) {
        return el.getAttribute(prop);
    }
    return null;
}
function flattenRouterTree(nodes) {
    var routes = [];
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        flattenNode([], routes, node);
    }
    return routes;
}
function flattenNode(chain, routes, node) {
    var s = chain.slice();
    s.push({
        id: node.id,
        path: node.path,
        params: node.params
    });
    if (node.children.length === 0) {
        routes.push(s);
        return;
    }
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var sub = _a[_i];
        flattenNode(s, routes, sub);
    }
}
var Router = /** @class */ (function () {
    function Router(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.previousPath = null;
        this.busy = false;
        this.state = 0;
        this.lastState = 0;
        /**
         * By default `ion-router` will match the routes at the root path ("/").
         * That can be changed when
         *
         */
        this.root = '/';
        /**
         * The router can work in two "modes":
         * - With hash: `/index.html#/path/to/page`
         * - Without hash: `/path/to/page`
         *
         * Using one or another might depend in the requirements of your app and/or where it's deployed.
         *
         * Usually "hash-less" navigation works better for SEO and it's more user friendly too, but it might
         * requires additional server-side configuration in order to properly work.
         *
         * On the otherside hash-navigation is much easier to deploy, it even works over the file protocol.
         *
         * By default, this property is `true`, change to `false` to allow hash-less URLs.
         */
        this.useHash = true;
        this.ionRouteWillChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionRouteWillChange", 7);
        this.ionRouteDidChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionRouteDidChange", 7);
    }
    Router.prototype.componentWillLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.debug('[ion-router] router will load');
                        return [4 /*yield*/, waitUntilNavNode()];
                    case 1:
                        _a.sent();
                        console.debug('[ion-router] found nav');
                        return [4 /*yield*/, this.onRoutesChanged()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.componentDidLoad = function () {
        window.addEventListener('ionRouteRedirectChanged', Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["e"])(this.onRedirectChanged.bind(this), 10));
        window.addEventListener('ionRouteDataChanged', Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["e"])(this.onRoutesChanged.bind(this), 100));
    };
    Router.prototype.onPopState = function () {
        var direction = this.historyDirection();
        var path = this.getPath();
        console.debug('[ion-router] URL changed -> update nav', path, direction);
        return this.writeNavStateRoot(path, direction);
    };
    Router.prototype.onBackButton = function (ev) {
        var _this = this;
        ev.detail.register(0, function () { return _this.back(); });
    };
    /**
     * Navigate to the specified URL.
     *
     * @param url The url to navigate to.
     * @param direction The direction of the animation. Defaults to `"forward"`.
     */
    Router.prototype.push = function (url, direction) {
        if (direction === void 0) { direction = 'forward'; }
        if (url.startsWith('.')) {
            url = (new URL(url, window.location.href)).pathname;
        }
        console.debug('[ion-router] URL pushed -> updating nav', url, direction);
        var path = parsePath(url);
        this.setPath(path, direction);
        return this.writeNavStateRoot(path, direction);
    };
    /**
     * Go back to previous page in the window.history.
     */
    Router.prototype.back = function () {
        window.history.back();
        return Promise.resolve(this.waitPromise);
    };
    /** @internal */
    Router.prototype.printDebug = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.debug('CURRENT PATH', this.getPath());
                console.debug('PREVIOUS PATH', this.previousPath);
                printRoutes(readRoutes(this.el));
                printRedirects(readRedirects(this.el));
                return [2 /*return*/];
            });
        });
    };
    /** @internal */
    Router.prototype.navChanged = function (direction) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, ids, outlet, routes, chain, path;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.busy) {
                            console.warn('[ion-router] router is busy, navChanged was cancelled');
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, readNavState(window.document.body)];
                    case 1:
                        _a = _b.sent(), ids = _a.ids, outlet = _a.outlet;
                        routes = readRoutes(this.el);
                        chain = routerIDsToChain(ids, routes);
                        if (!chain) {
                            console.warn('[ion-router] no matching URL for ', ids.map(function (i) { return i.id; }));
                            return [2 /*return*/, false];
                        }
                        path = chainToPath(chain);
                        if (!path) {
                            console.warn('[ion-router] router could not match path because some required param is missing');
                            return [2 /*return*/, false];
                        }
                        console.debug('[ion-router] nav changed -> update URL', ids, path);
                        this.setPath(path, direction);
                        return [4 /*yield*/, this.safeWriteNavState(outlet, chain, ROUTER_INTENT_NONE, path, null, ids.length)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Router.prototype.onRedirectChanged = function () {
        var path = this.getPath();
        if (path && routeRedirect(path, readRedirects(this.el))) {
            this.writeNavStateRoot(path, ROUTER_INTENT_NONE);
        }
    };
    Router.prototype.onRoutesChanged = function () {
        return this.writeNavStateRoot(this.getPath(), ROUTER_INTENT_NONE);
    };
    Router.prototype.historyDirection = function () {
        var win = window;
        if (win.history.state === null) {
            this.state++;
            win.history.replaceState(this.state, win.document.title, win.document.location && win.document.location.href);
        }
        var state = win.history.state;
        var lastState = this.lastState;
        this.lastState = state;
        if (state > lastState) {
            return ROUTER_INTENT_FORWARD;
        }
        else if (state < lastState) {
            return ROUTER_INTENT_BACK;
        }
        else {
            return ROUTER_INTENT_NONE;
        }
    };
    Router.prototype.writeNavStateRoot = function (path, direction) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var redirects, redirect, redirectFrom, routes, chain;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (!path) {
                    console.error('[ion-router] URL is not part of the routing set');
                    return [2 /*return*/, false];
                }
                redirects = readRedirects(this.el);
                redirect = routeRedirect(path, redirects);
                redirectFrom = null;
                if (redirect) {
                    this.setPath(redirect.to, direction);
                    redirectFrom = redirect.from;
                    path = redirect.to;
                }
                routes = readRoutes(this.el);
                chain = routerPathToChain(path, routes);
                if (!chain) {
                    console.error('[ion-router] the path does not match any route');
                    return [2 /*return*/, false];
                }
                // write DOM give
                return [2 /*return*/, this.safeWriteNavState(document.body, chain, direction, path, redirectFrom)];
            });
        });
    };
    Router.prototype.safeWriteNavState = function (node, chain, direction, path, redirectFrom, index) {
        if (index === void 0) { index = 0; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var unlock, changed, e_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lock()];
                    case 1:
                        unlock = _a.sent();
                        changed = false;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.writeNavState(node, chain, direction, path, redirectFrom, index)];
                    case 3:
                        changed = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 5];
                    case 5:
                        unlock();
                        return [2 /*return*/, changed];
                }
            });
        });
    };
    Router.prototype.lock = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var p, resolve;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = this.waitPromise;
                        this.waitPromise = new Promise(function (r) { return resolve = r; });
                        if (!(p !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, p];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, resolve];
                }
            });
        });
    };
    Router.prototype.writeNavState = function (node, chain, direction, path, redirectFrom, index) {
        if (index === void 0) { index = 0; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var routeEvent, changed;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.busy) {
                            console.warn('[ion-router] router is busy, transition was cancelled');
                            return [2 /*return*/, false];
                        }
                        this.busy = true;
                        routeEvent = this.routeChangeEvent(path, redirectFrom);
                        if (routeEvent) {
                            this.ionRouteWillChange.emit(routeEvent);
                        }
                        return [4 /*yield*/, writeNavState(node, chain, direction, index)];
                    case 1:
                        changed = _a.sent();
                        this.busy = false;
                        if (changed) {
                            console.debug('[ion-router] route changed', path);
                        }
                        // emit did change
                        if (routeEvent) {
                            this.ionRouteDidChange.emit(routeEvent);
                        }
                        return [2 /*return*/, changed];
                }
            });
        });
    };
    Router.prototype.setPath = function (path, direction) {
        this.state++;
        writePath(window.history, this.root, this.useHash, path, direction, this.state);
    };
    Router.prototype.getPath = function () {
        return readPath(window.location, this.root, this.useHash);
    };
    Router.prototype.routeChangeEvent = function (path, redirectFromPath) {
        var from = this.previousPath;
        var to = generatePath(path);
        this.previousPath = to;
        if (to === from) {
            return null;
        }
        var redirectedFrom = redirectFromPath ? generatePath(redirectFromPath) : null;
        return {
            from: from,
            redirectedFrom: redirectedFrom,
            to: to,
        };
    };
    Object.defineProperty(Router.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    return Router;
}());
var RouterLink = /** @class */ (function () {
    function RouterLink(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.onClick = function (ev) {
            Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["o"])(_this.href, ev, _this.routerDirection);
        };
    }
    RouterLink.prototype.render = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var attrs = {
            href: this.href,
            rel: this.rel
        };
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onClick: this.onClick, class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["c"])(this.color), (_a = {}, _a[mode] = true, _a['ion-activatable'] = true, _a)) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("a", Object.assign({}, attrs), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null))));
    };
    Object.defineProperty(RouterLink, "style", {
        get: function () { return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return RouterLink;
}());
var RouterOutlet = /** @class */ (function () {
    function RouterOutlet(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /**
         * If `true`, the router-outlet should animate the transition of components.
         */
        this.animated = true;
        this.ionNavWillLoad = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavWillLoad", 7);
        this.ionNavWillChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavWillChange", 3);
        this.ionNavDidChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavDidChange", 3);
    }
    RouterOutlet.prototype.swipeHandlerChanged = function () {
        if (this.gesture) {
            this.gesture.setDisabled(this.swipeHandler === undefined);
        }
    };
    RouterOutlet.prototype.componentWillLoad = function () {
        this.ionNavWillLoad.emit();
    };
    RouterOutlet.prototype.componentDidLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e("common"), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ./swipe-back-8dc047dc.js */ "./node_modules/@ionic/core/dist/esm/legacy/swipe-back-8dc047dc.js"))];
                    case 1:
                        _a.gesture = (_b.sent()).createSwipeBackGesture(this.el, function () { return !!_this.swipeHandler && _this.swipeHandler.canStart(); }, function () { return _this.swipeHandler && _this.swipeHandler.onStart(); }, function (step) { return _this.ani && _this.ani.progressStep(step); }, function (shouldComplete, step, dur) {
                            if (_this.ani) {
                                _this.ani.progressEnd(shouldComplete, step, dur);
                            }
                            if (_this.swipeHandler) {
                                _this.swipeHandler.onEnd(shouldComplete);
                            }
                        });
                        this.swipeHandlerChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    RouterOutlet.prototype.componentDidUnload = function () {
        this.activeEl = this.activeComponent = undefined;
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    };
    /** @internal */
    RouterOutlet.prototype.commit = function (enteringEl, leavingEl, opts) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var unlock, changed, e_3;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lock()];
                    case 1:
                        unlock = _a.sent();
                        changed = false;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.transition(enteringEl, leavingEl, opts)];
                    case 3:
                        changed = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 5];
                    case 5:
                        unlock();
                        return [2 /*return*/, changed];
                }
            });
        });
    };
    /** @internal */
    RouterOutlet.prototype.setRouteId = function (id, params, direction) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var changed;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setRoot(id, params, {
                            duration: direction === 'root' ? 0 : undefined,
                            direction: direction === 'back' ? 'back' : 'forward',
                        })];
                    case 1:
                        changed = _a.sent();
                        return [2 /*return*/, {
                                changed: changed,
                                element: this.activeEl
                            }];
                }
            });
        });
    };
    /** @internal */
    RouterOutlet.prototype.getRouteId = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var active;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                active = this.activeEl;
                return [2 /*return*/, active ? {
                        id: active.tagName,
                        element: active,
                    } : undefined];
            });
        });
    };
    RouterOutlet.prototype.setRoot = function (component, params, opts) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var leavingEl, enteringEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.activeComponent === component) {
                            return [2 /*return*/, false];
                        }
                        leavingEl = this.activeEl;
                        return [4 /*yield*/, Object(_chunk_25340090_js__WEBPACK_IMPORTED_MODULE_6__["a"])(this.delegate, this.el, component, ['ion-page', 'ion-page-invisible'], params)];
                    case 1:
                        enteringEl = _a.sent();
                        this.activeComponent = component;
                        this.activeEl = enteringEl;
                        // commit animation
                        return [4 /*yield*/, this.commit(enteringEl, leavingEl, opts)];
                    case 2:
                        // commit animation
                        _a.sent();
                        return [4 /*yield*/, Object(_chunk_25340090_js__WEBPACK_IMPORTED_MODULE_6__["d"])(this.delegate, leavingEl)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    RouterOutlet.prototype.transition = function (enteringEl, leavingEl, opts) {
        if (opts === void 0) { opts = {}; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var mode, el, animated, animationBuilder;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (leavingEl === enteringEl) {
                            return [2 /*return*/, false];
                        }
                        // emit nav will change event
                        this.ionNavWillChange.emit();
                        mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
                        el = this.el;
                        animated = this.animated && _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].getBoolean('animated', true);
                        animationBuilder = this.animation || opts.animationBuilder || _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('navAnimation');
                        return [4 /*yield*/, Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_7__["t"])(Object.assign({ mode: mode,
                                animated: animated,
                                animationBuilder: animationBuilder,
                                enteringEl: enteringEl,
                                leavingEl: leavingEl, baseEl: el, progressCallback: (opts.progressAnimation
                                    ? function (ani) { return _this.ani = ani; }
                                    : undefined) }, opts))];
                    case 1:
                        _a.sent();
                        // emit nav changed event
                        this.ionNavDidChange.emit();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    RouterOutlet.prototype.lock = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var p, resolve;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = this.waitPromise;
                        this.waitPromise = new Promise(function (r) { return resolve = r; });
                        if (!(p !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, p];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, resolve];
                }
            });
        });
    };
    RouterOutlet.prototype.render = function () {
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null));
    };
    Object.defineProperty(RouterOutlet.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet, "watchers", {
        get: function () {
            return {
                "swipeHandler": ["swipeHandlerChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet, "style", {
        get: function () { return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"; },
        enumerable: true,
        configurable: true
    });
    return RouterOutlet;
}());



/***/ })

}]);
//# sourceMappingURL=18.js.map