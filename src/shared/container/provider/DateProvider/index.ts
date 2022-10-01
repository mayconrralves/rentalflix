import { container } from "tsyringe";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "../StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../StorageProvider/implementations/S3StorageProvider";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

const disk = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
);

container.registerInstance(
    "MailProvider",
   new EtherealMailProvider()
);

console.log(disk[process.env.disk])
container.registerSingleton(
    "StorageProvider",
    disk[process.env.disk],
)