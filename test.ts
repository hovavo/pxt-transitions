transitions.fromToWithRef(0, 1, 1, easing.EasingFunctions.EaseIn, function (value, transition) {
    if (transition.frame > 10) {
        transition.stop()
    }
})

basic.forever(function () {
    transitions.fromTo(0, 1024, 3, easing.EasingFunctions.EaseInOut, function (value) {
        pins.analogWritePin(AnalogPin.P0, value)
    })
    transitions.fromTo(1024, 0, 3, easing.EasingFunctions.EaseInOut, function (value) {
        pins.analogWritePin(AnalogPin.P0, value)
    })
})
