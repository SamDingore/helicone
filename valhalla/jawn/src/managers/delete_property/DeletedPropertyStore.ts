import { supabaseServer } from "../../lib/db/supabase";
import { dbExecute } from "../../lib/shared/db/dbExecute";
import { err, ok, Result } from "../../lib/shared/result";
import { BaseStore } from "../../lib/stores/baseStore";


export interface DeletedPropertyRequest {
  key: string;
}

export class DeletedPropertyStore extends BaseStore {
  constructor(organizationId: string) {
    super(organizationId);
  }

  public async createDeletedProperty(
    deleteRequest: DeletedPropertyRequest
  ): Promise<Result<string, string>> {
    const deleteProperty = {
      ...deleteRequest,
      org_id: this.organizationId,
    };

    const query = `
      INSERT INTO deleted_properties (request_id, key, value, organization_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const parameters = [
      deleteProperty.key,
      deleteProperty.org_id,
    ];

    const result = await dbExecute<{ id: string }>(query, parameters);
    if (result.error || !result.data || result.data.length === 0) {
      return err(`Error creating deleted property record: ${result.error}`);
    }

    return ok(result.data[0].id);
  }

  public async fetchDeletedProperties(): Promise<
    Result<DeletedPropertyRequest[], string>
  > {
    const { data, error } = await supabaseServer.client
      .from("deleted__properties")
      .select("*")
      .eq("organization_id", this.organizationId);

    if (error || !data) {
      return err(`Error fetching deleted properties: ${error?.message || ""}`);
    }

    return ok(data);
  }
}
