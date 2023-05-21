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
        if (pins.analogReadPin(AnalogPin.P2) > 550 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
            radio.sendValue("HAUT", pins.analogReadPin(AnalogPin.P2))
        } else if (pins.analogReadPin(AnalogPin.P2) < 450 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
            radio.sendValue("BAS", pins.analogReadPin(AnalogPin.P2))
        } else if (pins.analogReadPin(AnalogPin.P1) < 450 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
            radio.sendValue("GAUCHE", pins.analogReadPin(AnalogPin.P1))
        } else if (pins.analogReadPin(AnalogPin.P1) > 550 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
            radio.sendValue("DROITE", pins.analogReadPin(AnalogPin.P1))
        } else {
            radio.sendString("STOP")
        }
    }
})
