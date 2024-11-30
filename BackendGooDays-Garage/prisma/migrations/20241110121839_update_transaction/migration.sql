-- AlterTable
ALTER TABLE `catalog` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(110) NOT NULL,
    `total` INTEGER NOT NULL,
    `status` ENUM('PENDING_PAYMENT', 'PAID', 'CANCELED') NOT NULL,
    `customer_name` VARCHAR(255) NOT NULL,
    `customer_email` VARCHAR(255) NOT NULL,
    `snap_token` VARCHAR(255) NULL,
    `snap_redirect_url` VARCHAR(255) NULL,
    `payment_method` VARCHAR(110) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions_items` (
    `id` VARCHAR(110) NOT NULL,
    `transaction_id` VARCHAR(110) NOT NULL,
    `product_id` VARCHAR(110) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `catalog_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `CATALOG_id`(`catalog_id`),
    INDEX `transaction_id`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions_items` ADD CONSTRAINT `transactions_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions_items` ADD CONSTRAINT `transactions_items_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `catalog`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
