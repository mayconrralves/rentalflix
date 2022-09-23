import { container } from "tsyringe";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "../StorageProvider/implementations/LocalStorageProvider";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
);

container.registerInstance(
    "MailProvider",
   new EtherealMailProvider()
);

container.registerSingleton(
    "StorageProvider",
    LocalStorageProvider,
)