-- CreateTable
CREATE TABLE `muscles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `muscles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercises` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `difficulty` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL,
    `recommendedSets` INTEGER NOT NULL,
    `recommendedReps` VARCHAR(191) NOT NULL,
    `restTimeSeconds` INTEGER NOT NULL,
    `timerDurationSeconds` INTEGER NULL,
    `animationUrl` VARCHAR(191) NULL,
    `muscleImageUrl` VARCHAR(191) NULL,
    `equipment` VARCHAR(191) NOT NULL,
    `instructions` JSON NOT NULL,
    `commonMistakes` JSON NOT NULL,
    `benefits` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `exercises_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercise_muscles` (
    `id` VARCHAR(191) NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,
    `muscleId` VARCHAR(191) NOT NULL,
    `type` ENUM('PRIMARY', 'SECONDARY') NOT NULL,

    INDEX `exercise_muscles_muscleId_idx`(`muscleId`),
    UNIQUE INDEX `exercise_muscles_exerciseId_muscleId_key`(`exerciseId`, `muscleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exercise_muscles` ADD CONSTRAINT `exercise_muscles_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_muscles` ADD CONSTRAINT `exercise_muscles_muscleId_fkey` FOREIGN KEY (`muscleId`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
