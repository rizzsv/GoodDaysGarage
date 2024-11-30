import { Router } from 'express';
import multer from 'multer';
import {
    createCatalog,
    getCatalogs,
    getCatalogById,
    updateCatalog,
    deleteCatalog
} from '../Product/catalogController';
import {
    uploadImage
} from '../upload/uploadimage'

const router = Router();

// Configure multer for file uploads


router.post('/catalog', [uploadImage.single('image')], createCatalog);
router.get('/catalog', getCatalogs);
router.get('/catalog/:id', getCatalogById);
router.put('/catalog/:id', [uploadImage.single('image')], updateCatalog);
router.delete('/catalog/:id', deleteCatalog);

export default router;