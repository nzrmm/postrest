import Head from "next/head";
import { BiTrash, BiPencil, BiSearch } from "react-icons/bi";

import {
  Table,
  Badge,
  Button,
  BoxIcon,
  FormModal,
  DetailModal,
  IColumnType,
} from "@/components";

import { cn } from "@/utils/style";
import { IUserType } from "@/types/user";
import { useUsers } from "@/queries/user";
import { useAppDispatch } from "@/stores/hooks";
import { setModalState } from "@/stores/user/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();

  const { data } = useUsers<IUserType[]>();

  const handleDetailUser = (id: number) => {
    dispatch(
      setModalState({ modal: "detailModal", field: "isOpen", value: true })
    );
    dispatch(setModalState({ modal: "detailModal", field: "id", value: id }));
  };

  const handleAddUser = () => {
    dispatch(
      setModalState({ modal: "formModal", field: "isOpen", value: true })
    );
    dispatch(setModalState({ modal: "formModal", field: "id", value: null }));
  };

  const handleEditUser = (id: number) => {
    dispatch(
      setModalState({ modal: "formModal", field: "isOpen", value: true })
    );
    dispatch(setModalState({ modal: "formModal", field: "id", value: id }));
  };

  const columns: IColumnType<IUserType>[] = [
    { key: "id", title: "Id" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    {
      key: "gender",
      title: "Gender",
      render: (_, { gender }) => (
        <span className={cn("capitalize")}>{gender}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (_, { status }) => (
        <Badge variant={status === "active" ? "success" : "danger"}>
          {status}
        </Badge>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_, { id }) => (
        <div className={cn("flex items-center gap-1")}>
          <BoxIcon onClick={() => {}}>
            <BiTrash size={20} color={"#F43F5E"} />
          </BoxIcon>

          <BoxIcon onClick={() => handleEditUser(id)}>
            <BiPencil size={20} color={"#F59E0B"} />
          </BoxIcon>

          <BoxIcon onClick={() => handleDetailUser(id)}>
            <BiSearch size={20} color={"#171717"} />
          </BoxIcon>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>All User - Postrest.</title>
        <meta
          name="description"
          content="a collection of post from https://gorest.co.in/ api"
        />
      </Head>

      <div>
        {/* Form modal */}
        <FormModal />

        {/* Modal detail user */}
        <DetailModal />

        <div className={cn("flex justify-between items-center mb-8")}>
          <div>
            <p
              className={cn(
                "text-4xl font-bold leading-tight tracking-wide mb-1"
              )}
            >
              All User
            </p>
            <p className={cn("leading-loose text-neutral-700")}>
              Collection of users from https://gorest.co.in/ api.
            </p>
          </div>

          <Button
            id="add-user-button"
            size="sm"
            variant="primary"
            onClick={() => handleAddUser()}
          >
            Add User
          </Button>
        </div>

        <div className={cn("mb-10")}>
          <Table data={data || []} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Users;
