/**
 * Test for getting started with Selenium.
 */
"use strict";

const {webdriver, Builder, By, Key, until} = require('selenium-webdriver'),
test = require('selenium-webdriver/testing'),
assert = require('assert');

let browser;

// Does not work with WSL!! Use cygwin



// Test suite
test.describe("Me-vue", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new Builder().forBrowser('chrome').build();

        browser.get("http://me-vue.edwardnilsson.se/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertH2(target) {
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }



    // Test case
    test.it("Test index", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "me-vue");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "me-vue");
        });

        assertH1("Me");
        matchUrl("#/");

        done();
    });



    test.it("Test go to Register", function(done) {
        goToNavLink("Register");

        // get h1 text
        assertH1("Register");
        matchUrl("#/register");

        done();
    });



    test.it("Test go to Login", function(done) {
        goToNavLink("Login");

        // get h1 text
        assertH1("Login");
        matchUrl("#/login");

        done();
    });

});
