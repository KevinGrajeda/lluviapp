import dht
import machine
import network
import urequests
import time

# Set up the Wi-Fi connection
def connect_to_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    if not wlan.isconnected():
        print("Connecting to Wi-Fi...")
        wlan.active(True)
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            pass
    print("Connected to Wi-Fi")

ledLluviaAhora = machine.Pin(26, machine.Pin.OUT)
ledLluviaEnUnaHora = machine.Pin(27, machine.Pin.OUT)
dht_pin = 14
dht_sensor = dht.DHT11(machine.Pin(dht_pin))

api_url = "https://orange-space-waffle-q4gxxp5w6ww29664-3000.app.github.dev/api/sensor"

# Wi-Fi
ssid = "red"
password = "contraseña"

connect_to_wifi(ssid, password)

while True:
    try:
        dht_sensor.measure()
        temperature = dht_sensor.temperature()
        humidity = dht_sensor.humidity()
        
        data = {
            "temperature": temperature,
            "humidity": humidity
        }
        print(data)
        
        
        response = urequests.post(api_url, json=data)
        lluviaAhora = response.json()["lluviaAhora"]
        lluviaEnUnaHora = response.json()["lluviaEnUnaHora"]
        response.close()
        print("Lluvia ahora:", lluviaAhora)
        print("Lluvia en una hora:", lluviaEnUnaHora)
        
        if lluviaAhora:
            ledLluviaAhora.on()
        else:
            ledLluviaAhora.off()
        if lluviaEnUnaHora:
            ledLluviaEnUnaHora.on()
        else:
            ledLluviaEnUnaHora.off()
        
    except Exception as e:
        print("Error:", e)
    
    time.sleep(1)
