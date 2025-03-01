FROM node:14

# Crea directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias del proyecto
# Copia ambos 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

RUN npm install

# Copia los archivos y carpetas del proyecto al directorio de trabajo
COPY . .

# Expone el puerto que tu app utiliza
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "app/index.js"]
