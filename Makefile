.DEFAULT_GOAL := help

.PHONY: help
help:  ## Show this help.
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

.PHONY: generate-fallback-glyphs
generate-fallback-glyphs:  ## Generate fallback glyphs for the font
	cd font/ && npm run generate-fallback-glyphs

.PHONY: generate-glyphs
generate-glyphs:  ## Generate all glyphs for the font
	cd font/ && npm run generate-glyphs

.PHONY: generate-font
generate-font:  ## Generate the font using IcoMoon.io
	cd font/ && npm run generate-font

.PHONY: bundle-font
bundle-font:  ## Bundle the font to a zip file
	cd font/dist && zip -r sonatine.zip sonatine sonatine.css specimen.html

.PHONY: run-server
run-server:  ## Run the server locally
	cd server && npm run start

.PHONY: install-webapp
install-webapp:  ## Install webapp dependencies
	cd webapp && npm install

.PHONY: run-webapp
run-webapp:  ## Run the webapp locally
	cd webapp && npm run start

.PHONY: build-webapp
build-webapp:  ## Build the webapp
	cd webapp && npm run build
