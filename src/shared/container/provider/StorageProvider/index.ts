import { container } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const disk = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton('StorageProvider', disk[process.env.DISK]);
