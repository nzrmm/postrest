import { useRouter } from "next/router";

import { Modal, Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const FormModal = () => {
  const router = useRouter();

  const userId = router.query?.id as string;
  const isOpenModalForm = router.query?.isOpenModalForm as string;

  return (
    <Modal
      title={isOpenModalForm && userId ? "Edit User" : "Add User"}
      isOpen={Boolean(isOpenModalForm)}
      onClose={() => router.push({ pathname: "/users" })}
    >
      <div className={cn("grid gap-4 mb-6")}>
        <TextInput
          required
          label="Name"
          id="name"
          type="text"
          placeholder="Input your name..."
        />

        <TextInput
          required
          label="Email"
          id="email"
          type="email"
          placeholder="Input your email..."
        />
      </div>

      <div className={cn("flex gap-4")}>
        <Button
          id="back-button"
          size="sm"
          variant="primary"
          className={cn("w-full")}
          onClick={() => router.push({ pathname: "/users" })}
        >
          Back
        </Button>

        <Button
          id="add-button"
          size="sm"
          variant="primary"
          className={cn("w-full")}
          onClick={() => {}}
        >
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default FormModal;
