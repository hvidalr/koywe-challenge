# 🚀 Koywe Challenge

Aplicación construida con [NestJS](https://nestjs.com/) como parte del desafío técnico de Koywe. Esta API permite generar y obtener cotizaciones (`quote`) y manejarlas de forma segura usando autenticación con JWT.

---

## 🛠️ Instrucciones para levantar la aplicación localmente

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/hvidalr/koywe-challenge.git
   cd koywe-challenge
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Crea un archivo `.env`** en la raíz del proyecto basado en el archivo de ejemplo `.env.example`.

4. **Ejecuta la aplicación en modo desarrollo**
   ```bash
   npm run start:dev
   ```

   Esto levantará el servidor en el puerto definido por la variable de entorno `PORT` (por defecto `3000`).

---

## 🧪 Cómo ejecutar las pruebas

La configuración de pruebas se encuentra en el archivo raíz `jest.config.ts`. Puedes ejecutar las pruebas unitarias con:

```bash
npm run test
```

Otras opciones:
- `npm run test:watch` → Ejecuta pruebas en modo observador.
- `npm run test:cov` → Genera reporte de cobertura.
- `npm run test:e2e` → Ejecuta pruebas end-to-end (para las que exista su correcta definición).

---

## 🗄️ Base de datos

- Se eligió **MongoDB** como base de datos principal.
- El acceso se configura mediante la variable `MONGO_CONNECTION`.
- Compatible tanto con Mongo Atlas como con instancias locales.

---

### 🔄 Conexión alternativa a MongoDB

La conexión a la base de datos está pensada para un cluster `M0` de Mongo Atlas. Si no ha habido actividad en el cluster, puede tardar en reconectar o incluso fallar. También puedes usar una conexión local como alternativa:

```env
MONGO_CONNECTION=mongodb://localhost:27017/koywe-challenge
```

---

## 🔐 Seguridad

### Autenticación con JWT

Ambos endpoints están protegidos mediante autenticación basada en JWT.

- 🔒 Se utiliza un **Guard** de NestJS para validar el token en el header `Authorization`.
- 🔑 Endpoints disponibles:
  - `POST /auth/register` → Registra un nuevo usuario.
  - `POST /auth/login` → Devuelve un token válido al autenticar.

**Comportamiento esperado:**
- ❌ Si no se envía un token.
- ❌ Si el token es inválido o expiró.
➡️ La API responde con `401 Unauthorized`.

---

## 🧪 Testing

- ✅ Las pruebas unitarias cubren los **casos de uso del dominio (Facade)**.
- 🧪 Se utiliza `jest` como framework de pruebas.

---

## 🏗️ Arquitectura

### 🛠️ Arquitectura Hexagonal y DDD

Este proyecto sigue el enfoque de **arquitectura hexagonal** y el principio de **Domain-Driven Design (DDD)** para garantizar una separación de responsabilidades clara y modular. Se estructura en capas que definen las fronteras entre el dominio central (logística de negocio), la infraestructura (acceso a datos y APIs externas) y las interfaces (controladores y comunicación con el mundo exterior).

La **capa de dominio** incluye todas las reglas y entidades de negocio, mientras que la **capa de infraestructura** maneja las conexiones externas (como MongoDB o servicios de terceros). Finalmente, la **capa de interfaz** expone la lógica a través de endpoints API.

### 🔑 Uso de Facades

La aplicación hace uso del patrón **Facade** para simplificar la interacción con la lógica compleja del dominio. Esto permite que las capas externas se comuniquen con la lógica de negocio de manera más sencilla, sin tener que lidiar con la complejidad interna del sistema.

---

## 🤖 Uso de IA

Durante el desarrollo de este proyecto, se aprovechó de las ventajas de la **Inteligencia Artificial** para optimizar el proceso de desarrollo:

- **GitHub Copilot**: Se utilizó para consultas sobre optimización de código, sugerencias de mejores prácticas y ayuda en la escritura de algunas funciones. También fue de gran apoyo en la generacion de pruebas unitarias.

- **ChatGPT**: Se ha utilizado para generar automáticamente este **README.md**, asegurando que la documentación fuera detallada, clara y bien estructurada, con el fin de que fuera fácil de entender para cualquier desarrollador que desee levantar o contribuir al proyecto.

---

## 📂 Estructura de carpetas (simplificada)

```
src/
├── app/
│   └── quote/
│       ├── application/        # Casos de uso y lógica de dominio
│       ├── domain/             # Entidades y validadores
│       ├── infrastructure/     # Conexiones externas (DB, APIs)
├── auth/                       # Registro, login y seguridad JWT
├── main.ts                     # Punto de entrada
.env                            # Archivo de entorno
jest.config.ts                  # Configuración de pruebas
```

---

## 🎯 Objetivos cumplidos

- ✅ Aplicación NestJS modular, clara y escalable.
- ✅ Protección de rutas mediante autenticación JWT.
- ✅ Persistencia en MongoDB.
- ✅ Pruebas unitarias configuradas y listas para ejecutarse.
- ✅ Arquitectura hexagonal y uso de DDD implementados.
- ✅ Facade utilizado para simplificar interacción con el dominio.
- ✅ IA utilizada para optimización de código y generación de documentación.

---
