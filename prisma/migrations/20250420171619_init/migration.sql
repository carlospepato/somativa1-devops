-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "food" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "grams" REAL NOT NULL,
    "calories" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
