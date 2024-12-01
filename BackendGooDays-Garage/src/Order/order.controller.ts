import { Request, Response } from "express";
import multer from "multer";
import prisma from "../config/prisma";
import { ROOT_DIRECTORY } from "../config";
import { order_status } from "@prisma/client";
import path from "path";
import fs from "fs";
import { error } from "console";
import internal from "stream";

// Create a new order
export const createOrder = async (
    req: Request,
    res: Response
): Promise<any> => {
    const user_id : number = Number(req.body.user_id);
    const catalog_id : number = Number(req.body.catalog_id);
    const quantity : number = Number(req.body.quantity);
    const status : 'DIKEMAS' | 'DIKIRIM' | 'PESANAN_DITERIMA' = req.body.status

    try {
        const catalog = await prisma.catalog.findUnique({
            where: {
                id: catalog_id
            }
        })

        if(!catalog){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        //calculate total price 
        const totalPrice = catalog.price * quantity;

        //create order 
        const order = await prisma.order.create({
            data: {
                user_id, 
                catalog_id,
                quantity,
                total_price: totalPrice,
                status
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.log(error)
    }
}

export const getUserOrders = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { user_id } = req.params;

    try {
        const orders = await prisma.order.findMany({
            where: {
                user_id: parseInt(user_id)
            },
            include: {
                Catalog: true
            }
        })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({
            internal: 'Internal server error', details: error
        })
    }
}

export const updateOrderStatus = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await prisma.order.update({
            where: {id : Number(id)},
            data: {status}
        });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error', details: error
        })
    }
}