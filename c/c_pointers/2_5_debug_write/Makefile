ARDUINO := arduino-cli
BOARD := espressif:esp32:m5stack-core-esp32
PORT := /dev/cu.SLAB_USBtoUART
TTY := /dev/tty.SLAB_USBtoUART
BAUD := 115200
PROJECT := $(shell basename "$$PWD")
BUILD_DIR := build
BUILD_PATH = $(realpath $(BUILD_DIR))
BOARD_IN_PATH := $(subst :,.,$(BOARD))
DEFINES := -DDEBUG
BUILD_PROPERTIES = "build.defines=$(DEFINES)"
PROJECT_DIR := $(abspath .)

.PHONY: prepare
prepare:
	mkdir -p $(abspath $(BUILD_DIR))

.PHONY: compile
compile: prepare
	$(ARDUINO) compile -b $(BOARD) \
		--build-path $(BUILD_PATH) \
		--build-cache-path $(BUILD_PATH) \
		--build-properties $(BUILD_PROPERTIES) \
		$(PROJECT_DIR)

.PHONY: upload
upload:
	cp $(BUILD_PATH)/$(PROJECT).ino.partitions.bin $(PROJECT_DIR)/$(PROJECT).$(BOARD_IN_PATH).partitions.bin
	$(ARDUINO) upload -b $(BOARD) -p $(PORT) -t $(PROJECT_DIR)

.PHONY: clean
clean:
	rm -f $(PROJECT_DIR)/*.bin
	rm -f $(PROJECT_DIR)/*.elf

.PHONY: all
all: compile upload clean

.DEFAULT_GOAL := all
