(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["registration-event-registration-event-module"],{

/***/ "./src/app/registration-event/registration-event.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/registration-event/registration-event.module.ts ***!
  \*****************************************************************/
/*! exports provided: RegistrationEventPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationEventPageModule", function() { return RegistrationEventPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _registration_event_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registration-event.page */ "./src/app/registration-event/registration-event.page.ts");







var routes = [
    {
        path: '',
        component: _registration_event_page__WEBPACK_IMPORTED_MODULE_6__["RegistrationEventPage"]
    }
];
var RegistrationEventPageModule = /** @class */ (function () {
    function RegistrationEventPageModule() {
    }
    RegistrationEventPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_registration_event_page__WEBPACK_IMPORTED_MODULE_6__["RegistrationEventPage"]]
        })
    ], RegistrationEventPageModule);
    return RegistrationEventPageModule;
}());



/***/ }),

/***/ "./src/app/registration-event/registration-event.page.html":
/*!*****************************************************************!*\
  !*** ./src/app/registration-event/registration-event.page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Azure Notification Hubs (Ionic 4)</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header no-padding>\n      <h1>Registration</h1>\n    </ion-list-header>\n    <ion-item text-wrap no-padding>\n      <ion-label text-wrap>\n        <h2>Registration ID</h2>\n        <p>{{event.registrationId}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding>\n      <ion-label text-wrap>\n        <h2>Azure Registration ID</h2>\n        <p>{{event.azureRegId}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item text-wrap no-padding>\n      <ion-label text-wrap>\n        <h2>Received</h2>\n        <p>{{event.received}}</p>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/registration-event/registration-event.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/registration-event/registration-event.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdHJhdGlvbi1ldmVudC9yZWdpc3RyYXRpb24tZXZlbnQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/registration-event/registration-event.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/registration-event/registration-event.page.ts ***!
  \***************************************************************/
/*! exports provided: RegistrationEventPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationEventPage", function() { return RegistrationEventPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _interfaces_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../interfaces/events */ "./src/app/interfaces/events.ts");
/* harmony import */ var _services_azure_notification_hubs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/azure-notification-hubs.service */ "./src/app/services/azure-notification-hubs.service.ts");






var RegistrationEventPage = /** @class */ (function () {
    function RegistrationEventPage(navCtrl, 
    // public navParams: NavParams,
    pushService, route) {
        this.navCtrl = navCtrl;
        this.pushService = pushService;
        this.route = route;
        this.event = {
            // initialize as empty object just to start, otherwise
            // the .html page will crash on load.
            type: _interfaces_events__WEBPACK_IMPORTED_MODULE_4__["EventType"].registration,
            title: '',
            registrationId: '',
            azureRegId: '',
            received: new Date(Date.now())
        };
    }
    RegistrationEventPage.prototype.ngOnInit = function () {
        console.log('NotificationEventPage: ngOnInit()');
        // Get the index from the Query String
        var idx = parseInt(this.route.snapshot.paramMap.get('idx'), 10);
        // Grab that item from the event list
        this.event = this.pushService.pushEvents[idx];
    };
    RegistrationEventPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registration-event',
            template: __webpack_require__(/*! ./registration-event.page.html */ "./src/app/registration-event/registration-event.page.html"),
            styles: [__webpack_require__(/*! ./registration-event.page.scss */ "./src/app/registration-event/registration-event.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _services_azure_notification_hubs_service__WEBPACK_IMPORTED_MODULE_5__["AzureNotificationHubsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], RegistrationEventPage);
    return RegistrationEventPage;
}());



/***/ })

}]);
//# sourceMappingURL=registration-event-registration-event-module.js.map