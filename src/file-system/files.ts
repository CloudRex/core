import fs from "fs";

export default class Files {
    public static async readRaw(filePath: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(filePath, (error: Error, data: Buffer) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve(data);
            });
        });
    }

    public static async read(filePath: string): Promise<string> {
        return (await Files.readRaw(filePath)).toString();
    }

    public static async readJson<ReturnType = any>(filePath: string): Promise<ReturnType> {
        return JSON.parse(await Files.read(filePath));
    }

    public static writeRaw(filePath: string, data: Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (error: Error) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve();
            });
        });
    }

    public static async write(filePath: string, data: any): Promise<void> {
        await Files.writeRaw(filePath, new Buffer(JSON.stringify(data)));
    }
}