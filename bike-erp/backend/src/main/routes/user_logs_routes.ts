import express from "express";
import { authenticateToken, verifyRole } from "../services/authenticationService/AuthenticationService";
import { UserLogService } from "../services/userlogService/UserLogService";
import { Role } from "../models/Account";

const router = express();

/**
 * This file provides the routes for the front end to push or query user logs to the database
 */

// Posts a user log to the database
router.post("/userLogRegistration", authenticateToken, verifyRole([Role.ADMIN]), (req, res) => {
  UserLogService
    .addLog(
      req.body.id,
      req.body.activity,
    )
    .then((response: any) => {
      res.status(response.status).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
});

// Retrieves a user log from the user email
router.get("/userLogs/:user_id", authenticateToken, verifyRole([Role.ADMIN]), (req, res) => {
  const email = req.params.email;
  UserLogService
    .getLog(email)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.messages);
    });
});

// Retrieves all user logs
router.get("/", authenticateToken, verifyRole([Role.ADMIN]), (req, res) => {
  UserLogService
    .getAllLogs()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.messages);
    });
});

UserLogService.getUserLogService();

export default router;