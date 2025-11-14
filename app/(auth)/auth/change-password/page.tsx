import { Suspense } from "react";
import Reset from "./compoents/Reset";


function Page() {
  return (
    <Suspense fallback={<p>Loading reset form...</p>}>
      <Reset />
    </Suspense>
  );
}