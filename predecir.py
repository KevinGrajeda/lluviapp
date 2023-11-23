import sys
from joblib import load

def predecir(temperature, humidity):

    model = load('modelo_lluvia.joblib')
    result = model.predict([[temperature, humidity]])
    return result

if __name__ == "__main__":
    # Check if both parameters are provided
    if len(sys.argv) != 3:
        print("Usage: python python-script.py <param1> <param2>")
        sys.exit(1)

    temperature = sys.argv[1]
    humidity = sys.argv[2]

    result = predecir(temperature, humidity)
    print(f'{result[0][0]},{result[0][1]}')