-- CreateTable
CREATE TABLE "Eventos" (
    "evento_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_hora" DATETIME NOT NULL,
    "valor" TEXT NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    CONSTRAINT "Eventos_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensores" ("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sensores" (
    "sensor_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "tipo_medida" TEXT,
    "unidade_medida" TEXT,
    "maquina_id" INTEGER NOT NULL,
    CONSTRAINT "Sensores_maquina_id_fkey" FOREIGN KEY ("maquina_id") REFERENCES "Maquinas" ("maquina_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Maquinas" (
    "maquina_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
