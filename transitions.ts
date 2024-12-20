

//% color="#0BA000" icon="\uf017"
namespace transitions {

    export type TransitionProps = {
        from: number;
        to: number;
        time: number;
        easing: easing.EasingFunctions;
        handler: (value: number, transition: Transition) => void;
    }


    let framesPerSecond = 100;

    //% blockId=numberPicker
    //% block="$value"
    //% blockHidden=true
    //% value.fieldEditor="numberdropdown"
    //% value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.values='1, 10, 25, 50, 100'
    //% value.defl='100'
    export function __numberPicker(value: number): number {
        return value;
    }

    //% block="set frames per seconds to $value"
    //% value.shadow="numberPicker"
    export function setFps(value: number) {
        framesPerSecond = Math.min(Math.max(value, 1), 100);
    }

    //% block="change $value from $from to $to over $time ms ($easing)"
    //% handlerStatement=1
    //% expandableArgumentMode="enabled"
    //% draggableParameters="reporter"
    //% to.defl=1 
    //% time.shadow="timePicker"
    //% time.min=0 time.defl=1000
    //% easing.fieldEditor="gestures"
    //% easing.fieldOptions.columns=4
    //% easing.defl=easing.EasingFunctions.EaseInOut
    export function fromTo(from: number, to: number, time: number, easing: easing.EasingFunctions, handler: (value: number) => void) {
        new Transition({
            from, to, time, easing, handler
        }).play()
    }

    //% block="new $transition of $value from $from to $to over $time ms ($easing)"
    //% advanced=true
    //% handlerStatement=1
    //% expandableArgumentMode="enabled"
    //% draggableParameters="reporter"
    //% to.defl=1 
    //% time.shadow="timePicker"
    //% time.min=0 time.defl=1000
    //% easing.fieldEditor="gestures"
    //% easing.fieldOptions.columns=4
    //% easing.defl=easing.EasingFunctions.EaseInOut
    export function fromToWithRef(from: number, to: number, time: number, easing: easing.EasingFunctions, handler: (value: number, transition: Transition) => void) {
        new Transition({
            from, to, time, easing, handler
        }).play()
    }

    export class Transition {
        _props: TransitionProps;
        _frameDuration = 1000 / framesPerSecond;
        _totalFrames = 0;
        _currentFrame = 0;
        _currentValue = 0;
        _running = false;
        _progress = 0;
        _range = 0;
        _easingFn: easing.EasingFunction = easing.linear;;

        constructor(props: TransitionProps) {
            this._props = props;
            this._totalFrames = this._props.time / this._frameDuration;
            this._range = this._props.to - this._props.from;
            this._easingFn = easing.easingFunctionMap[this._props.easing] || this._easingFn;
        }

        play() {
            this._running = true;
            this._currentValue = this._props.from;
            this._progress = 0;
            for (this._currentFrame = 0; this._currentFrame <= this._totalFrames; this._currentFrame++) {
                // Last frame should be the exact value provided
                if (this._currentFrame === this._totalFrames)
                    this._currentValue = this._props.to;
                
                this._progress = this._currentFrame / this._totalFrames;
                this._currentValue = Math.round(this._easingFn(this._progress) * this._range + this._props.from);
                // Callback function
                this._props.handler(this._currentValue, this);
                // Pause
                basic.pause(this._frameDuration);

                if (!this._running) break;
            }
            this.stop();
        }

        //% block="stop $this"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        stop() {
            this._running = false;
        }

        //% block="$this is running"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        get running() {
            return this._running;
        }

        //% block="$this current frame"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        get frame() {
            return this._currentFrame;
        }

        //% block="$this total frames"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        get total() {
            return this._totalFrames;
        }

        //% block="$this current value"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        get value() 
        {
            return this._currentValue;
        }

        //% block="$this tharget"
        //% advanced=true
        //% this.defl=transition
        //% this.shadow=variables_get
        get target() {
            return this._props.to;
        }
    }

    //% block="print $value to console"
    //% advanced=true
    //% this.defl=value
    //% this.shadow=variables_get
    export function log(value: number) {
        console.log(value);
    }

}