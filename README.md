# jQuery.SSMarquee
A jQuery plugin instead of traditional -obsolete- marquee tag


## Demo:
[Demo on my website](https://www.bilalafsar.com/Upload/Files/jQuery.SSMarquee.Demo.html)

## Using
```html
// Default parameters
$(".marqueeElement").SSMarquee();

// Custom parameters
$(".marqueeElement").SSMarquee({ direction: "bottom", speed: 30, scrollAmount: 1.2, pauseOnHover: false, bufferSize: 20 });
```

## Parameters:
* **direction** : Flow direction. It can take these values: "top", "bottom", "left", "right". Defaut value is "top".
* **speed** : Flow speed as milisecond. Lower value means faster. It takes an integer value. It must be between 10 and 70 . Default value is 45.
* **scrollAmount** : Flow amount as px. It takes a float value. When value is lower than zero or invalid, the value is set to 1.
* **pauseOnHover** : Is flow pause on mouse hover on element. Default value is true.
* **bufferSize** : Space size as px. Before and after complete of flow, adds some space. It takes an integer value. Default value is 10.

## Notes:
* For adaptation of responsive structure, when window resize, the marquee is resets.
* **marqueeElement must have just one element. You can add anything you want inside of this element.**
