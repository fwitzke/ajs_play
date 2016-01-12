.PHONY: install
install: Gemfile.lock node_modules $(bower)

node_modules: package.json
	@npm install
	@touch $@

Gemfile.lock: Gemfile
	@bundle install

.PHONY: test.unit
test.unit:
	@node_modules/mocha/bin/mocha --require test/modify_path --require test/mock_asset_paths --recursive

.PHONY: selenium
selenium: node_modules
	@webdriver-manager update
	@webdriver-manager start >log/selenium_webdriver.log 2>&1

.PHONY: test.integration
test.integration:
	@protractor integration/conf.js

.PHONY: test.spec
test.spec:
	@rspec spec

.PHONY: test
test: test.unit test.integration test.spec
