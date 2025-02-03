// It is a wrapper where the function is passed for the Database calls
// async handler is a HO func - and they accept another func as an argument for ex here : reqHandler
// Then the reqHandler is resolved - so it can handle asynchronous DB calls
// If there is any error it will be handled inside the catch block - using next(error)


const asyncHandler = (reqestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(reqestHandler(req, res, next))
            .catch((error) => next(error))
    }
}

export { asyncHandler }