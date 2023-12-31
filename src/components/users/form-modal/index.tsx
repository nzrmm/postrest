import { useEffect, useMemo } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { Modal, Button, TextInput } from "@/components/commons";
import { cn } from "@/utils/style";
import { useUser, useAddUser, useEditUser } from "@/queries/user";
import { IUserPayload, IUserType } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setFormModal } from "@/stores/user/userSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().oneOf(["male", "female"]),
    status: yup.string().oneOf(["active", "inactive"]),
  })
  .required();

const FormModal = () => {
  const dispatch = useAppDispatch();
  const { formModal } = useAppSelector((state) => state.user);

  const { data: user } = useUser<IUserType>(Number(formModal.id), {
    enabled: !!formModal.id,
  });

  const { mutate: addUser, isLoading: isLoadingAddUser } = useAddUser();
  const { mutate: editUser, isLoading: isLoadingEditUser } = useEditUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        name: user?.name || "",
        email: user?.email || "",
        gender: user?.gender || "",
        status: user?.status || "",
      };
    }, [user]),
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  const handleCloseModal = () => {
    reset({}, { keepValues: false });
    dispatch(setFormModal({ field: "isOpen", value: false }));
    dispatch(setFormModal({ field: "id", value: null }));
  };

  const handleFormUser: SubmitHandler<FieldValues> = async (data) => {
    const payload: IUserPayload = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      status: data.status,
    };

    if (formModal.id) {
      editUser(
        { id: formModal.id, ...payload },
        { onSuccess: () => handleCloseModal() }
      );
    } else {
      addUser(payload, { onSuccess: () => handleCloseModal() });
    }
  };

  return (
    <Modal
      title={formModal.id ? "Edit User" : "Add User"}
      isOpen={Boolean(formModal.isOpen)}
      onClose={() => handleCloseModal()}
    >
      <form onSubmit={handleSubmit(handleFormUser)}>
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
            note={"* Fill with [male, female] value"}
            placeholder="Input your gender..."
            register={register}
            errors={errors}
          />

          <TextInput
            label="Status"
            id="status"
            type="text"
            note={"* Fill with [active, inactive] value"}
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
            onClick={() => handleCloseModal()}
          >
            Back
          </Button>

          <Button
            id="add-button"
            type="submit"
            size="sm"
            variant="primary"
            isLoading={formModal.id ? isLoadingEditUser : isLoadingAddUser}
            className={cn("w-full")}
          >
            {formModal.id ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
