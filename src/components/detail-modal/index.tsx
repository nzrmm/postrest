import { ImSpinner6 } from "react-icons/im";

import { Modal, Badge } from "@/components";
import { IUserType } from "@/types/user";
import { cn } from "@/utils/style";
import { useUser } from "@/queries/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setDetailModal } from "@/stores/user/userSlice";

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
    dispatch(setDetailModal({ field: "isOpen", value: false }));
    dispatch(setDetailModal({ field: "id", value: null }));
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
            <p className={cn("w-28 font-bold text-neutral-900")}>Id</p>
            <p>: {user?.id}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold text-neutral-900")}>Name</p>
            <p>: {user?.name}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold text-neutral-900")}>Email</p>
            <p>: {user?.email}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold text-neutral-900")}>Gender</p>
            <p>: {user?.gender}</p>
          </div>

          <div className={cn("flex items-center")}>
            <p className={cn("w-28 font-bold text-neutral-900")}>Status</p>
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
