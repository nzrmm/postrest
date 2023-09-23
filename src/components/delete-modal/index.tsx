import { useEffect } from "react";

import { Modal, Button } from "@/components";
import { cn } from "@/utils/style";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setDeleteModal } from "@/stores/user/userSlice";
import { useDeleteUser } from "@/queries/user";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const { deleteModal } = useAppSelector((state) => state.user);

  const { mutate, isLoading, isSuccess } = useDeleteUser();

  const handleCloseModal = () => {
    dispatch(setDeleteModal({ field: "isOpen", value: false }));
    dispatch(setDeleteModal({ field: "id", value: null }));
  };

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess]);

  return (
    <Modal
      title={"Delete User"}
      isOpen={deleteModal.isOpen}
      onClose={() => handleCloseModal()}
    >
      <div>
        <div className={cn("text-center mb-6")}>
          <p className={cn("mb-2")}>Are you sure to delete user with id :</p>
          <h6>{deleteModal.id}</h6>
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
            id="delete-button"
            size="sm"
            variant="primary"
            isLoading={isLoading}
            className={cn("w-full")}
            onClick={() => mutate(Number(deleteModal.id))}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
