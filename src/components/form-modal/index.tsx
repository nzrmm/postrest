import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { Modal, Button, TextInput } from "@/components";
import { cn } from "@/utils/style";
import { useAddUser } from "@/queries/user";
import { IUserPayload } from "@/types/user";
import { useEffect } from "react";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

const FormModal = () => {
  const router = useRouter();

  const userId = router.query?.id as string;
  const isOpenModalForm = router.query?.isOpenModalForm as string;

  const { mutate, isLoading, isSuccess } = useAddUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddUser: SubmitHandler<FieldValues> = async (data) => {
    const payload: IUserPayload = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      status: data.status,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push({
        pathname: "/users",
      });
    }
  }, [isSuccess]);

  return (
    <Modal
      title={isOpenModalForm && userId ? "Edit User" : "Add User"}
      isOpen={Boolean(isOpenModalForm)}
      onClose={() => router.push({ pathname: "/users" })}
    >
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className={cn("grid gap-4 mb-6")}>
          <TextInput
            label="Name"
            id="name"
            type="text"
            placeholder="Input your name..."
            register={register}
            errors={errors}
          />

          <TextInput
            label="Email"
            id="email"
            type="email"
            placeholder="Input your email..."
            register={register}
            errors={errors}
          />

          <TextInput
            label="Gender"
            id="gender"
            type="text"
            placeholder="Input your gender..."
            register={register}
            errors={errors}
          />

          <TextInput
            label="Status"
            id="status"
            type="text"
            placeholder="Input your status..."
            register={register}
            errors={errors}
          />
        </div>

        <div className={cn("flex gap-4")}>
          <Button
            id="back-button"
            type="button"
            size="sm"
            variant="primary"
            className={cn("w-full")}
            onClick={() => {
              reset();
              router.push({ pathname: "/users" });
            }}
          >
            Back
          </Button>

          <Button
            id="add-button"
            type="submit"
            size="sm"
            variant="primary"
            isLoading={isLoading}
            className={cn("w-full")}
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
