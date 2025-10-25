Parcial Docker – Implantación de Sistemas
**Autor:** Gilberto José Menéndez Pérez
**Expediente:** 25839
**Código:** MP22i04001

---

EJERCICIO 1 – API Node.js con Dockerfile

Comandos ejecutados
```bash
# Inicializar proyecto
npm init -y
npm i express

# Crear servidor base
nano server.js

# Crear archivo Dockerfile
nano Dockerfile

# Crear archivo .dockerignore
nano .dockerignore

# Construir imagen
docker build -t parcial-api .

# Ejecutar contenedor
docker run -d --name parcial-api -p 3000:3000 parcial-api

# Verificar estado del contenedor
docker ps

# Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
_________________________________________________________
##EJERCICIO 2 Persistencia de PostgreSQL con Volumen
# Crear volumen persistente
docker volume create db_data

# Ejecutar contenedor PostgreSQL con volumen
docker run -d \
  --name parcial-postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=parcial_db \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16-alpine

# Crear tabla e insertar registro
docker exec -it parcial-postgres psql -U admin -d parcial_db -c "CREATE TABLE IF NOT EXISTS estudiantes(id SERIAL PRIMARY KEY, nombre TEXT NOT NULL);"
docker exec -it parcial-postgres psql -U admin -d parcial_db -c "INSERT INTO estudiantes(nombre) VALUES ('Gilberto José Menéndez Pérez');"
docker exec -it parcial-postgres psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"

# Reiniciar contenedor y verificar persistencia
docker restart parcial-postgres
docker exec -it parcial-postgres psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"

________________________________________________________________________________________________________

##EJERCICIO 3 – Integración con Docker Compose
# Crear archivo .env
nano .env

# Crear archivo docker-compose.yml
nano docker-compose.yml

# Instalar dependencia PostgreSQL para Node
npm i pg

# Construir e iniciar con Compose
docker compose up -d --build

# Verificar servicios activos
docker ps

# Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/db-check
____________________________________________________________________________________________________
##Comandos utiles

# Detener contenedores
docker stop parcial-api parcial-postgres

# Eliminar contenedores
docker rm parcial-api parcial-postgres

# Eliminar imagen
docker rmi parcial-api

# Eliminar volumen
docker volume rm db_data

# Limpiar red y recursos
docker network prune -f
