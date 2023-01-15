import { Table, Tag, Space, Button, Popconfirm, Form } from "antd";
import { useMemo, useState } from "react";
import { deleteUser } from "../apiCalls";
import EditUserModal from "./EditUserModal";

const hobbyColors = {
  gaming: "geekblue",
  bowling: "green",
  playing: "volcano",
  reading: "gold",
  coding: "cyan",
};

const UserTable = ({ userData, setSelectedRows, refreshUsers }) => {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [updateForm] = Form.useForm();
  const [currentUserId, setCurrentUserId] = useState("");
  const updateModal = (record) => {
    console.log(record);
    updateForm.setFieldsValue({
      name: record.name,
      phoneNumber: record.phoneNumber,
      email: record.email,
      hobbies: record.hobbies,
    });
    setCurrentUserId(record._id);
    setOpenEditUserModal(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hobbies",
      key: "hobbies",
      dataIndex: "hobbies",
      render: (_, { hobbies }) => (
        <>
          {hobbies.map((hobby) => {
            return (
              <Tag
                color={
                  hobbyColors[hobby.toLowerCase()] != undefined
                    ? hobbyColors[hobby.toLowerCase()]
                    : "magenta"
                }
                key={hobby}
              >
                {hobby.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_) => (
        <Space size="middle">
          <Button type="default" onClick={() => updateModal(_)}>
            Update
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>
              deleteUser(_._id).then((res) => {
                console.log(res);
                refreshUsers();
              })
            }
            onCancel={() => console.log("cancel")}
            okText="Delete"
            okButtonProps={{ danger: true }}
            okType="primary"
            cancelText="Cancel"
          >
            <Button type="default" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const selectionHandler = (keys, rows) => {
    setSelectedRows(rows);
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: selectionHandler,
        }}
        pagination={{
          position: ["bottomCenter"],
          defaultPageSize: 5,
        }}
        columns={columns}
        rowKey="_id"
        dataSource={userData}
        style={{
          width: "100%",
        }}
      />
      <EditUserModal
        open={openEditUserModal}
        setOpen={setOpenEditUserModal}
        id={currentUserId}
        refreshUsers={refreshUsers}
        form={updateForm}
      />
    </>
  );
};

export default UserTable;
