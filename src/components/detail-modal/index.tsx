import { ImSpinner6 } from "react-icons/im";

import { Modal, Badge } from "@/components";
import { IUserType } from "@/types/user";
import { cn } from "@/utils/style";
import { useUser } from "@/queries/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setModalState } from "@/stores/user/userSlice";

const DetailModal = () => {
  const dispatch = useAppDispatch();
  const { detailModal } = useAppSelector((state) => state.user);

  const { data: user, isLoading: isLoadingUser } = useUser<IUserType>(
    Number(detailModal.id),
    {
      enabled: !!detailModal.id,
    }
  );

  const handleCloseModal = () => {
    dispatch(
      setModalState({ modal: "detailModal", field: "isOpen", value: false })
    );
    dispatch(setModalState({ modal: "detailModal", field: "id", value: null }));
  };

  return (
    <Modal
      title={isLoadingUser ? "Detail User" : user?.name}
      isOpen={detailModal.isOpen}
      onClose={() => handleCloseModal()}
    >
      {isLoadingUser && <ImSpinner6 className={cn("animate-spin")} />}

      {!isLoadingUser && user && (
        <div className={cn("flex flex-col gap-3")}>
          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold")}>Id</p>
            <p className={cn("text-neutral-700")}>: {user?.id}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold")}>Name</p>
            <p className={cn("text-neutral-700")}>: {user?.name}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold")}>Email</p>
            <p className={cn("text-neutral-700")}>: {user?.email}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold")}>Gender</p>
            <p className={cn("text-neutral-700")}>: {user?.gender}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold")}>Status</p>
            <div className={cn("flex items-center gap-1")}>
              : <Badge>{user?.status}</Badge>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailModal;
