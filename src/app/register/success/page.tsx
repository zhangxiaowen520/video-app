import { Suspense } from "react";
import RegisterSuccessContent from "./RegisterSuccessContent";

export default function RegisterSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }>
      <RegisterSuccessContent />
    </Suspense>
  );
}
