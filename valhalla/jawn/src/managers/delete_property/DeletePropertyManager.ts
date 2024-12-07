import { AuthParams } from "../../lib/db/supabase";
import { Result } from "../../lib/shared/result";
import { BaseManager } from "../BaseManager";
import { DeletedPropertyRequest, DeletedPropertyStore } from "./DeletedPropertyStore";


export class DeletePropertyManager extends BaseManager {
  private deletePropertyStore: DeletedPropertyStore;

  constructor(authParams: AuthParams) {
    super(authParams);
    this.deletePropertyStore = new DeletedPropertyStore(
      authParams.organizationId
    );
  }

  async createDeletedProperty(
    deleteRequest: DeletedPropertyRequest
  ): Promise<Result<string, string>> {
    return this.deletePropertyStore.createDeletedProperty(deleteRequest);
  }

  async fetchDeletedProperties(): Promise<
    Result<DeletedPropertyRequest[], string>
  > {
    return this.deletePropertyStore.fetchDeletedProperties();
  }
}
