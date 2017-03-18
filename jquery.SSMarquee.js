/*
Plugin: jQuery SSMarquee
Version 1.0
Author: Bilâl AFŞAR
Author URL: https://www.bilalafsar.com/

Plugin URL : https://github.com/bafsar/jQuery.SSMarquee
Example URL: https://www.bilalafsar.com/Upload/Files/jQuery.SSMarquee.Demo.html
Licence: MIT Licence
*/

var $ = jQuery;
$.fn.SSMarquee = function (settings) {
    // ds means Default Speed
    var dS = 45;
    // dBs means Default Buffer Size
    var dBs = 10;
    // dSa means Default Scroll Amount
    var dSa = 1;
    settings = $.extend({
        direction: "top",
        speed: dS,
        scrollAmount: dSa,
        pauseOnHover: true,
        bufferSize: dBs
    },
        settings);

    /*  maxSpeed : 10, minSpeed: 70 */
    var minS = 10;
    var maxS = 70;
    var ts = parseInt(settings.speed);
    settings.speed = isNaN(ts) ? dS : (ts < minS ? minS : (ts > maxS ? maxS : ts));

    var minSa = 0;
    var tsa = parseFloat(settings.scrollAmount.toString().replace(",", "."));
    settings.scrollAmount = isNaN(tsa) ? dSa : (tsa <= minSa ? dSa : tsa);

    var minBs = 0;
    var tbs = parseInt(settings.bufferSize);
    settings.bufferSize = isNaN(tbs) ? dBs : (tbs < minBs ? minBs : tbs);

    // w means wrapper
    var w = $(this);
    w.css("overflow", "hidden");

    var backupContent = w.find(":first");

    var setMarquee = function () {

        var marqueeFunction = function () {
            // c means content (first and only item of wrapper)
            var c = w.find(":first");

            // i means interval (it sets inside of start function)
            var i = 0;
            // bs means Buffer Size (as px)
            var bs = settings.bufferSize;

            var ch = c.height();
            var cw = c.width();
            var wh = w.height();
            var ww = w.width();

            // l0P => leftZeroPosition, t0P => topZeroPosition, b0P => bottomZeroPosition, r0P => rightZeroPosition 
            var l0P = c.offset().left;
            var t0P = c.offset().top;
            var b0P = c.offset().top + w.height();
            var r0P = c.offset().left + w.width();

            var rtlSp = r0P + bs;
            var ltrSp = t0P + wh;
            var bttSp = t0P + wh + bs;
            var ttbSp = t0P - (ch + bs);

            var moveToRight = function (o, offset, amount) {
                o.offset({ left: offset.left + amount });
                if (o.offset().left >= (r0P + bs)) {
                    o.offset({ left: (l0P - (cw + bs)) });
                }
            }
            var moveToLeft = function (o, offset, amount) {
                o.offset({ left: offset.left - amount });
                if (o.offset().left <= (l0P - (cw + bs))) {
                    o.offset({ left: l0P + ww + bs });
                }
            }
            var moveToTop = function (o, offset, amount) {
                o.offset({ top: offset.top - amount });
                if (o.offset().top <= (t0P - (ch + bs))) {
                    o.offset({ top: t0P + wh + bs });
                }
            }
            var moveToBottom = function (o, offset, amount) {
                o.offset({ top: offset.top + amount });
                if (o.offset().top >= (b0P + bs)) {
                    o.offset({ top: (t0P - (ch + bs)) });
                }
            }

            var setStartPosition = function () {
                switch (settings.direction) {
                    case "right":
                        c.offset({ left: ltrSp });
                        break;
                    case "left":
                        c.offset({ left: rtlSp });
                        break;
                    case "bottom":
                        c.offset({ top: ttbSp });
                        break;
                    default:
                        c.offset({ top: bttSp });
                        break;
                };
            }

            var start = function () {
                var sa = settings.scrollAmount;
                i = setInterval(function () {
                    var ofs = c.offset();
                    switch (settings.direction) {
                        case "right":
                            moveToRight(c, ofs, sa);
                            break;
                        case "left":
                            moveToLeft(c, ofs, sa);
                            break;
                        case "bottom":
                            moveToBottom(c, ofs, sa);
                            break;
                        default:
                            moveToTop(c, ofs, sa);
                            break;
                    };
                },
                    settings.speed);
            }

            if (settings.pauseOnHover) {
                $(w)
                    .hover(function () {
                        clearInterval(i);
                    },
                        function () {
                            start();
                        });
            };

            setStartPosition();
            start();
        }
        marqueeFunction();
    }

    $(window)
    .resize(function () {
        w.html(backupContent.clone());
        setMarquee();
    })
    .resize();
};
