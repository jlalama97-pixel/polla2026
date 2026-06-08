# 🏆 POLLA MUNDIALISTA 2026 — Guía de Instalación

Esta guía te lleva desde cero hasta tener la app publicada en internet para que tus amigos puedan acceder.
**Tiempo estimado: 30-45 minutos.**

---

## Herramientas que necesitas instalar primero

### 1. Node.js
Entra a https://nodejs.org y descarga la versión **LTS** (la recomendada).
Instálalo normalmente. Para verificar que funciona, abre la Terminal (Mac) o el Símbolo del sistema (Windows) y escribe:
```
node --version
```
Debe mostrarte algo como `v20.x.x`

### 2. Visual Studio Code (editor de código, opcional pero recomendado)
Descárgalo gratis desde https://code.visualstudio.com

---

## PASO 1 — Descargar el proyecto

1. Descomprime el archivo `polla2026.zip` que descargaste
2. Abre la carpeta `polla2026` con VS Code, o navega a ella en la Terminal:
   ```
   cd ruta/a/la/carpeta/polla2026
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
   Esto descarga todo lo necesario. Puede tardar 1-2 minutos.

---

## PASO 2 — Crear tu proyecto en Firebase (la base de datos)

Firebase es el servicio de Google que guardará los datos de todos tus amigos.
**Es gratis** para proyectos pequeños como este.

### 2a. Crear cuenta y proyecto
1. Ve a https://firebase.google.com y pulsa **"Comenzar"**
2. Inicia sesión con tu cuenta de Google
3. Pulsa **"Agregar proyecto"**
4. Ponle un nombre (ej: `polla2026`)
5. Desactiva Google Analytics (no lo necesitas) → **Crear proyecto**

### 2b. Activar la base de datos (Firestore)
1. En el menú izquierdo → **"Firestore Database"**
2. Pulsa **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de producción"**
4. Elige la ubicación más cercana a ti (ej: `europe-west3` para Europa)
5. Pulsa **Listo**

### 2c. Configurar las reglas de seguridad
1. En Firestore → pestaña **"Reglas"**
2. Borra todo el texto que hay y pega esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Cualquier usuario registrado puede leer la tabla y partidos
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == uid;
    }

    match /usernames/{username} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }

    match /predictions/{predId} {
      allow read: if request.auth != null;
      // Solo puede escribir el dueño de la predicción
      allow write: if request.auth != null
        && request.auth.uid == resource.data.uid
           || request.auth.uid == request.resource.data.uid;
    }

    match /results/{matchId} {
      allow read: if request.auth != null;
      // Solo admins pueden escribir resultados (refuerzo en el código)
      allow write: if request.auth != null;
    }
  }
}
```

3. Pulsa **Publicar**

### 2d. Activar la autenticación
1. En el menú izquierdo → **"Authentication"**
2. Pulsa **"Comenzar"**
3. En la pestaña **"Sign-in method"** → pulsa **"Correo electrónico/contraseña"**
4. Activa la primera opción → **Guardar**

### 2e. Obtener las claves de tu proyecto
1. Haz clic en el engranaje ⚙️ (arriba a la izquierda) → **"Configuración del proyecto"**
2. Baja hasta la sección **"Tus apps"**
3. Pulsa el icono **</>** (web)
4. Ponle un nombre (ej: `polla-web`) → **Registrar app**
5. Verás un bloque de código con tus claves. **Cópialo**, lo necesitarás en el paso 3.

---

## PASO 3 — Configurar las claves en el proyecto

1. En la carpeta `polla2026`, busca el archivo `.env.example`
2. **Cópialo** y renómbralo a `.env.local`
   - En Mac/Linux: `cp .env.example .env.local`
   - En Windows: copiar y pegar el archivo, renombrarlo
3. Abre `.env.local` con VS Code o cualquier editor de texto
4. Rellena los valores con las claves de Firebase que copiaste:

