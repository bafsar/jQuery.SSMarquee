/*!
Plugin: jQuery SSMarquee
Version 1.2
Author: Bilâl AFŞAR
Author URL: https://www.bilalafsar.com/

Plugin URL : https://github.com/bafsar/jQuery.SSMarquee
Example URL: https://www.bilalafsar.com/Upload/Files/jQuery.SSMarquee.Demo.html
Licence: MIT Licence
*/
(function($) {

    "use strict";

    $.fn.SSMarquee = function(settings) {

        const defaultSpeed = 45;
        const defaultbufferSize = 10;
        const defaultScrollAmount = 1;

        settings = $.extend({
                direction: "top",
                speed: defaultSpeed,
                scrollAmount: defaultScrollAmount,
                pauseOnHover: true,
                bufferSize: defaultbufferSize
            },
            settings);

        /*  maxSpeed : 10, minSpeed: 70 */
        const minSpeed = 10;
        const maxSpeed = 70;
        const givenSpeed = parseInt(settings.speed);
        settings.speed = isNaN(givenSpeed)
            ? defaultSpeed
            : (givenSpeed < minSpeed ? minSpeed : (givenSpeed > maxSpeed ? maxSpeed : givenSpeed));

        const minScrollAmount = 0;
        const givenScrollAmount = parseFloat(settings.scrollAmount.toString().replace(",", "."));
        settings.scrollAmount = isNaN(givenScrollAmount)
            ? defaultScrollAmount
            : (givenScrollAmount <= minScrollAmount ? defaultScrollAmount : givenScrollAmount);

        const minBufferSize = 0;
        const givenBufferSize = parseInt(settings.bufferSize);
        settings.bufferSize = isNaN(givenBufferSize)
            ? defaultbufferSize
            : (givenBufferSize < minBufferSize ? minBufferSize : givenBufferSize);

        // Added version: 1.2
        if ($(this).length > 1) {
            $(this).each(function(index, value) {
                const obj = $(this);

                let id = obj.attr("id");
                if (id === undefined || id === "") {
                    id = `ssmarquee-${index}`;
                    obj.attr("id", id);
                }

                const sameIdentifiedElements = $(`[id=${id}]`);
                if (sameIdentifiedElements.length > 1) {
                    sameIdentifiedElements.each(function(i, v) {
                        if (i > 0) {
                            const newId = $(this).attr("id") + "-" + i;
                            $(this).attr("id", newId);
                        }
                    });
                }

                $(`#${id}`).SSMarquee(settings);
            });
            return false;
        }

        var wrapper = $(this);
        wrapper.css("overflow", "hidden");
        // Added version: 1.1
        wrapper.find(":first").css("display", "none");

        var backupContent = wrapper.find(":first");

        var setMarquee = function() {

            wrapper.html(backupContent.clone());

            // content (first and only item of wrapper)
            var content = wrapper.find(":first");

            // Added version: 1.1
            content.css("display", "");

            // interval (it sets inside of start function)
            var interval = 0;
            // Buffer Size (as px)
            var bufferSize = settings.bufferSize;

            var contentHeight = content.height();
            var contentWidth = content.width();
            var wrapperHeight = wrapper.height();
            var wrapperWidth = wrapper.width();

            var leftZeroPosition = content.offset().left;
            var topZeroPosition = content.offset().top;
            var bottomZeroPosition = content.offset().top + wrapper.height();
            var rightZeroPosition = content.offset().left + wrapper.width();

            var rightToLeftStartPosition = rightZeroPosition + bufferSize;
            var leftToRightStartPosition = topZeroPosition + wrapperHeight;
            var bottomToTopStartPosition = topZeroPosition + wrapperHeight + bufferSize;
            var topToBottomStartPosition = topZeroPosition - (contentHeight + bufferSize);

            var moveToRight = function(object, offset, amount) {
                object.offset({ left: offset.left + amount });
                if (object.offset().left >= (rightZeroPosition + bufferSize)) {
                    object.offset({ left: (leftZeroPosition - (contentWidth + bufferSize)) });
                }
            };
            var moveToLeft = function(object, offset, amount) {
                object.offset({ left: offset.left - amount });
                if (object.offset().left <= (leftZeroPosition - (contentWidth + bufferSize))) {
                    object.offset({ left: leftZeroPosition + wrapperWidth + bufferSize });
                }
            };
            var moveToTop = function(object, offset, amount) {
                object.offset({ top: offset.top - amount });
                if (object.offset().top <= (topZeroPosition - (contentHeight + bufferSize))) {
                    object.offset({ top: topZeroPosition + wrapperHeight + bufferSize });
                }
            };
            var moveToBottom = function(object, offset, amount) {
                object.offset({ top: offset.top + amount });
                if (object.offset().top >= (bottomZeroPosition + bufferSize)) {
                    object.offset({ top: (topZeroPosition - (contentHeight + bufferSize)) });
                }
            };

            const setStartPosition = function() {
                switch (settings.direction) {
                case "right":
                    content.offset({ left: leftToRightStartPosition });
                    break;
                case "left":
                    content.offset({ left: rightToLeftStartPosition });
                    break;
                case "bottom":
                    content.offset({ top: topToBottomStartPosition });
                    break;
                default:
                    content.offset({ top: bottomToTopStartPosition });
                    break;
                };
            };

            var start = function() {
                var scrollAmount = settings.scrollAmount;
                interval = setInterval(function() {
                        const offset = content.offset();
                        switch (settings.direction) {
                        case "right":
                            moveToRight(content, offset, scrollAmount);
                            break;
                        case "left":
                            moveToLeft(content, offset, scrollAmount);
                            break;
                        case "bottom":
                            moveToBottom(content, offset, scrollAmount);
                            break;
                        default:
                            moveToTop(content, offset, scrollAmount);
                            break;
                        };
                    },
                    settings.speed);
            };

            if (settings.pauseOnHover) {
                $(wrapper)
                    .hover(function() {
                            clearInterval(interval);
                        },
                        function() {
                            start();
                        });
            };

            setStartPosition();
            start();
        };

        // Changed version: 1.1
        setTimeout(function() { setMarquee(); }, 1000);

        // Changed version: 1.1
        $(window)
            .resize(function() {
                setMarquee();
            });
    };
})(jQuery);
