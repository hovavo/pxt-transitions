namespace smoothing {

    //% block="create smoothed variable named $value || with $time ms "
    //% blockSetVariable=smoothed
    //% time.shadow="timePicker"
    //% time.min=0 time.defl=300
    export function createSmoothedVariable(value: number, time?: number, ease?: easing.EasingFunctions): SmoothedVariable
    {
        return new SmoothedVariable(value, time, ease);
    }

    export class SmoothedVariable {
        _defaultTime = 300;
        _defaultEase = easing.EasingFunctions.Linear;
        _transition: transitions.Transition;
        _target = 0;
        _currentValue = 0;

        constructor(value: number, defaultTime?: number, defaultEase?: easing.EasingFunctions) {
            this._defaultTime = defaultTime || this._defaultTime;
            this._defaultEase = defaultEase || this._defaultEase;
            this._currentValue = value;
        }

        //% block="smooth $this to $value"
        //% this.defl=smoothed
        //% this.shadow=variables_get
        transitionTo(value: number) {
            this.target = value;

            const props: transitions.TransitionProps = {
                from: this._currentValue,
                to: this._target,
                easing: this._defaultEase,
                time: this._defaultTime,
                handler: (value: number) => this.onUpdate(value)
            }

            this._transition = new transitions.Transition(props);
            control.inBackground(() => {
                this._transition.play()
            })
        }

        onUpdate(value: number) {
            this._currentValue = value;
        }
        
        get target() {
            return this._target;
        }

        set target(value:number) {
            this._target = value;
            if (this._transition && this._transition.running) {
                console.log("kill");
                this._transition.stop();
                this._transition = null;
            }
        }

        //% block="value of $this"
        //% this.defl=smoothed
        //% this.shadow=variables_get
        get value() {
            return this._currentValue;
        }

        //% block="jump $this to $value"
        //% this.defl=smoothed
        //% this.shadow=variables_get
        setValue(value: number) {
            this.target = value;
            this._currentValue = value;
        }

        //% block="debug $this"
        //% advanced=true
        //% this.defl=smoothed
        //% this.shadow=variables_get
        debug() {
            console.log({
                value: this.value,
                target: this.target
            });
        }
    }
}