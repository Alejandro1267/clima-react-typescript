# Buscador de Clima

Aplicación React + TypeScript + Vite que consulta la API de OpenWeather para mostrar el clima actual de cualquier ciudad. El flujo principal consiste en ingresar ciudad y país, invovar el hook _useWeather_ y renderizar los resultados validados por Zod.

## Características Principales

- **Hook Especializado _useWeather_:** Orquesta la geocodificación, la consulta del clima y normaliza la respuesta con Zod, exponiendo _weather_, _isLoading_, _notFound_, _hasWeatherData_ y _fetchWeather_ para la UI.
- **Validación y Transformación con Zod:** Se asegura que la respuesta de OpenWeather cumpla con la forma esperada y la adapta a un modelo interno.
- **Conversión de Unidades:** Los valores Kelvin se transforman a Celsius.
- **Formulario Controlado:** Tiene validaciones básicas que dispara la búsqueda al enviar.
- **Feedback Visual:** _Spinner_ circular mientras carga los datos.
- **Composición Simple en App:** Conecta el hook con los componentes de UI y muestra estados condicionales.

### URL del Proyecto:

https://taupe-jelly-c609f2.netlify.app
