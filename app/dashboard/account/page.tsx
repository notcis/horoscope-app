import { auth } from "@/auth";
import FormAccount from "./components/form-account";

export default async function page() {
  const session = await auth();

  const iniitialValues = {
    name: session?.user?.name,
    dob: session?.user?.dob,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <FormAccount initialValues={iniitialValues} />
    </div>
  );
}
