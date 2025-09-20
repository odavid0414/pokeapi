-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `sprite_front_default` VARCHAR(191) NULL,
    `fetchedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pokemon_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonAbility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonId` INTEGER NOT NULL,
    `ability` VARCHAR(191) NOT NULL,
    `is_hidden` BOOLEAN NOT NULL DEFAULT false,
    `slot` INTEGER NULL,

    UNIQUE INDEX `PokemonAbility_pokemonId_ability_key`(`pokemonId`, `ability`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `api_id` INTEGER NULL,

    UNIQUE INDEX `Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonId` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `slot` INTEGER NULL,

    UNIQUE INDEX `PokemonType_pokemonId_typeId_key`(`pokemonId`, `typeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pokemonId` INTEGER NOT NULL,
    `caughtAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserPokemon_userId_pokemonId_key`(`userId`, `pokemonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PokemonAbility` ADD CONSTRAINT `PokemonAbility_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonType` ADD CONSTRAINT `PokemonType_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonType` ADD CONSTRAINT `PokemonType_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPokemon` ADD CONSTRAINT `UserPokemon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPokemon` ADD CONSTRAINT `UserPokemon_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
