import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";
import { notesService } from "../services/NoteService";

export class BugsController extends BaseController {



  constructor() {
    super("api/bugs");
    this.router
      .get("", this.getAll)
      .get("/:bugId/notes/", this.getNotes)
      .get("/:id", this.getById)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.delete)
      .delete("/:bugId/notes/:noteId", this.deleteNote)
      .put("/:id", this.edit)
      .put("/:bugid/notes/:noteId", this.editNote)
  }
  async getAll(req, res, next) {
    try {
      let data = await bugsService.findAll()
      res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await bugsService.findById(req.params.id)
      res.send(data)
    } catch (error) { next(error) }
  }
  async getNotes(req, res, next) {
    try {
      let data = await notesService.getNotes(req.params.bugId)
      res.send(data)
    } catch (error) {

    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.addBug(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await bugsService.deleteBug(req.params.id)
      res.send("deleted")
    } catch (error) { next(error) }
  }

  async deleteNote(req, res, next) {
    try {
      let data = await notesService.deleteNote(req.params.bugId, req.params.noteId)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.editBug(req.params.id, req.body)
      res.send(data)
    } catch (error) { next(error) }
  }
  async editNote(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await notesService.editNote(req.params.bugId, req.params.NoteId, req.body)
      res.send(data)
    } catch (error) { next(error) }
  }
}
