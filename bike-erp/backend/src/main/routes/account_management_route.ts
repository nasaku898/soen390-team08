// DEPENDENCIES
import express from "express";

// SERVICES
import { AccountManagementService } from "../services/accountManagementService/AccountManagementService";
import { authenticateToken, verifyRole } from "../services/authenticationService/AuthenticationService";
import fetchUserEmail from "../helpers/fetchAccountEmail";
import { Role } from "../models/Account";

const router = express();

// Creating a singleton instance of the AccountManagementService
AccountManagementService.getAccountManagementService();

// Creating endpoint to allow the admins to update the role of other users
router.patch("/admin/update", authenticateToken, verifyRole([Role.ADMIN]), (req, res) => {
  AccountManagementService.updateRole(
    fetchUserEmail(req),
    req.body.email,
    req.body.role
  )
    .then((response) => {
      res.status(202).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
});

// Creating endpoint to fetch account from database
router.get("/admin/accounts", authenticateToken, verifyRole([Role.ADMIN]), (req, res) => {
  AccountManagementService.getAccounts(fetchUserEmail(req))
    .then((response) => {
      res.status(202).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
});

export default router;
