"use client";

import tigerFactory, {
  TigerTokenAuthProvider,
} from "@gooddata/sdk-backend-tiger";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import { InsightView } from "@gooddata/sdk-ui-ext";

const backend = tigerFactory()
  .onHostname("<GOODDATA-HOST>") // this should be the domain where the GoodData Cloud or GoodData.CN is hosted
  .withAuthentication(
    new TigerTokenAuthProvider(
      "<GOODDATA-TOKEN>"
    )
  );

export default function Chart() {
  return (
    <BackendProvider backend={backend}>
      <WorkspaceProvider workspace="<GOODDATA-WORKSPACE>">
        <div className="w-full h-full">
          <h1>Next.js with GoodData</h1>

          <div className="h-[400px]">
            <InsightView insight="<INSIGHT-ID>" />
          </div>
        </div>
      </WorkspaceProvider>
    </BackendProvider>
  );
}
