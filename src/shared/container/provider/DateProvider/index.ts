import { container } from "tsyringe";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
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