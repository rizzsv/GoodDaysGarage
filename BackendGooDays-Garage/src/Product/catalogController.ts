import { Request, Response } from "express";
import multer from "multer";
import prisma from "../config/prisma";
import { ROOT_DIRECTORY } from "../config";
import path from "path";
import fs from "fs";
import { error } from "console";
import { title } from "process";



export const createCatalog = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { title, description, quantity, price } = req.body;
    const image = req.file?.filename || '';

    console.log('File:', req.file); // Log file details

    try {
        const catalog = await prisma.catalog.create({
            data: {
                title,
                description,
                quantity: parseInt(quantity, 10),
                price: parseFloat(price),
                imageUrl: image
            }
        });
        res.status(201).json(catalog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "error creating catalog"
        });
    }
};

export const getCatalogs = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const catalogs =  await prisma.catalog.findMany();
        where: title ? {
            title: {
                contains: title as string,
                mode: 'insensitive'
            }
        }
        : {}
        res.json(catalogs)
    } catch (error) {
        res.status(500).json({
            error: "error get catalogs"
        })
    }
}

export const getCatalogById = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;
    try {
        const catalog = await prisma.catalog.findUnique({
            where: {id: parseInt(id)}
        });
        if(!catalog) return res.status(404).json({
            error: 'catalog not found'
        })
        res.json(catalog)
    } catch (error) {
        res.status(500).json({
            error: "error fetching catalog"
        })
    }
};

export const updateCatalog = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;
    const { title, description, quantity, price } = req.body;
    const imageUrl = req.file?.filename || '';

    try {
        const catalog = await prisma.catalog.update({
            where: { id: parseInt(id, 10) },
            data: {
                title,
                description,
                quantity: parseInt(quantity, 10),
                price: parseFloat(price),
                imageUrl
            }
        });

        if (!catalog) {
            return res.status(404).json({ error: "catalog not found" });
        }

        if(req.file) {
            let oldFileName = catalog.imageUrl;

            let pathFile = `${ROOT_DIRECTORY}/public/catalog-photo/${oldFileName}`;

            let existFile = fs.existsSync(pathFile);

            if(existFile && oldFileName !== '') {
                fs.unlinkSync(pathFile);
            } 
        }
        res.json(catalog);
    } catch (error) {
        res.status(500).json({ error: "error updating catalog" });
    }
};

export const deleteCatalog = async (
    req: Request,
    res: Response
):Promise<any> => {
    const {id} = req.params;
    try {
        await prisma.catalog.delete({
            where: {id: parseInt(id)}
        })

        res.json({message: "catalog deleted"})
    } catch (error) {
        res.status(500) .json({error: "error deleting catalog"})
    }
}