```
VITE_FIREBASE_API_KEY=AIzaSy...        ← tu apiKey
VITE_FIREBASE_AUTH_DOMAIN=polla2026.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=polla2026
VITE_FIREBASE_STORAGE_BUCKET=polla2026.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

5. Guarda el archivo

---

## PASO 4 — Obtener clave de la API de fútbol (resultados automáticos)

1. Ve a https://www.football-data.org/
2. Pulsa **"Register"** y crea una cuenta gratuita
3. Confirma tu email
4. Entra a tu cuenta → verás tu **API Key** en el dashboard
5. Cópiala y pégala en `.env.local`:
```
VITE_FOOTBALL_API_KEY=tu_clave_aqui
```

> **Nota:** La API empieza a funcionar cuando comiencen los partidos del Mundial (junio 2026).
> Hasta entonces, puedes entrar resultados manualmente desde el panel de Admin.

---

## PASO 5 — Probar la app en tu ordenador

En la Terminal, dentro de la carpeta `polla2026`:
```
npm run dev
```

Debería abrirse la app en http://localhost:5173

**Crea tu cuenta de admin:**
- Ve a "Registrarse"
- Código de invitación: `MUNDIAL26`
- Usuario: `admin` (este usuario tiene acceso al panel de Admin)
- Contraseña: la que quieras (mín. 6 caracteres)

Si todo funciona, ¡perfecto! Pasamos al último paso.

---

## PASO 6 — Publicar en internet con Vercel (gratis)

### 6a. Subir el código a GitHub
1. Ve a https://github.com y crea una cuenta gratuita si no tienes
2. Pulsa **"New repository"** → nómbralo `polla2026` → **Create**
3. En la Terminal (dentro de la carpeta del proyecto):
   ```
   git init
   git add .
   git commit -m "Polla Mundialista 2026"
   git remote add origin https://github.com/TU_USUARIO/polla2026.git
   git push -u origin main
   ```

### 6b. Conectar con Vercel
1. Ve a https://vercel.com y crea una cuenta gratuita (puedes entrar con GitHub)
2. Pulsa **"Add New Project"**
3. Selecciona tu repositorio `polla2026`
4. En la sección **"Environment Variables"**, añade todas las variables de tu `.env.local`:
   - `VITE_FIREBASE_API_KEY` → tu valor
   - `VITE_FIREBASE_AUTH_DOMAIN` → tu valor
   - (y todas las demás...)
5. Pulsa **Deploy**

¡Vercel construirá y publicará tu app automáticamente!

### 6c. Tu URL
Vercel te dará una URL como:
```
https://polla2026-tu-usuario.vercel.app
```

**Comparte esa URL con tus amigos junto con el código de invitación: `MUNDIAL26`**

---

## Cómo personalizar el código de invitación

Abre `src/data.js` y cambia la línea:
```javascript
export const INVITE_CODE = 'MUNDIAL26'
```
Por el código que prefieras, ej:
```javascript
export const INVITE_CODE = 'AMIGOS2026'
```

---

## Cómo cambiar los equipos

Los grupos están en `src/data.js` en el objeto `GRUPOS`.
Los grupos reales del Mundial 2026 se conocerán el día del sorteo.
Cuando los sepas, actualiza los equipos y vuelve a hacer `git push` — Vercel actualizará la web automáticamente.

---

## Solución de problemas

**"Error: Firebase not initialized"**
→ Verifica que el archivo `.env.local` existe y tiene todos los valores correctos.

**"Authentication error"**
→ Verifica que activaste "Correo electrónico/contraseña" en Firebase Authentication.

**No puedo entrar con usuario "admin"**
→ El usuario admin se registra como cualquier otro con código `MUNDIAL26`. El sistema lo reconoce automáticamente como admin por el nombre de usuario.

**Vercel no encuentra las variables de entorno**
→ En Vercel, ve a tu proyecto → Settings → Environment Variables, y asegúrate de que todas están añadidas.

---

## ¿Necesitas ayuda?

Pídele a Claude que te ayude con cualquier paso. Con este proyecto descargado, puede guiarte en tiempo real.
