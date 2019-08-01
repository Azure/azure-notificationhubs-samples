(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notification-event-notification-event-module"],{

/***/ "./src/app/notification-event/notification-event.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/notification-event/notification-event.module.ts ***!
  \*****************************************************************/
/*! exports provided: NotificationEventPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationEventPageModule", function() { return NotificationEventPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _notification_event_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification-event.page */ "./src/app/notification-event/notification-event.page.ts");







var routes = [
    {
        path: '',
        component: _notification_event_page__WEBPACK_IMPORTED_MODULE_6__["NotificationEventPage"]
    }
];
var NotificationEventPageModule = /** @class */ (function () {
    function NotificationEventPageModule() {
    }
    NotificationEventPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_notification_event_page__WEBPACK_IMPORTED_MODULE_6__["NotificationEventPage"]]
        })
    ], NotificationEventPageModule);
    return NotificationEventPageModule;
}());



/***/ }),

/***/ "./src/app/notification-event/notification-event.page.html":
/*!*****************************************************************!*\
  !*** ./src/app/notification-event/notification-event.page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Azure Notification Hubs (Ionic 4)</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header no-padding>\n      Notification Event\n    </ion-list-header>\n    <ion-item text-wrap no-padding>\n      <ion-label text-wrap>\n        <h2>Received</h2>\n        <p>{{event.received}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.title\">\n      <ion-label text-wrap>\n        <h2>Title</h2>\n        <p>{{event.title}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.subtitle\">\n      <ion-label text-wrap>\n        <h2>Subtitle</h2>\n        <p>{{event.subtitle}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.body\">\n      <ion-label text-wrap>\n        <h2>Body</h2>\n        <p>{{event.body}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.badge\">\n      <ion-label text-wrap>\n        <h2>Badge</h2>\n        <p>{{event.badge}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.notification\">\n      <ion-label text-wrap>\n        <h2>Notification</h2>\n        <p>{{event.notification}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.data\">\n      <ion-label text-wrap>\n        <h2>Data</h2>\n        <p>{{event.data}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.click_action\">\n      <ion-label text-wrap>\n        <h2>Click Action</h2>\n        <p>{{event.click_action}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding *ngIf=\"event.link\">\n      <ion-label text-wrap>\n        <h2>Link</h2>\n        <p>{{event.link}}</p>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/notification-event/notification-event.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/notification-event/notification-event.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vdGlmaWNhdGlvbi1ldmVudC9ub3RpZmljYXRpb24tZXZlbnQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/notification-event/notification-event.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/notification-event/notification-event.page.ts ***!
  \***************************************************************/
/*! exports provided: NotificationEventPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationEventPage", function() { return NotificationEventPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _interfaces_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../interfaces/events */ "./src/app/interfaces/events.ts");
/* harmony import */ var _services_azure_notification_hubs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/azure-notification-hubs.service */ "./src/app/services/azure-notification-hubs.service.ts");






var NotificationEventPage = /** @class */ (function () {
    function NotificationEventPage(navCtrl, pushService, route) {
        this.navCtrl = navCtrl;
        this.pushService = pushService;
        this.route = route;
        this.event = {
            // initialize as empty object just to start, otherwise
            // the .html page will crash on load.
            type: _interfaces_events__WEBPACK_IMPORTED_MODULE_4__["EventType"].notification,
            title: '',
            subtitle: '',
            body: '',
            id: '',
            badge: 0,
            notification: '',
            data: {},
            click_action: '',
            link: '',
            received: new Date(Date.now())
        };
    }
    NotificationEventPage.prototype.ngOnInit = function () {
        console.log('NotificationEventPage: ngOnInit()');
        // Get the index from the Query String
        var idx = parseInt(this.route.snapshot.paramMap.get('idx'), 10);
        // Grab that item from the event list
        this.event = this.pushService.pushEvents[idx];
    };
    NotificationEventPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-notification-event',
            template: __webpack_require__(/*! ./notification-event.page.html */ "./src/app/notification-event/notification-event.page.html"),
            styles: [__webpack_require__(/*! ./notification-event.page.scss */ "./src/app/notification-event/notification-event.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _services_azure_notification_hubs_service__WEBPACK_IMPORTED_MODULE_5__["AzureNotificationHubsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], NotificationEventPage);
    return NotificationEventPage;
}());



/***/ })

}]);
//# sourceMappingURL=notification-event-notification-event-module.js.map