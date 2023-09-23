import Head from "next/head";
import { isEmpty } from "lodash";
import { BiTrash, BiPencil, BiSearch } from "react-icons/bi";

import {
  Table,
  Badge,
  Button,
  BoxIcon,
  FormModal,
  TextInput,
  DetailModal,
  DeleteModal,
  InfinitePagination,
  IColumnType,
} from "@/components";

import { cn } from "@/utils/style";
import { IUserType } from "@/types/user";
import { useUsers } from "@/queries/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setParams } from "@/stores/user/userSlice";
import useDebounce from "@/hooks/use-debounce";

import {
  setFormModal,
  setDetailModal,
  setDeleteModal,
} from "@/stores/user/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.user);

  const debouncedSearchTerm = useDebounce(params.search, 300);

  const { data, isLoading } = useUsers<IUserType[]>({
    ...params,
    search: debouncedSearchTerm,
  });

  const handleDetailUser = (id: number) => {
    dispatch(setDetailModal({ field: "isOpen", value: true }));
    dispatch(setDetailModal({ field: "id", value: id }));
  };

  const handleAddUser = () => {
    dispatch(setFormModal({ field: "isOpen", value: true }));
    dispatch(setFormModal({ field: "id", value: null }));
  };

  const handleEditUser = (id: number) => {
    dispatch(setFormModal({ field: "isOpen", value: true }));
    dispatch(setFormModal({ field: "id", value: id }));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(setDeleteModal({ field: "isOpen", value: true }));
    dispatch(setDeleteModal({ field: "id", value: id }));
  };

  const handlePagination = (page: number) => {
    dispatch(setParams({ field: "page", value: page }));
  };

  const columns: IColumnType<IUserType>[] = [
    { key: "id", title: "Id" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    {
      key: "gender",
      title: "Gender",
      render: (_, { gender }) => <p className={cn("capitalize")}>{gender}</p>,
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
          <BoxIcon onClick={() => handleDeleteUser(id)}>
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

        {/* Detail modal */}
        <DetailModal />

        {/* Delete modal */}
        <DeleteModal />

        <div className={cn("flex justify-between items-center mb-4")}>
          <div>
            <h1 className={cn("mb-1")}>All User</h1>
            <p>Collection of users from https://gorest.co.in/ api.</p>
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

        <div className={cn("mb-8")}>
          <TextInput
            id="name"
            type="text"
            className={cn("w-96")}
            placeholder="Input your name..."
            value={params.search}
            onChange={({ target }) => {
              dispatch(setParams({ field: "search", value: target.value }));
            }}
          />
        </div>

        <div className={cn("mb-10")}>
          <Table data={data || []} columns={columns} isLoading={isLoading} />
        </div>

        <InfinitePagination
          page={params.page}
          disableOnNext={isEmpty(data)}
          disableOnPrevious={params.page <= 1}
          onNext={() => handlePagination(params.page + 1)}
          onPrevious={() => handlePagination(params.page - 1)}
        />
      </div>
    </>
  );
};

export default Users;
