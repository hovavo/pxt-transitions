
# Smooth:Bit
Data smoothing and animation for micro:bit

```blocks
transitions.fromTo(0, 1023, 1000, easing.EasingFunctions.EaseInOut, function (value) {
    pins.analogWritePin(AnalogPin.P0, value)
})
```

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
