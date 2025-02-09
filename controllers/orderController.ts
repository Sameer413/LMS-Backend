import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { OrderModel } from "../models/orderModel";
import { userModel } from "../models/userModel";
import { CourseModel } from "../models/courseModel";
// import { razoPpay } from "./paymentController";

// Key id rzp_test_OGZ7M7SEQajqtU
// Key Secret 6HKTCVXInkJyKi8wzKMOizRv



// export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const { courseId, payment_id } = req.body;

//         const user = await userModel.findById(req.user?._id);

//         const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

//         if (courseExistInUser) {
//             await razorpay.payments.refund(payment_id, {});

//             return next(new ErrorHandler("You have already purchased this course", 400));
//         }

//         const course = await CourseModel.findById(courseId);

//         if (!course) {
//             return next(new ErrorHandler("Course not found", 404));
//         }

//         const payment = await razorpay.payments.fetch(payment_id);

//         if (!payment) {
//             return next(new ErrorHandler("Payment has been failed!", 404));
//         }

//         const data: any = {
//             courseId: course._id,
//             userId: user?._id,
//             payment_info: {
//                 payment_id: payment.id,
//                 amount: payment.amount,
//                 currency: payment.currency,
//                 order_id: payment.order_id,
//                 email: payment.email,
//                 method: payment.method,
//             }
//         }

//         user?.courses.push(course?._id);

//         await user?.save();

//         course.purchased ? course.purchased += 1 : course.purchased;

//         await course.save();

//         await OrderModel.create(
//             data
//         );

//         res.status(201).json({
//             success: true,
//             data,
//         });

//     } catch (error: any) {
//         return next(new ErrorHandler(error.messaage, 500));
//     }
// });

export const updateOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paymentId, orderId, status } = req.body;
        const order = await OrderModel.findById(orderId);
        console.log(paymentId);

        if (!order) {
            return next(new ErrorHandler('Order not found', 404));
        }
        // req.user?._id ||
        const user = await userModel.findById('67a7621a567f3c0e96a57118')

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        // Update the order details
        order.paymentId = paymentId.toString();
        order.markModified("paymentId")
        order.status = status || 'captured'; // Default to 'captured' if not provided

        await order.save();
        console.log("here");

        user?.courses.push({ courseId: order.courseId });

        await user?.save()

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            order,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.messaage, 500));
    }
});


export const getAllOrders = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.find({});

        if (!orders) {
            return next(new ErrorHandler("Orders not found", 404));
        }

        res.status(200).json({
            success: true,
            orders,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.messaage, 500));
    }
});


