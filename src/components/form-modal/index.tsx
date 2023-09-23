import { useEffect, useMemo } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { Modal, Button, TextInput } from "@/components";
import { cn } from "@/utils/style";
import { useAddUser, useEditUser } from "@/queries/user";
import { IUserPayload, IUserType } from "@/types/user";
import { useUser } from "@/queries/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setModalState } from "@/stores/user/userSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

const FormModal = () => {
  const dispatch = useAppDispatch();
  const { formModal } = useAppSelector((state) => state.user);

  const { data: user } = useUser<IUserType>(Number(formModal.id), {
    enabled: !!formModal.id,
  });

  const {
    mutate: addUser,
    isLoading: isLoadingAddUser,
    isSuccess: isSuccessAddUser,
  } = useAddUser();

  const {
    mutate: editUser,
    isLoading: isLoadingEditUser,
    isSuccess: isSuccessEditUser,
  } = useEditUser();

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

  const handleFormUser: SubmitHandler<FieldValues> = async (data) => {
    const payload: IUserPayload = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      status: data.status,
    };

    if (formModal.id) {
      editUser({ id: formModal.id, ...payload });
    } else {
      addUser(payload);
    }
  };

  const handleCloseModal = () => {
    reset({}, { keepValues: false });
    dispatch(setModalState({ modal: "formModal", field: "id", value: null }));
    dispatch(
      setModalState({ modal: "formModal", field: "isOpen", value: false })
    );
  };

  useEffect(() => {
    if (isSuccessAddUser || isSuccessEditUser) {
      handleCloseModal();
    }
  }, [isSuccessAddUser, isSuccessEditUser]);

  useEffect(() => {
    reset(user);
  }, [user]);

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
