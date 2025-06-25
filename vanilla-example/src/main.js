"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var openpay_js_1 = require("@getopenpay/openpay-js");
require("./style.css");
var urlParams = new URLSearchParams(window.location.search);
var token = urlParams.get('token');
var baseUrl = urlParams.get('baseUrl') || import.meta.env.VITE_BASE_URL;
var separateFrames = ((_a = urlParams.get('separateFrames')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true';
var PAYPAL_DEFAULT_VALUES = {
    email: 'PAYPAL_PAYMENT@email.com',
    firstName: 'PAYPAL_PAYMENT_FIRST_NAME',
    lastName: 'PAYPAL_PAYMENT_LAST_NAME',
    zipCode: '12345',
    country: 'US',
};
var previousFormInstance = null;
var validationErrors = {};
var secureToken = token;
var secureTokenInput = document.querySelector('#secure-token');
secureTokenInput.addEventListener('change', function () {
    secureToken = secureTokenInput.value;
    urlParams.set('token', secureToken);
    window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());
    if (secureToken.length)
        initializeForm(secureToken);
});
if (secureToken) {
    initializeForm(secureToken);
    secureTokenInput.value = secureToken;
}
function initializeForm(token) {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g;
    if (previousFormInstance) {
        previousFormInstance.destroy();
    }
    var formInstance = new openpay_js_1.OpenPayForm({
        checkoutSecureToken: token,
        formTarget: '#app',
        baseUrl: baseUrl || undefined,
        onLoad: function (totalAmountAtoms, currency) {
            var submitButton = document.querySelector('#submit');
            if (submitButton && totalAmountAtoms && currency) {
                var amount = (totalAmountAtoms / 100).toFixed(2);
                submitButton.innerHTML = "Pay ".concat(amount, " ").concat(currency.toUpperCase());
            }
            submitButton.disabled = false;
            hideLoading();
            hideError();
            clearValidationError();
            var availablePaymentMethods = formInstance.getAvailablePaymentMethods();
            // Conditionally render paymethods based on availability
            availablePaymentMethods === null || availablePaymentMethods === void 0 ? void 0 : availablePaymentMethods.forEach(function (method) {
                var _a, _b, _c, _d;
                if (method.name === openpay_js_1.SubmitMethods.airwallexApplePay && 'isAvailable' in method && method.isAvailable) {
                    (_a = document.querySelector('#submit-awx-apple-pay')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
                }
                if (method.name === openpay_js_1.SubmitMethods.airwallexGooglePay && 'isAvailable' in method && method.isAvailable) {
                    (_b = document.querySelector('#submit-awx-google-pay')) === null || _b === void 0 ? void 0 : _b.removeAttribute('disabled');
                }
                if (method.name === openpay_js_1.SubmitMethods.authorizenetApplePay && 'isAvailable' in method && method.isAvailable) {
                    (_c = document.querySelector('#submit-authnet-apple-pay')) === null || _c === void 0 ? void 0 : _c.removeAttribute('disabled');
                }
                if (method.name === openpay_js_1.SubmitMethods.authorizenetGooglePay && 'isAvailable' in method && method.isAvailable) {
                    (_d = document.querySelector('#submit-authnet-google-pay')) === null || _d === void 0 ? void 0 : _d.removeAttribute('disabled');
                }
            });
        },
        onLoadError: function (message) {
            console.log('Load error', message);
            var errorMessage = {
                type: 'load-error',
                message: message,
            };
            showError(errorMessage);
            hideLoading();
        },
        onValidationError: function (field, error, elementId) {
            console.log('Validation error', field, error, elementId);
            // [elementType]: errors,
            validationErrors[field] = error;
            // if (elementId && error) {
            showValidationError(validationErrors);
            // }
        },
        onFocus: function (elementId) {
            console.log('onFocus', elementId);
            var container = document.querySelector('.card-element');
            if (container) {
                container.setAttribute('data-focused', 'true');
            }
        },
        onBlur: function (elementId) {
            console.log('onBlur', elementId);
            var container = document.querySelector('.card-element');
            if (container) {
                container.removeAttribute('data-focused');
            }
        },
        onChange: function (elementId, field, errors) {
            console.log({ elementId: elementId }, { field: field }, { errors: errors });
            clearValidationError();
            hideError();
        },
        onCheckoutStarted: function () {
            console.log('Checkout started');
            showLoading();
        },
        onCheckoutSuccess: function (invoiceUrls, subscriptionIds, customerId, processorsUsed) {
            console.log('Checkout success', invoiceUrls, subscriptionIds, customerId, processorsUsed);
            hideLoading();
            showCheckoutSuccess(invoiceUrls, subscriptionIds, customerId, processorsUsed);
        },
        onSetupPaymentMethodSuccess: function (paymentMethodId) {
            console.log('Setup payment method success', paymentMethodId);
            hideLoading();
            showSetupSuccess(paymentMethodId);
        },
        onCheckoutError: function (error, errorCode) {
            console.log("Checkout error [".concat(errorCode, "]"), error);
            var errorMessage = {
                type: 'checkout-error',
                message: error,
                errorCode: errorCode,
            };
            hideLoading();
            showError(errorMessage);
        },
        onPaymentRequestLoad: function (paymentRequests) {
            if (paymentRequests.apple_pay.isAvailable) {
                var applePayButton = document.querySelector('#apple-pay-button');
                if (applePayButton) {
                    applePayButton.style.display = 'flex';
                    applePayButton.addEventListener('click', function () {
                        paymentRequests.apple_pay.startFlow({
                            overridePaymentRequest: { amount: { amountAtom: 420, currency: 'usd' }, pending: false },
                        });
                    });
                }
            }
            if (paymentRequests.google_pay.isAvailable) {
                var googlePayButton = document.querySelector('#google-pay-button');
                if (googlePayButton) {
                    googlePayButton.style.display = 'flex';
                    googlePayButton.addEventListener('click', function () {
                        paymentRequests.google_pay.startFlow({
                            overridePaymentRequest: { amount: { amountAtom: 420, currency: 'usd' }, pending: false },
                        });
                    });
                }
            }
            else if (!paymentRequests.google_pay.isAvailable && !paymentRequests.google_pay.isLoading) {
                var googlePayButton = document.querySelector('#google-pay-button');
                googlePayButton.style.display = 'flex';
                googlePayButton.disabled = true;
            }
        },
        customInitParams: {
            stripeLink: {
                overrideLinkSubmit: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                }); }); },
            },
        },
    });
    previousFormInstance = formInstance;
    if (separateFrames) {
        var singleFrame = document.querySelector('#single-frame');
        var multipleFrames = document.querySelector('#multiple-frames');
        singleFrame.style.display = 'none';
        multipleFrames.style.display = 'grid';
        formInstance
            .createElement('card-number', {
            styles: {
                color: 'lightblue',
                hideIcon: 'true',
            },
        })
            .mount('#card-number-element');
        formInstance
            .createElement('card-expiry', {
            styles: {
                color: 'lightblue',
            },
        })
            .mount('#card-expiry-element');
        formInstance
            .createElement('card-cvc', {
            styles: {
                color: 'lightblue',
            },
        })
            .mount('#card-cvc-element');
    }
    else {
        var singleFrame = document.querySelector('#single-frame');
        singleFrame.style.display = 'grid';
        var multipleFrames = document.querySelector('#multiple-frames');
        multipleFrames.style.display = 'none';
        formInstance
            .createElement('card', {
            styles: {
                color: 'lightblue',
                // hideIcon: 'true',
            },
        })
            .mount('#card-element');
    }
    (_a = document.querySelector('#submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        console.log('Submitting form...');
        formInstance.submit();
    });
    (_b = document.querySelector('#submit-paypal')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.pockytPaypal, {
            defaultFieldValues: PAYPAL_DEFAULT_VALUES,
        });
    });
    (_c = document.querySelector('#submit-paypal-redirect')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.pockytPaypal, {
            defaultFieldValues: PAYPAL_DEFAULT_VALUES,
            useRedirectFlow: true,
        });
    });
    (_d = document.querySelector('#submit-awx-google-pay')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.airwallexGooglePay);
    });
    (_e = document.querySelector('#submit-awx-apple-pay')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.airwallexApplePay);
    });
    (_f = document.querySelector('#submit-authnet-google-pay')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.authorizenetGooglePay);
    });
    (_g = document.querySelector('#submit-authnet-apple-pay')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () {
        formInstance.generalSubmit(openpay_js_1.SubmitMethods.authorizenetApplePay);
    });
    function showLoading() {
        var loadingElement = document.querySelector('#loading');
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }
    }
    function hideLoading() {
        var loadingElement = document.querySelector('#loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    function showValidationError(errors) {
        var errorContainer = document.querySelector('#validation-error-container');
        if (errorContainer) {
            errorContainer.innerHTML = "<pre data-testid=\"validation-error\">".concat(JSON.stringify(errors, null, 2), "</pre>");
            // errorContainer.style.display = 'block';
        }
    }
    function clearValidationError() {
        validationErrors = {};
        var errorContainer = document.querySelector('#validation-error-container');
        if (errorContainer) {
            errorContainer.innerHTML = "<pre data-testid=\"validation-error\">".concat(JSON.stringify(validationErrors, null, 2), "</pre>");
            // errorContainer.style.display = 'none';
        }
    }
    function showCheckoutSuccess(invoiceUrls, subscriptionIds, customerId, processorsUsed) {
        var successElement = document.querySelector('#checkout-success');
        if (successElement) {
            successElement.innerHTML = "\n      <h2 class=\"text-xl font-bold\">\uD83C\uDF89 Checkout successful!</h2>\n      <p class=\"my-2\">Invoice URLs:</p>\n      <ul data-testid=\"invoice-list\" class=\"text-sm list-inside list-decimal mb-4\">\n        ".concat(invoiceUrls.map(function (url) { return "<li class=\"mb-2\"><a href=\"".concat(url, "\" target=\"_blank\" rel=\"noreferrer\" class=\"underline\">").concat(url, "</a></li>"); }).join(''), "\n      </ul>\n      <p class=\"my-2\">Subscription IDs:</p>\n      <ul data-testid=\"subscription-list\" class=\"text-sm list-inside list-decimal\">\n        ").concat(subscriptionIds.map(function (id) { return "<li class=\"mb-2\">".concat(id, "</li>"); }).join(''), "\n      </ul>\n      <p class=\"my-2\">Customer ID:</p>\n      <p data-testid=\"customer-id\" class=\"text-sm\">").concat(customerId, "</p>\n      <p class=\"my-2\">Processors used:</p>\n      <ul data-testid=\"processors-used-list\" class=\"text-sm list-inside list-decimal\">\n        ").concat(processorsUsed.map(function (processor) { return "<li class=\"mb-2\">".concat(processor, "</li>"); }).join(''), "\n      </ul>\n    ");
            successElement.style.display = 'block';
        }
    }
    function showSetupSuccess(paymentMethodId) {
        var successElement = document.querySelector('#setup-success');
        if (successElement) {
            successElement.innerHTML = "\n      <h2 class=\"text-xl font-bold\">\uD83C\uDF89 Setup/Update successful!</h2>\n      <p class=\"my-2\">Payment method ID:</p>\n      <p data-testid=\"payment-method-id\" class=\"text-sm\">".concat(paymentMethodId, "</p>\n    ");
            successElement.style.display = 'block';
        }
    }
    function showError(errorMessage) {
        var errorContainer = document.querySelector('#error-container');
        if (errorContainer) {
            errorContainer.innerHTML = "<pre data-testid=\"overlay-message\">".concat(JSON.stringify(errorMessage, null, 2), "</pre>");
            errorContainer.style.display = 'block';
        }
    }
    function hideError() {
        var errorContainer = document.querySelector('#error-container');
        errorContainer.innerHTML = '';
        // if (errorContainer) {
        //   errorContainer.style.display = 'none';
        // }
    }
    // Initialize
    showLoading();
}
