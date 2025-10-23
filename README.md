# Prerequisitos 
para poder correr el proyecto es necesario que tengas instalado Node.js
    https://nodejs.org/en/download
y obviamente el codigo fuente que esta disponible en el USB que tienes o si quires puedes ir al repositorio en github 
    https://github.com/AlejandroRBC/grupo2_bd
# Instalacion y preparación para levantar el proyecto
El proyecto se divide en 2 partes el Backend y el Grupo2-Frontend ambos requieren de la Instalacion de paquetes mediante NPM
---
## para el backend 
Necesitamos entrar y instalar las dependencias necesarias 
```bash
    cd backend
    npm init -y
    npm install express pg cors
```
## para el Frontend 
Necesitamos entrar y instalar las dependencias necesarias 
```bash
    cd frontend
    npm install
    npm install axios
```
## levantar el Proyecto
Para poder levantar el proyecto se nesecita tener dos consolas activas, una que iniciara el backen en modo servidor y otra que pondra en marcha el frontend de react
---
Para el **Backend**
```bash
    cd backend
    npm node server.js
```
Para el **Grupo2-Frontend**
```bash
    cd Grupo2-Frontend
    npm run dev
```




