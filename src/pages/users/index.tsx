import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImSpinner6 } from "react-icons/im";
import { BiTrash, BiPencil, BiSearch } from "react-icons/bi";

import {
  Table,
  Badge,
  Modal,
  Button,
  BoxIcon,
  IColumnType,
} from "@/components";

import { cn } from "@/utils/style";
import { IUserType } from "@/types/user";
import { useUser, useUsers } from "@/queries/user";

const Users = () => {
  const router = useRouter();
  const userId = router.query?.id as string;
  const isOpenModalDetail = router.query?.isOpenModalDetail as string;
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useUsers<IUserType[]>();
  const { data: user, isLoading: isLoadingUser } = useUser<IUserType>(userId, {
    enabled: !!userId,
  });

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

          <BoxIcon onClick={() => {}}>
            <BiPencil size={20} color={"#F59E0B"} />
          </BoxIcon>

          <BoxIcon
            onClick={() => {
              router.push({
                pathname: "/users",
                query: { id, isOpenModalDetail: true },
              });
            }}
          >
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
        {/* Modal add user */}
        <Modal
          title="Add User"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          Modal Add User
        </Modal>

        {/* Modal detail user */}
        <Modal
          title={isLoadingUser ? "Detail User" : user?.name}
          isOpen={Boolean(isOpenModalDetail)}
          onClose={() =>
            router.push({
              pathname: "/users",
            })
          }
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
            onClick={() => setIsOpen(true)}
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
