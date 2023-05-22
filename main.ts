let VitB = 0
let VitA = 0
let DirB = 0
let DirA = 0
let Y = 0
let X = 0
radio.setGroup(1)
pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendString("E")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        radio.sendString("C")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendString("F")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendString("D")
    } else if (input.buttonIsPressed(Button.A)) {
        radio.sendString("A")
    } else if (input.buttonIsPressed(Button.B)) {
        radio.sendString("B")
    } else {
        X = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
        Y = Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, -100, 100)
        if (Y > X && Y > 5) {
            DirA = 1
            DirB = 1
            if (X > 0) {
                VitA = Math.abs(Y)
                VitB = Math.abs(Y) - Math.abs(X)
            } else {
                VitA = Math.abs(Y) - Math.abs(X)
                VitB = Math.abs(Y)
            }
        } else if (Y < X && Y < -5) {
            DirA = -1
            DirB = -1
            if (X > 0) {
                VitA = Math.abs(Y)
                VitB = Math.abs(Y) - Math.abs(X)
            } else {
                VitA = Math.abs(Y) - Math.abs(X)
                VitB = Math.abs(Y)
            }
        } else if (X > Y && X > 5) {
            DirA = 1
            DirB = -1
            VitA = Math.abs(X) - Math.abs(Y)
            VitB = Math.abs(X) - Math.abs(Y)
        } else if (X < Y && X < -5) {
            DirA = -1
            DirB = 1
            VitA = Math.abs(X) - Math.abs(Y)
            VitB = Math.abs(X) - Math.abs(Y)
        } else {
            VitA = 0
            VitB = 0
            DirA = 1
            DirB = 1
        }
        radio.sendValue("MA", DirA * VitA)
        radio.sendValue("MB", DirB * VitB)
    }
})
