const asyncHandler = (fn: any) => async (req: any ,res: any , next: any) => {
    try {
        await fn(req ,res ,next)
    } catch (error: any) {
        res.status(error.code || 500).json({
            succes: false ,
            message: error.message
        })

    }
}

export { asyncHandler }