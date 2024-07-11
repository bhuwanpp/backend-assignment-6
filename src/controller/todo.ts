import { NextFunction, Request, Response } from "express";
import * as taskService from "../service/todo";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserController");
/**
 * Retrieves all tasks.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
export function getTask(req: Request, res: Response) {
  // @ts-ignore
  const { id, role } = req.user;
  const data = taskService.getTasks(id, role);
  logger.info("Called getTasks");
  res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * Retrieves a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 *  @param {next} next - Express nextfunction object
 */
export function getTaskById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const { userId } = req;
    const data = taskService.getTaskById(id, userId);
    logger.info("Called getTaskById");
    res.status(HttpStatusCodes.OK).json({ data });
  } catch (e) {
    next(e);
  }
}

/**
 * Creates a new task.
 * @param {Request} req - The Express Request object containing the task data in req.body.
 * @param {Response} res - The Express Response object.
 * @param {next} next - Express nextfunction object
 */
export function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    // @ts-ignore
    const { userId } = req;
    taskService.createTask(body, userId);
    logger.info("Called createTask");
    res.status(HttpStatusCodes.OK).json({
      message: "user created ",
      ...body,
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Updates an existing task.
 * @param {Request} req - The Express Request object containing the task ID in req.params and updated data in req.body.
 * @param {Response} res - The Express Response object.
 * @param {next} next - Express nextfunction object
 */
export function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    // @ts-ignore
    const { userId } = req;
    taskService.updateTask(id, body, userId);
    logger.info("Called updateTask");
    res.status(HttpStatusCodes.OK).json({
      message: "task  updated ",
      ...body,
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Deletes a task.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 * @param {next} next - Express nextfunction object
 */
export function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    // @ts-ignore
    const { userId } = req;
    taskService.deleteTask(id, userId);
    logger.info("Called deleteTask");
    res.status(HttpStatusCodes.OK).json({
      message: "task deleted ",
      ...body,
    });
  } catch (e) {
    next(e);
  }
}
