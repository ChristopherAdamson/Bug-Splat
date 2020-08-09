import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {



  async findAll(query = {}) {
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return bugs;
  }
  async findById(id) {
    let value = await dbContext.Bugs.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }

  async addBug(body) {
    let data = await dbContext.Bugs.create(body)
    return data
  }
  async deleteBug(id) {
    let data = await dbContext.Bugs.findOneAndDelete(id)
    if (!data) {
      throw new BadRequest("Bug Not Found")
    } else
      return data
  }
  async editBug(id, body,) {
    {
      let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: body.creatorEmail }, body, { new: true })
      if (!data) {
        throw new BadRequest("Invalid ID or you do not own this Bug");
      }
      return data;
    }
  }






}

export const bugsService = new BugsService();
