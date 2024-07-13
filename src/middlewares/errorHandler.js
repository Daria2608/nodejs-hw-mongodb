import { HttpError } from "http-errors";

const errorHandler = (error, req, res, _next) => {

    if (error instanceof HttpError) {
        const { status, message, errors } = error;
        res.status(status).json({
            status,
            message,
            data: errors || error,
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: error.message,
    });
};

    export default errorHandler;
