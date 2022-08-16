class AppError {
    public readonly message: string
    public readonly codeStatus: number

    constructor(message: string, codeStatus = 400) {
        this.message = message
        this.codeStatus = codeStatus
    }
}

export { AppError }
