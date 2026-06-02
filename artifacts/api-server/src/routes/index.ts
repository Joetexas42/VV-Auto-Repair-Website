import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import locationConfigRouter from "./locationConfig";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(locationConfigRouter);
router.use(contactRouter);

export default router;
