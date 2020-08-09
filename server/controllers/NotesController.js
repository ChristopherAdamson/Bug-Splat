import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {



  constructor() {
    super("api/notes");
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("notes", this.create)

  }


  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await notesService.addBug(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

}
