import { Body, Controller, Post, Request, Route, Security, Tags } from "tsoa";

import { JawnAuthenticatedRequest } from "../../types/request";
import { Result } from "../../lib/shared/result";
import { DeletedPropertyRequest } from "../../managers/delete_property/DeletedPropertyStore";
import { DeletePropertyManager } from "../../managers/delete_property/DeletePropertyManager";

@Route("v1/deletedproperty")
@Tags("Property")
@Security("api_key")
export class DeletedPropertyController extends Controller {
  @Post("query")
  public async getProperties(
    @Body()
    requestBody: {},
    @Request() request: JawnAuthenticatedRequest
  ) {
    const manager = new DeletePropertyManager(request.authParams);
    const result = await manager.fetchDeletedProperties();

    return result;
  }
  @Post("create")
  public async createDeletedProperty(
    @Body()
    requestBody: DeletedPropertyRequest,
    @Request() request: JawnAuthenticatedRequest
  ): Promise<Result<string, string>> {

    const manager = new DeletePropertyManager(request.authParams);
    const result = await manager.createDeletedProperty(requestBody);

    return result;
  }
}