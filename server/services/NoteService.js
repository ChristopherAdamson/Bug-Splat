import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {




  async getNotes(bugId, noteId) {
    let value = await dbContext.Notes.find({ _id: noteId, bug: bugId });
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }

  async addNote(body) {
    let data = await dbContext.Notes.create(body)
    return data
  }
  async deleteNote(bugId, noteId) {
    let data = await dbContext.Notes.findOneAndDelete({ _id: noteId, bug: bugId })
    if (!data) {
      throw new BadRequest("Note Not Found")
    } else
      return data
  }
  async editNote(bugId, body, noteId) {
    {
      let data = await dbContext.Notes.findOneAndUpdate({ _id: noteId, creatorEmail: body.creatorEmail, bug: bugId }, body, { new: true })
      if (!data) {
        throw new BadRequest("Invalid ID or you do not own this Note");
      }
      return data;
    }
  }






}

export const notesService = new NotesService();
